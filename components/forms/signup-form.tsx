"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LIFE_STAGES = [
  "Student",
  "Young Professional",
  "Married",
  "Single Parent",
  "Young Couple",
  "Family with Kids",
  "Senior Adult",
];

const SCHEDULES = [
  "Weeknights",
  "Saturday Morning",
  "Saturday Afternoon",
  "Sunday Afternoon",
];

export function SignupForm() {
  const [state, setState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([]);

  function toggleSchedule(schedule: string) {
    setSelectedSchedule((prev) =>
      prev.includes(schedule)
        ? prev.filter((s) => s !== schedule)
        : [...prev, schedule]
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("preferredSchedule", selectedSchedule.join(", "));

    const response = await fetch("/api/public/signup", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      setSelectedSchedule([]);
      setState("success");
    } else {
      setState("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="overflow-hidden rounded-3xl border border-border/50 shadow-xl">
        <CardHeader className="space-y-4 bg-gradient-to-b from-muted/50 to-background px-6 py-8 md:px-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Join a Light Group
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Find a community where you can grow spiritually, build meaningful
              relationships, and journey with others.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Takes less than 2 minutes
            </div>

            <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              We’ll help match you with a group
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-8 md:px-10">
          {state === "success" ? (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  You’re all set 🎉
                </h2>

                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your sign-up has been received. A coordinator will reach out
                  soon to help connect you with a Light Group.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              {/* BASIC INFO */}
              <section className="space-y-5">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    Basic Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Tell us a little about yourself.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>

                  <Input
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="Juan Dela Cruz"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        name="phone"
                        placeholder="0917 123 4567"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* MATCHING */}
              <section className="space-y-5 rounded-2xl border bg-muted/20 p-5 md:p-6">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    Help Us Match You
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    We’ll use these details to connect you with the right group.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>

                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="12"
                      placeholder="18"
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lifeStage">
                      Current Season of Life
                    </Label>

                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <select
                        id="lifeStage"
                        name="lifeStage"
                        className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none ring-offset-background"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select one
                        </option>

                        {LIFE_STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">
                    Preferred Area
                  </Label>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="preferredLocation"
                      name="preferredLocation"
                      placeholder="Imus, Bacoor, Dasma, Online"
                      className="h-12 rounded-xl pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Available Schedule</Label>

                  <div className="flex flex-wrap gap-3">
                    {SCHEDULES.map((schedule) => {
                      const active =
                        selectedSchedule.includes(schedule);

                      return (
                        <button
                          key={schedule}
                          type="button"
                          onClick={() => toggleSchedule(schedule)}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all
                            ${
                              active
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-background hover:border-primary/40 hover:bg-muted"
                            }`}
                        >
                          <CalendarDays className="h-4 w-4" />
                          {schedule}
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="hidden"
                    name="preferredSchedule"
                    value={selectedSchedule.join(", ")}
                  />
                </div>
              </section>

              {/* NOTES */}
              <section className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">
                    Additional Notes
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Optional — prayer requests, concerns, preferred setup, or
                    anything you'd like us to know.
                  </p>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />

                  <Textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    placeholder="Share anything that may help us connect you with the right Light Group..."
                    className="rounded-2xl pl-10 pt-3"
                  />
                </div>
              </section>

              {/* ERROR */}
              {state === "error" && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                  Something went wrong. Please check your details and try again.
                </div>
              )}

              {/* SUBMIT */}
              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  className="h-12 w-full rounded-xl text-base font-semibold"
                >
                  {state === "submitting"
                    ? "Submitting..."
                    : "Join a Light Group"}
                </Button>

                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  A coordinator will reach out within a few days to help connect
                  you with a group.
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}