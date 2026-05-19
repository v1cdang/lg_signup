import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {["Participant pipeline", "Attendance health", "Follow-up aging"].map((report) => (
        <Card key={report}>
          <CardHeader>
            <CardTitle>{report}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Export a CSV report filtered by date range, status, and LG.</p>
            <Button asChild variant="outline">
              <a href="/api/reports/participants">
                <Download data-icon="inline-start" />
                Export CSV
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
