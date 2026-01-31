import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import ExecutionCard from '../components/ExecutionCard';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

type Execution = {
  id: string;
  workflow_id: string;
  status: string;
  current_step: number;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
};

export default function ExecutionsPage() {
  const router = useRouter();
  const workflowId = (router.query.workflow_id as string) || '';
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workflowId) {
      setLoading(false);
      setExecutions([]);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/executions?workflow_id=${encodeURIComponent(workflowId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then(setExecutions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [workflowId]);

  return (
    <div className="container">
      <Header
        title="Executions"
        subtitle={workflowId ? `Executions for workflow ${workflowId}` : 'Select a workflow to view executions'}
      />
      {!workflowId && (
        <p className="text-muted-foreground">
          Open executions from a workflow on the <a href="/workflows" className="text-primary hover:underline">Workflows</a> page, or add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">?workflow_id=:id</code> to the URL.
        </p>
      )}
      {workflowId && loading && <p className="text-muted-foreground">Loading…</p>}
      {workflowId && error && <p className="text-destructive">Error: {error}</p>}
      {workflowId && !loading && !error && executions.length === 0 && (
        <p className="text-muted-foreground">No executions for this workflow yet.</p>
      )}
      {workflowId && !loading && !error && executions.length > 0 && (
        <div>
          {executions.map((e) => (
            <ExecutionCard key={e.id} execution={e} />
          ))}
        </div>
      )}
    </div>
  );
}
