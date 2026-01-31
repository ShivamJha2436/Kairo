"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background",
        "before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] before:bg-[size:24px_24px] before:opacity-50",
        "after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)] after:opacity-100",
        "dark:before:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]",
        "dark:after:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.2),transparent)]",
        className
      )}
    >
      {children}
    </div>
  );
}
