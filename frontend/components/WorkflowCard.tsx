import Link from 'next/link';

type Workflow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <Link
      href={`/executions?workflow_id=${workflow.id}`}
      style={{
        display: 'block',
        padding: '1rem 1.25rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{workflow.name}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        ID: {workflow.id}
      </div>
    </Link>
  );
}
