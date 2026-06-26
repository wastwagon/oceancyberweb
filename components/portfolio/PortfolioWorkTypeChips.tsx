"use client";

import {
  PORTFOLIO_PROJECT_TYPES,
  type PortfolioProjectType,
} from "@/lib/types/portfolio-project-type";
import { getProjectTypeLabel } from "@/lib/portfolio/project-type";
import { cn } from "@/lib/utils";

export type WorkTypeFilter = "All" | PortfolioProjectType;

export function PortfolioWorkTypeChips({
  value,
  onChange,
  className,
}: {
  value: WorkTypeFilter;
  onChange: (value: WorkTypeFilter) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      role="tablist"
      aria-label="Filter by work type"
    >
      <FilterChip active={value === "All"} onClick={() => onChange("All")}>
        All types
      </FilterChip>
      {PORTFOLIO_PROJECT_TYPES.map((t) => (
        <FilterChip key={t} active={value === t} onClick={() => onChange(t)}>
          {getProjectTypeLabel(t)}
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
