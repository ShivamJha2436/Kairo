import Header from '../components/Header';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="container">
      <Header
        title="Dashboard"
        subtitle="Monitor workflows and execution progress (read-only)"
      />
      <section style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <Link
          href="/workflows"
          style={{
            padding: '1.5rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Workflows</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>View all workflows</div>
        </Link>
        <Link
          href="/executions"
          style={{
            padding: '1.5rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Executions</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>View execution logs</div>
        </Link>
      </section>
      <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Trigger workflows via <code style={{ background: 'var(--surface)', padding: '0.2rem 0.4rem', borderRadius: 4 }}>POST /triggers/:name</code> on the API (default: http://localhost:8080).
      </p>
    </div>
  );
}
