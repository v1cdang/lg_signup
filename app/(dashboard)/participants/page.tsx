import { ParticipantTable } from "@/components/dashboard/participant-table";
import { participants } from "@/lib/demo-data";

export default function ParticipantsPage() {
  return <ParticipantTable participants={participants} />;
}
