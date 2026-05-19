import { Activity, CheckCircle2, Clock3, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardMetric } from "@/lib/types";

const icons = [UsersRound, CheckCircle2, Activity, Clock3];

export function DashboardWidgets({ metrics }: { metrics: DashboardMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = icons[index] ?? Activity;
        return (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              <Icon className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{metric.value}</div>
              <p className="text-sm text-muted-foreground">{metric.detail}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
