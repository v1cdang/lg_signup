import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/types";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, created_at")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function requireRole(roles: UserRole[]) {
  const profile = await getCurrentProfile();

  if (!profile) redirect("/login");
  if (!roles.includes(profile.role as UserRole)) redirect("/dashboard");

  return profile;
}
