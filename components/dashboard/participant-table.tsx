import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Participant } from "@/lib/types";

export function ParticipantTable({ participants }: { participants: Participant[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle>Participant database</CardTitle>
        <div className="grid gap-2 sm:grid-cols-[220px_180px_auto]">
          <Input placeholder="Search participants" aria-label="Search participants" />
          <Select defaultValue="all">
            <SelectTrigger aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="endorsed">Endorsed</SelectItem>
              <SelectItem value="joined">Joined</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export CSV</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preference</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>
                  <div className="font-medium">{participant.full_name}</div>
                  <div className="text-xs text-muted-foreground">{participant.life_stage}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={participant.status} />
                </TableCell>
                <TableCell>
                  <div>{participant.preferred_location}</div>
                  <div className="text-xs text-muted-foreground">{participant.preferred_schedule}</div>
                </TableCell>
                <TableCell>
                  <div>{participant.email}</div>
                  <div className="text-xs text-muted-foreground">{participant.phone}</div>
                </TableCell>
                <TableCell className="max-w-56 truncate">{participant.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
