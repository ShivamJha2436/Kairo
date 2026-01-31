import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Workflow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link href={`/executions?workflow_id=${workflow.id}`} className="block transition-opacity hover:opacity-90">
      <Card className="h-full transition-colors hover:border-primary/40">
        <CardHeader className="pb-2">
          <div className="font-semibold text-foreground">{workflow.name}</div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xs text-muted-foreground font-mono">ID: {workflow.id}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
