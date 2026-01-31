import { useEffect, useState } from 'react';
import Header from '../components/Header';
import WorkflowCard from '../components/WorkflowCard';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

type Workflow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/workflows`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then(setWorkflows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <Header
        title="Workflows"
        subtitle="All defined workflows (read-only)"
      />
      {loading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Error: {error}</p>}
      {!loading && !error && workflows.length === 0 && (
        <p className="text-muted-foreground">No workflows yet. Add them via the database or API.</p>
      )}
      {!loading && !error && workflows.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map((w) => (
            <WorkflowCard key={w.id} workflow={w} />
          ))}
        </div>
      )}
    </div>
  );
}
