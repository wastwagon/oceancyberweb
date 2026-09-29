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
      className={cn("sa-chip-scroller", className)}
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
      className="sa-tab"
    >
      {children}
    </button>
  );
}
