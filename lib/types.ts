export type UserRole = "admin" | "coordinator" | "lg_head";

export type ParticipantStatus =
  | "new"
  | "endorsed"
  | "joined"
  | "active"
  | "inactive";

export type FollowUpStatus = "open" | "in_progress" | "completed" | "deferred";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  created_at: string;
};

export type Participant = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  age: number | null;
  life_stage: string | null;
  preferred_location: string | null;
  preferred_schedule: string | null;
  status: ParticipantStatus;
  assigned_light_group_id: string | null;
  notes: string | null;
  created_at: string;
};

export type LightGroup = {
  id: string;
  name: string;
  location: string;
  schedule: string;
  capacity: number;
  lg_head_id: string | null;
  active: boolean;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};
