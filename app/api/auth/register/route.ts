import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || password.length < 8) {
    return redirectWithError(request, "Please enter your name, email, and a password with at least 8 characters.");
  }

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    return redirectWithError(
      request,
      error instanceof Error ? error.message : "Supabase is not configured yet.",
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "lg_head",
      },
    },
  });

  if (error) {
    console.error("Supabase sign-up failed:", error.message);
    return redirectWithError(request, error.message);
  }

  if (!data.user) {
    return redirectWithError(request, "Supabase did not return a user for this signup.");
  }

  // If Supabase email confirmation is disabled, signUp returns a session and
  // the SSR client stores it in cookies. Otherwise the dashboard will redirect.
  return NextResponse.redirect(new URL(data.session ? "/dashboard" : "/login", request.url), 303);
}

function redirectWithError(request: Request, message: string) {
  const redirectUrl = new URL("/register", request.url);
  redirectUrl.searchParams.set("error", message);
  return NextResponse.redirect(redirectUrl, 303);
}
