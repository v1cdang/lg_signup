import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 503 },
    );
  }
  const { data } = await supabase
    .from("participants")
    .select("full_name,email,phone,status,preferred_location,preferred_schedule,created_at")
    .order("created_at", { ascending: false });

  const rows = data ?? [];
  const header = ["full_name", "email", "phone", "status", "preferred_location", "preferred_schedule", "created_at"];
  const csv = [
    header.join(","),
    ...rows.map((row) =>
      header
        .map((key) => {
          const value = String(row[key as keyof typeof row] ?? "");
          return `"${value.replaceAll('"', '""')}"`;
        })
        .join(","),
    ),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="participants.csv"',
    },
  });
}
