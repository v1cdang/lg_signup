# Light Group Management System

Next.js, TailwindCSS, shadcn/ui-style components, and Supabase/PostgreSQL foundation for Light Group operations.

## What is included

- Public Light Group sign-up form at `/signup`
- Protected admin workspace routes under `/dashboard`
- Role model for `admin`, `coordinator`, and `lg_head`
- Participant database, status tracking, LG assignment workflow, attendance, reports, user management, follow-ups, journey events, and activity logs
- Supabase Auth helpers, middleware session refresh, API routes, CSV export route, and Postgres migration with RLS
- Self-service account registration at `/register`; new users default to the `lg_head` role

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Apply the migration in `supabase/migrations/202605190001_initial_lg_management.sql`.
4. In Supabase Auth settings, disable email confirmation for the Email provider so users can sign up without verification.
5. Run the app:

```bash
npm install
npm run dev
```

Without Supabase env vars, the UI routes still render for local preview. Supabase-backed API routes return a clear `503` until configured.
