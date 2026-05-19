import { Badge } from "@/components/ui/badge";
import type { ParticipantStatus } from "@/lib/types";

const labels: Record<ParticipantStatus, string> = {
  new: "New",
  endorsed: "Endorsed",
  joined: "Joined",
  active: "Active",
  inactive: "Inactive",
};

export function StatusBadge({ status }: { status: ParticipantStatus }) {
  const variant = status === "inactive" ? "outline" : status === "new" ? "secondary" : "default";
  return <Badge variant={variant}>{labels[status]}</Badge>;
}
