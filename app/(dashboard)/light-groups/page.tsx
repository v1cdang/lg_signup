import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { lightGroups } from "@/lib/demo-data";

export default function LightGroupsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Light Groups</CardTitle>
        <Button>Add LG</Button>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lightGroups.map((group) => (
          <div key={group.id} className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">{group.name}</p>
              <Badge variant={group.active ? "default" : "outline"}>{group.active ? "Active" : "Paused"}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{group.location}</p>
            <p className="text-sm text-muted-foreground">{group.schedule}</p>
            <p className="mt-4 text-sm font-medium">Capacity {group.capacity}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
