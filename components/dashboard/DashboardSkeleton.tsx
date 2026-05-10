"use client";

import { motion } from "framer-motion";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top Cards Skeleton */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="h-64 rounded-3xl bg-sa-surface/30 md:col-span-2" />
        <div className="h-64 rounded-3xl bg-sa-surface/30" />
      </section>

      {/* Promotion Card Skeleton */}
      <div className="h-32 rounded-3xl bg-sa-surface/30" />

      {/* Subscriptions Skeleton */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-sa-surface/30 rounded-lg" />
          <div className="h-10 w-64 bg-sa-surface/30 rounded-full" />
        </div>
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-3xl bg-sa-surface/30" />
          ))}
        </div>
      </div>

      {/* Activity Grid Skeleton */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 rounded-3xl bg-sa-surface/30" />
        <div className="h-80 rounded-3xl bg-sa-surface/30" />
      </section>
    </div>
  );
}
