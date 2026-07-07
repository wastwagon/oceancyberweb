"use client";

import {
  PORTFOLIO_SOURCE_LABELS,
  type SourceFilter,
} from "@/lib/types/portfolio-source";
import { cn } from "@/lib/utils";

const SOURCE_OPTIONS: SourceFilter[] = ["All", "client", "studio"];

export function PortfolioSourceChips({
  value,
  onChange,
  className,
}: {
  value: SourceFilter;
  onChange: (value: SourceFilter) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="tablist"
      aria-label="Filter by project source"
    >
      {SOURCE_OPTIONS.map((option) => (
        <FilterChip
          key={option}
          active={value === option}
          onClick={() => onChange(option)}
        >
          {option === "All" ? "All projects" : PORTFOLIO_SOURCE_LABELS[option]}
        </FilterChip>
      ))}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors",
        active
          ? "border-sa-primary bg-sa-primary/20 text-sa-primary"
          : "border-sa-border bg-sa-surface text-sa-muted hover:border-sa-primary/50 hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
