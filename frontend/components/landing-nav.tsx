"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
];

export function LandingNav({ className }: { className?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground no-underline hover:text-foreground"
        >
          <span className="text-xl">🐉</span>
          <span>Kairo</span>
        </Link>
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
          <Button asChild size="sm" className="ml-2">
            <Link href="/dashboard">Get started</Link>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
