import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { lightGroups, participants } from "@/lib/demo-data";

export default function AssignmentsPage() {
  const queue = participants.filter((participant) => participant.status === "new" || participant.status === "endorsed");

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader>
          <CardTitle>LG matching workflow</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {queue.map((participant) => (
            <div key={participant.id} className="grid gap-4 rounded-lg border p-4 lg:grid-cols-[1fr_220px_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{participant.full_name}</p>
                  <StatusBadge status={participant.status} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {participant.life_stage} · {participant.preferred_location} · {participant.preferred_schedule}
                </p>
              </div>
              <Select>
                <SelectTrigger aria-label={`Select light group for ${participant.full_name}`}>
                  <SelectValue placeholder="Choose LG" />
                </SelectTrigger>
                <SelectContent>
                  {lightGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>
                Assign
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Matching rules</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
          <p>Prioritize exact schedule match, then location, life stage, and available group capacity.</p>
          <p>Assignment writes an activity log, creates an initial follow-up task, and updates status to endorsed.</p>
        </CardContent>
      </Card>
    </div>
  );
}
