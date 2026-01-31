"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutDashboard, GitBranch, ListChecks, BookOpen } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: GitBranch },
  { href: "/executions", label: "Executions", icon: ListChecks },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <aside className="flex h-screen w-56 flex-col border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground no-underline"
        >
          <span className="text-lg">🐉</span>
          Kairo
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-2">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Button
              variant={pathname === href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 font-normal",
                pathname === href && "bg-secondary"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
        <div className="my-2 border-t pt-2">
          <Link href="/docs">
            <Button variant="ghost" className="w-full justify-start gap-2 font-normal">
              <BookOpen className="h-4 w-4" />
              Docs
            </Button>
          </Link>
        </div>
      </nav>
      <div className="border-t p-2">
        <div className="flex items-center justify-between rounded-md px-2 py-1.5">
          <span className="text-xs text-muted-foreground">Theme</span>
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
}
