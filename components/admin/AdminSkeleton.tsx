"use client";

import { motion } from "framer-motion";

export function AdminSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Stat Grid Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-sa-surface/30" />
        ))}
      </div>

      {/* Project Form Skeleton */}
      <div className="h-48 rounded-3xl bg-sa-surface/30" />

      {/* Projects List Skeleton */}
      <div className="space-y-6">
        <div className="h-8 w-48 bg-sa-surface/30 rounded-lg" />
        {[1, 2].map((i) => (
          <div key={i} className="h-80 rounded-3xl bg-sa-surface/30" />
        ))}
      </div>

      {/* Lead Pipeline Skeleton */}
      <div className="h-[600px] rounded-3xl bg-sa-surface/30" />
    </div>
  );
}
