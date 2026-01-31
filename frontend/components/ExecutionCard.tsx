type Execution = {
  id: string;
  workflow_id: string;
  status: string;
  current_step: number;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
};

export default function ExecutionCard({ execution }: { execution: Execution }) {
  return (
    <div
      style={{
        padding: '1rem 1.25rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        marginBottom: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600 }}>{execution.id}</span>
        <span className={`status-${execution.status}`} style={{ fontSize: '0.85rem', textTransform: 'capitalize' }}>
          {execution.status}
        </span>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Step {execution.current_step} · Created {new Date(execution.created_at).toLocaleString()}
        {execution.finished_at && ` · Finished ${new Date(execution.finished_at).toLocaleString()}`}
      </div>
    </div>
  );
}
