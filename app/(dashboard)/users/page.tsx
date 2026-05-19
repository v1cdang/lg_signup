import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
  ["Grace Lim", "grace@example.com", "Admin"],
  ["Ben Cruz", "ben@example.com", "Coordinator"],
  ["Nina Tan", "nina@example.com", "LG Head"],
];

export default function UsersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User management</CardTitle>
        <Button>Invite user</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(([name, email, role]) => (
              <TableRow key={email}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{role}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
