import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets";
import { ParticipantTable } from "@/components/dashboard/participant-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lightGroups, metrics, participants } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardWidgets metrics={metrics} />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <ParticipantTable participants={participants} />
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment queue</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {participants.filter((p) => p.status !== "active").map((participant) => (
                <div key={participant.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{participant.full_name}</p>
                    <Badge variant="secondary">{participant.preferred_location}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{participant.preferred_schedule}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>LG capacity</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {lightGroups.map((group, index) => (
                <div key={group.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-sm text-muted-foreground">{group.schedule}</p>
                  </div>
                  <Badge variant="outline">{index + 6}/{group.capacity}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
