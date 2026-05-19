import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { assignmentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = assignmentSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid assignment payload" }, { status: 422 });
  }

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 503 },
    );
  }
  const { participantId, lightGroupId, notes } = parsed.data;

  const { error: assignmentError } = await supabase.from("lg_assignments").insert({
    participant_id: participantId,
    light_group_id: lightGroupId,
    notes: notes || null,
  });

  if (assignmentError) return NextResponse.json({ error: assignmentError.message }, { status: 500 });

  const { error: participantError } = await supabase
    .from("participants")
    .update({ assigned_light_group_id: lightGroupId, status: "endorsed" })
    .eq("id", participantId);

  if (participantError) return NextResponse.json({ error: participantError.message }, { status: 500 });

  await supabase.from("follow_ups").insert({
    participant_id: participantId,
    title: "Confirm first LG visit",
    status: "open",
    due_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  });

  await supabase.from("activity_logs").insert({
    entity_type: "participant",
    entity_id: participantId,
    action: "assigned_to_light_group",
    metadata: { light_group_id: lightGroupId },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
