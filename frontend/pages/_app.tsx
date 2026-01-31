import type { AppProps } from 'next/app';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '1.5rem 2rem' }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
