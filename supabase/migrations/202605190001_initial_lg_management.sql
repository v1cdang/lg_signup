create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'coordinator', 'lg_head');
create type public.participant_status as enum ('new', 'endorsed', 'joined', 'active', 'inactive');
create type public.follow_up_status as enum ('open', 'in_progress', 'completed', 'deferred');
create type public.attendance_status as enum ('present', 'absent', 'excused');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role public.app_role not null default 'lg_head',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.light_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  schedule text not null,
  capacity integer not null default 12 check (capacity > 0),
  lg_head_id uuid references public.profiles(id) on delete set null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  age integer check (age is null or age between 12 and 120),
  life_stage text,
  preferred_location text,
  preferred_schedule text,
  source text not null default 'manual',
  status public.participant_status not null default 'new',
  assigned_light_group_id uuid references public.light_groups(id) on delete set null,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lg_assignments (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  light_group_id uuid not null references public.light_groups(id) on delete cascade,
  assigned_by uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table public.servant_journey_events (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  title text not null,
  description text,
  event_date date not null default current_date,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.attendance_sessions (
  id uuid primary key default gen_random_uuid(),
  light_group_id uuid not null references public.light_groups(id) on delete cascade,
  session_date date not null,
  notes text,
  recorded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (light_group_id, session_date)
);

create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.attendance_sessions(id) on delete cascade,
  participant_id uuid not null references public.participants(id) on delete cascade,
  status public.attendance_status not null,
  notes text,
  created_at timestamptz not null default now(),
  unique (session_id, participant_id)
);

create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  assigned_to uuid references public.profiles(id) on delete set null,
  title text not null,
  status public.follow_up_status not null default 'open',
  due_at timestamptz,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.touch_updated_at();
create trigger light_groups_touch_updated_at before update on public.light_groups
for each row execute function public.touch_updated_at();
create trigger participants_touch_updated_at before update on public.participants
for each row execute function public.touch_updated_at();
create trigger follow_ups_touch_updated_at before update on public.follow_ups
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    'lg_head'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin_or_coordinator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() in ('admin', 'coordinator'), false)
$$;

create index participants_status_created_idx on public.participants (status, created_at desc);
create index participants_search_idx on public.participants using gin (to_tsvector('simple', full_name || ' ' || email || ' ' || phone));
create index participants_assigned_lg_idx on public.participants (assigned_light_group_id) where assigned_light_group_id is not null;
create index light_groups_head_idx on public.light_groups (lg_head_id) where lg_head_id is not null;
create index follow_ups_due_idx on public.follow_ups (status, due_at) where status in ('open', 'in_progress');
create index activity_logs_entity_idx on public.activity_logs (entity_type, entity_id, created_at desc);
create index attendance_sessions_group_date_idx on public.attendance_sessions (light_group_id, session_date desc);

alter table public.profiles enable row level security;
alter table public.light_groups enable row level security;
alter table public.participants enable row level security;
alter table public.lg_assignments enable row level security;
alter table public.servant_journey_events enable row level security;
alter table public.attendance_sessions enable row level security;
alter table public.attendance_records enable row level security;
alter table public.follow_ups enable row level security;
alter table public.activity_logs enable row level security;

create policy "profiles readable by authenticated users" on public.profiles
for select to authenticated using (true);

create policy "admins manage profiles" on public.profiles
for all to authenticated using (public.current_user_role() = 'admin')
with check (public.current_user_role() = 'admin');

create policy "users update their own profile name" on public.profiles
for update to authenticated using (id = auth.uid())
with check (id = auth.uid() and role = public.current_user_role());

create policy "staff read light groups" on public.light_groups
for select to authenticated using (true);

create policy "admins and coordinators manage light groups" on public.light_groups
for all to authenticated using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "staff read participants" on public.participants
for select to authenticated using (
  public.is_admin_or_coordinator()
  or assigned_light_group_id in (select id from public.light_groups where lg_head_id = auth.uid())
);

create policy "admins and coordinators manage participants" on public.participants
for all to authenticated using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "staff read assignments" on public.lg_assignments
for select to authenticated using (true);

create policy "admins and coordinators manage assignments" on public.lg_assignments
for all to authenticated using (public.is_admin_or_coordinator())
with check (public.is_admin_or_coordinator());

create policy "staff read journey events" on public.servant_journey_events
for select to authenticated using (true);

create policy "staff create journey events" on public.servant_journey_events
for insert to authenticated with check (true);

create policy "staff read attendance sessions" on public.attendance_sessions
for select to authenticated using (true);

create policy "lg heads record own attendance sessions" on public.attendance_sessions
for insert to authenticated with check (
  public.is_admin_or_coordinator()
  or light_group_id in (select id from public.light_groups where lg_head_id = auth.uid())
);

create policy "staff read attendance records" on public.attendance_records
for select to authenticated using (true);

create policy "staff manage attendance records" on public.attendance_records
for all to authenticated using (true) with check (true);

create policy "staff read follow ups" on public.follow_ups
for select to authenticated using (true);

create policy "staff manage follow ups" on public.follow_ups
for all to authenticated using (true) with check (true);

create policy "staff read activity logs" on public.activity_logs
for select to authenticated using (true);

create policy "staff insert activity logs" on public.activity_logs
for insert to authenticated with check (true);
