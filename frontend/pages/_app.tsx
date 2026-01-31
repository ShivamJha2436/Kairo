import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const SIDEBAR_PATHS = ["/dashboard", "/workflows", "/executions"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showSidebar = SIDEBAR_PATHS.some((path) => router.pathname.startsWith(path));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen bg-background text-foreground">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Component {...pageProps} />
        </main>
      </div>
    </ThemeProvider>
  );
}
