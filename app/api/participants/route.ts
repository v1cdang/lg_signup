import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const query = searchParams.get("q");
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Supabase is not configured." },
      { status: 503 },
    );
  }

  let builder = supabase
    .from("participants")
    .select("*, light_groups(name, location, schedule)")
    .order("created_at", { ascending: false });

  if (status && status !== "all") builder = builder.eq("status", status);
  if (query) builder = builder.ilike("full_name", `%${query}%`);

  const { data, error } = await builder;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
