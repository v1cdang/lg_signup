import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { participantStatusSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = participantStatusSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 422 });
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
  const { error } = await supabase.from("participants").update({ status: parsed.data.status }).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("activity_logs").insert({
    entity_type: "participant",
    entity_id: id,
    action: "status_changed",
    metadata: { status: parsed.data.status },
  });

  return NextResponse.json({ ok: true });
}
