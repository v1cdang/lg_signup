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
  User,
  Cake,
  Facebook,
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

const SCHEDULES = [
  "Sunday after Feast 1",
  "Sunday after Feast 2",
  "Saturday",
  "Weekdays 7PM",
];

const LIFE_MINISTRIES = [
  "Couples",
  "Singles & Young Adults",
  "Solo Parents",
  "Wives",
  "Others",
];

export function SignupForm() {
  const [state, setState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);

  function toggleSchedule(schedule: string) {
    setSelectedSchedules((prev) =>
      prev.includes(schedule)
        ? prev.filter((s) => s !== schedule)
        : [...prev, schedule]
    );
  }

  function toggleMinistry(ministry: string) {
    setSelectedMinistries((prev) =>
      prev.includes(ministry)
        ? prev.filter((m) => m !== ministry)
        : [...prev, ministry]
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set(
      "preferredSchedules",
      selectedSchedules.join(", ")
    );

    formData.set(
      "lifeMinistries",
      selectedMinistries.join(", ")
    );

    const response = await fetch("/api/public/signup", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      setSelectedSchedules([]);
      setSelectedMinistries([]);
      setState("success");
    } else {
      setState("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="overflow-hidden rounded-3xl border border-border/50 shadow-xl">
        <CardHeader className="space-y-4 bg-gradient-to-b from-muted/40 to-background px-6 py-8 md:px-10">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Join a Light Group
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Kindly complete this form so we can help match you
              with a Light Group based on volunteer availability,
              schedule, and ministry fit.
            </p>
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
                  You're all set 🎉
                </h2>

                <p className="max-w-md text-sm text-muted-foreground">
                  Your sign-up has been received. A coordinator
                  will contact you soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-10">
              {/* PARTICIPANT INFORMATION */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">
                    Participant Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Tell us a little about yourself.
                  </p>
                </div>

                {/* FULL NAME + NICKNAME */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name
                    </Label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="Juan Dela Cruz"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nickname">
                      Nickname
                    </Label>

                    <Input
                      id="nickname"
                      name="nickname"
                      placeholder="Juan"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                {/* PHONE + EMAIL */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Mobile Number / Viber
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        name="phone"
                        required
                        placeholder="0917 123 4567"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>

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
                </div>

                {/* BIRTHDATE + SOCIAL */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">
                      Birthdate
                    </Label>

                    <div className="relative">
                      <Cake className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socials">
                      Social Media Accounts
                    </Label>

                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="socials"
                        name="socials"
                        placeholder="FB, IG, Messenger"
                        className="h-12 rounded-xl pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* FEAST ATTENDANCE */}
                <div className="space-y-4 rounded-2xl border bg-muted/20 p-5">
                  <div className="space-y-1">
                    <h3 className="font-semibold">
                      Feast Bellevue Attendance
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Let us know if you're already attending.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Session 1",
                      "Session 2",
                      "Not Yet Attending",
                    ].map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm hover:border-primary"
                      >
                        <input
                          type="radio"
                          name="feastAttendance"
                          value={option}
                        />

                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* MATCHING PREFERENCES */}
              <section className="space-y-6 rounded-3xl border bg-muted/20 p-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">
                    Matching Preferences
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Help us connect you with the right group.
                  </p>
                </div>

                {/* LOCATION */}
                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">
                    Preferred Area / Location
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

                {/* SCHEDULE */}
                <div className="space-y-3">
                  <Label>Preferred Schedule</Label>

                  <div className="flex flex-wrap gap-3">
                    {SCHEDULES.map((schedule) => {
                      const active =
                        selectedSchedules.includes(schedule);

                      return (
                        <button
                          key={schedule}
                          type="button"
                          onClick={() =>
                            toggleSchedule(schedule)
                          }
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all
                          ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background hover:border-primary/50"
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
                    name="preferredSchedules"
                    value={selectedSchedules.join(", ")}
                  />
                </div>

                {/* LIFE MINISTRY */}
                <div className="space-y-3">
                  <Label>Life Ministry</Label>

                  <div className="flex flex-wrap gap-3">
                    {LIFE_MINISTRIES.map((ministry) => {
                      const active =
                        selectedMinistries.includes(ministry);

                      return (
                        <button
                          key={ministry}
                          type="button"
                          onClick={() =>
                            toggleMinistry(ministry)
                          }
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all
                          ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background hover:border-primary/50"
                          }`}
                        >
                          <Users className="h-4 w-4" />
                          {ministry}
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="hidden"
                    name="lifeMinistries"
                    value={selectedMinistries.join(", ")}
                  />
                </div>
              </section>

              {/* ALTERNATIVE + NOTES */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">
                    Additional Information
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Optional information that may help us place
                    you better.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternativeSchedule">
                    Alternative Schedule
                  </Label>

                  <Input
                    id="alternativeSchedule"
                    name="alternativeSchedule"
                    placeholder="If your preferred schedule is full..."
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">
                    Anything else we should know?
                  </Label>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />

                    <Textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      placeholder="Prayer requests, concerns, preferred setup, etc."
                      className="rounded-2xl pl-10 pt-3"
                    />
                  </div>
                </div>
              </section>

              {/* ERROR */}
              {state === "error" && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                  Something went wrong. Please check your form
                  and try again.
                </div>
              )}

              {/* SUBMIT */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  className="h-12 w-full rounded-xl text-base font-semibold"
                >
                  {state === "submitting"
                    ? "Submitting..."
                    : "Join a Light Group"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  A Light Group coordinator will contact you
                  soon.
                </p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}