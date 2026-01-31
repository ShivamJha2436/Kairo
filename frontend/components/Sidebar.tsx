import Link from 'next/link';

const nav = [
  { href: '/', label: 'Dashboard' },
  { href: '/workflows', label: 'Workflows' },
  { href: '/executions', label: 'Executions' },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: '1.5rem 0',
      }}
    >
      <div style={{ padding: '0 1rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
        <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'inherit' }}>
          Kairo
        </Link>
      </div>
      <nav>
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: 'block',
              padding: '0.6rem 1rem',
              color: 'var(--text-muted)',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
