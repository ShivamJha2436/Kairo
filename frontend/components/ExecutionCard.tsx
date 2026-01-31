import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Execution = {
  id: string;
  workflow_id: string;
  status: string;
  current_step: number;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  running: "default",
  completed: "outline",
  failed: "destructive",
};

export default function ExecutionCard({ execution }: { execution: Execution }) {
  const variant = statusVariant[execution.status] ?? "secondary";
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <span className="font-mono text-sm font-medium text-foreground">{execution.id}</span>
        <Badge variant={variant} className="capitalize">
          {execution.status}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-muted-foreground">
          Step {execution.current_step} · Created {new Date(execution.created_at).toLocaleString()}
          {execution.finished_at &&
            ` · Finished ${new Date(execution.finished_at).toLocaleString()}`}
        </div>
      </CardContent>
    </Card>
  );
}
