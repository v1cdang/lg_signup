import Link from "next/link";
import { ArrowRight, ShieldCheck, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-lg font-semibold">
          Light Groups
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Create account</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Join an LG</Link>
          </Button>
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="flex flex-col gap-6">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            A clear path from sign-up to belonging.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Receive public Light Group interest forms, match participants to healthy groups,
            track follow-up, and keep coordinators aligned from one calm workspace.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/signup">
                Start sign-up
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Ministry operations covered</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {[
              ["Participant journey", "New, endorsed, joined, active, and inactive states."],
              ["LG assignment", "Match people by location, schedule, stage, and capacity."],
              ["Care rhythm", "Attendance, follow-up tasks, timelines, and logs."],
            ].map(([title, detail]) => (
              <div key={title} className="flex gap-3 rounded-md border p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  {title === "Care rhythm" ? <ShieldCheck /> : <UsersRound />}
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
