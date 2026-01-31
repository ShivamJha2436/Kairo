"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground no-underline hover:text-foreground"
          >
            <span className="text-lg">🐉</span>
            Kairo Docs
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Documentation
          </h1>
          <p className="text-muted-foreground">
            Self-hosted workflow engine for reliable step execution. v0.1.0
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Overview</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Kairo is a self-hosted workflow engine for reliable step execution. It provides an HTTP
              API that exposes triggers and read-only endpoints for workflows and executions. The
              worker polls for pending executions and runs steps sequentially. State is stored in
              PostgreSQL; Redis is reserved for future queue use. The frontend is a Next.js
              read-only dashboard for monitoring workflows and executions.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">API Endpoints</h2>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-foreground">Method</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Path</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-mono text-primary">POST</td>
                    <td className="px-4 py-3 font-mono">/triggers/:name</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      Trigger a workflow by name; returns execution_id
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-primary">GET</td>
                    <td className="px-4 py-3 font-mono">/workflows</td>
                    <td className="px-4 py-3 text-muted-foreground">List all workflows</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-primary">GET</td>
                    <td className="px-4 py-3 font-mono">/executions?id=:id</td>
                    <td className="px-4 py-3 text-muted-foreground">Get execution by ID</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-primary">GET</td>
                    <td className="px-4 py-3 font-mono">/executions?workflow_id=:id</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      List executions for a workflow
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">How to Use Kairo</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Prerequisites</CardTitle>
                  <CardDescription>
                    Go 1.22+, Node.js 18+ (for frontend), Docker & Docker Compose (optional)
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">1. Clone and configure</CardTitle>
                  <CardContent className="pt-0">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`git clone <repo-url>
cd kairo
cp .env.example .env`}
                    </pre>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">2. Start services (Docker)</CardTitle>
                  <CardContent className="pt-0">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`make up
# or: docker compose -f docker/docker-compose.yml up -d`}
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Starts API on http://localhost:8080, PostgreSQL on 5432, Redis on 6379.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">3. Run migrations</CardTitle>
                  <CardContent className="pt-0">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`make migrate
# or run the API once; it runs Migrate on startup
make run`}
                    </pre>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">4. Define a workflow</CardTitle>
                  <CardContent className="pt-0">
                    <p className="mb-2 text-sm text-muted-foreground">
                      Insert via psql or any Postgres client:
                    </p>
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`INSERT INTO workflows (name) VALUES ('my-workflow') RETURNING id;
INSERT INTO steps (workflow_id, order_index, name, action, config)
VALUES
  ('<workflow-uuid>', 0, 'step1', 'http', '{"url":"https://httpbin.org/get","method":"GET"}'),
  ('<workflow-uuid>', 1, 'step2', 'http', '{"url":"https://httpbin.org/post","method":"POST"}');`}
                    </pre>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">5. Trigger a workflow</CardTitle>
                  <CardContent className="pt-0">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`curl -X POST http://localhost:8080/triggers/my-workflow`}
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Response: {"{"}"execution_id":"&lt;uuid&gt;"{"}"}
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">6. Monitor in the dashboard</CardTitle>
                  <CardContent className="pt-0">
                    <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
{`cd frontend
npm install
npm run dev`}
                    </pre>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Open http://localhost:3000 and use the dashboard to view workflows and
                      execution logs (read-only).
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Troubleshooting</h2>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">Migration fails:</strong> Ensure Postgres is up
                and DATABASE_URL is correct; run from repo root so migrations/001_init.sql is found.
              </li>
              <li>
                <strong className="text-foreground">Trigger returns 404:</strong> Workflow name must
                match exactly; check SELECT * FROM workflows;.
              </li>
              <li>
                <strong className="text-foreground">API won&apos;t start:</strong> Check port 8080 is
                free and run go mod tidy then go build ./cmd/api.
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-16 flex justify-center">
          <Button asChild>
            <Link href="/dashboard" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Open Dashboard
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
