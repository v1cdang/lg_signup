import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-lg font-semibold">
          Light Groups
        </Link>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
          Admin sign in
        </Link>
      </header>
      <section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[320px_1fr]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Find a Light Group</h1>
          <p className="mt-4 text-muted-foreground">
            Share a few details so the team can match you with a group that fits your season, location, and schedule.
          </p>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
