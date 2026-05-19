import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  ["BGC Young Pros", "2026-05-15", "9 present", "2 absent"],
  ["Makati Families", "2026-05-14", "8 present", "1 absent"],
  ["Katipunan Campus", "2026-05-16", "13 present", "0 absent"],
];

export default function AttendancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Light Group</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Present</TableHead>
              <TableHead>Absent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.join("-")}>
                {row.map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
