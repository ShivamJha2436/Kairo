import Link from "next/link";
import { GitBranch, ListChecks } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="container">
      <Header
        title="Dashboard"
        subtitle="Monitor workflows and execution progress (read-only)"
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Link href="/workflows" className="block transition-opacity hover:opacity-90">
          <Card className="h-full transition-colors hover:border-primary/40">
            <CardHeader className="flex flex-row items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" />
              <CardTitle>Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View and manage all workflow definitions</CardDescription>
              <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                View workflows →
              </Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/executions" className="block transition-opacity hover:opacity-90">
          <Card className="h-full transition-colors hover:border-primary/40">
            <CardHeader className="flex flex-row items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              <CardTitle>Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View execution logs and progress</CardDescription>
              <Button variant="ghost" size="sm" className="mt-2 -ml-2">
                View executions →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </section>
      <p className="mt-8 text-sm text-muted-foreground">
        Trigger workflows via{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
          POST /triggers/:name
        </code>{" "}
        on the API (default: http://localhost:8080).
      </p>
    </div>
  );
}
