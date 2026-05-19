import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { participantSignupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = participantSignupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid sign-up payload", issues: parsed.error.flatten() }, { status: 422 });
  }

  let supabase: ReturnType<typeof createSupabaseAdminClient>;
  try {
    supabase = createSupabaseAdminClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 503 },
    );
  }
  const payload = parsed.data;
  const { data, error } = await supabase
    .from("participants")
    .insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      age: payload.age === "" ? null : payload.age,
      life_stage: payload.lifeStage || null,
      preferred_location: payload.preferredLocation || null,
      preferred_schedule: payload.preferredSchedule || null,
      notes: payload.notes || null,
      status: "new",
      source: "public_form",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("activity_logs").insert({
    entity_type: "participant",
    entity_id: data.id,
    action: "public_signup_submitted",
    metadata: { source: "public_form" },
  });

  return NextResponse.json({ id: data.id }, { status: 201 });
}
