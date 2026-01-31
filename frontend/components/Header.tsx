type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header style={{ marginBottom: '1.5rem' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>{title}</h1>
      {subtitle && (
        <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
