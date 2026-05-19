import { z } from "zod";

export const participantSignupSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email."),
  phone: z.string().min(7, "Enter a reachable phone number."),
  age: z.coerce.number().min(12).max(120).optional().or(z.literal("")),
  lifeStage: z.string().optional(),
  preferredLocation: z.string().optional(),
  preferredSchedule: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

export const assignmentSchema = z.object({
  participantId: z.string().uuid(),
  lightGroupId: z.string().uuid(),
  notes: z.string().max(1000).optional(),
});

export const participantStatusSchema = z.object({
  status: z.enum(["new", "endorsed", "joined", "active", "inactive"]),
});
