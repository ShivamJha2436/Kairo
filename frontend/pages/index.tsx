"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, GitBranch } from "lucide-react";
import { DotPattern } from "@/components/aceternity/dot-pattern";
import { LandingNav } from "@/components/landing-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <main className="relative min-h-screen overflow-hidden">
        <DotPattern className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 text-sm font-medium text-primary"
            >
              Self-hosted workflow engine for reliable step execution
            </motion.p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Reliable automation,
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                predictable results
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Kairo is a lightweight workflow engine that tracks every step, persists state, and lets you
              resume after failures. Think of it as a reliable to-do list for your automated processes.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs">Read the docs</Link>
              </Button>
            </motion.div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: Zap,
                title: "Sequential execution",
                description: "Steps run in order with state persisted so nothing is lost.",
              },
              {
                icon: Shield,
                title: "Failure-safe",
                description: "Resume after crashes; progress is tracked in the database.",
              },
              {
                icon: GitBranch,
                title: "API-first",
                description: "Trigger workflows via HTTP; monitor from the dashboard.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur transition-colors hover:border-primary/30 hover:bg-card/80">
                  <CardContent className="pt-6">
                    <item.icon className="mb-3 h-8 w-8 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-24 rounded-2xl border bg-muted/30 p-8 text-center sm:p-12"
          >
            <h2 className="mb-2 text-2xl font-semibold text-foreground">
              Ready to automate?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Start the API, define workflows, and trigger them via{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                POST /triggers/:name
              </code>
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </motion.section>
        </div>
      </main>
    </>
  );
}
