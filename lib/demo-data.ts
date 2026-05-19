import type { DashboardMetric, LightGroup, Participant } from "@/lib/types";

export const metrics: DashboardMetric[] = [
  { label: "New sign-ups", value: "42", detail: "+12 this week" },
  { label: "Endorsed", value: "18", detail: "Ready for matching" },
  { label: "Joined", value: "126", detail: "Across 14 LGs" },
  { label: "Follow-ups due", value: "9", detail: "3 overdue" },
];

export const participants: Participant[] = [
  {
    id: "1",
    full_name: "Mika Reyes",
    email: "mika@example.com",
    phone: "+63 917 000 0123",
    age: 27,
    life_stage: "Young Professional",
    preferred_location: "BGC",
    preferred_schedule: "Friday evening",
    status: "new",
    assigned_light_group_id: null,
    notes: "Interested after Sunday service.",
    created_at: "2026-05-15T10:00:00Z",
  },
  {
    id: "2",
    full_name: "Aaron Santos",
    email: "aaron@example.com",
    phone: "+63 918 000 0456",
    age: 34,
    life_stage: "Married",
    preferred_location: "Makati",
    preferred_schedule: "Wednesday evening",
    status: "endorsed",
    assigned_light_group_id: null,
    notes: "Prefers family-friendly schedule.",
    created_at: "2026-05-12T10:00:00Z",
  },
  {
    id: "3",
    full_name: "Lia Chua",
    email: "lia@example.com",
    phone: "+63 919 000 0789",
    age: 22,
    life_stage: "College",
    preferred_location: "Katipunan",
    preferred_schedule: "Saturday afternoon",
    status: "active",
    assigned_light_group_id: "lg-1",
    notes: "Joined campus LG.",
    created_at: "2026-04-22T10:00:00Z",
  },
];

export const lightGroups: LightGroup[] = [
  {
    id: "lg-1",
    name: "BGC Young Pros",
    location: "BGC",
    schedule: "Friday 7:30 PM",
    capacity: 12,
    lg_head_id: null,
    active: true,
  },
  {
    id: "lg-2",
    name: "Makati Families",
    location: "Makati",
    schedule: "Wednesday 7:00 PM",
    capacity: 10,
    lg_head_id: null,
    active: true,
  },
  {
    id: "lg-3",
    name: "Katipunan Campus",
    location: "Katipunan",
    schedule: "Saturday 3:00 PM",
    capacity: 15,
    lg_head_id: null,
    active: true,
  },
];
