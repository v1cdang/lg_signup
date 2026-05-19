"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SignupForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/public/signup", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      form.reset();
      setState("success");
    } else {
      setState("error");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Light Group sign-up</CardTitle>
      </CardHeader>
      <CardContent>
        {state === "success" ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary/20 bg-secondary p-8 text-center">
            <CheckCircle2 className="text-primary" />
            <div>
              <p className="text-lg font-semibold">Your form was received.</p>
              <p className="text-sm text-muted-foreground">A coordinator will reach out with next steps.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" min="12" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lifeStage">Life stage</Label>
                <Input id="lifeStage" name="lifeStage" placeholder="College, married, young pro" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preferredLocation">Preferred location</Label>
                <Input id="preferredLocation" name="preferredLocation" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="preferredSchedule">Preferred schedule</Label>
              <Input id="preferredSchedule" name="preferredSchedule" placeholder="Weeknight, Saturday afternoon" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Anything we should know?</Label>
              <Textarea id="notes" name="notes" />
            </div>
            {state === "error" ? <p className="text-sm text-destructive">Please check the form and try again.</p> : null}
            <Button disabled={state === "submitting"}>{state === "submitting" ? "Submitting..." : "Submit sign-up"}</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
