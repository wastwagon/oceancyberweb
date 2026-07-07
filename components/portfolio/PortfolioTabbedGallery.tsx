"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ClientWorkGrid } from "@/components/portfolio/ClientWorkGrid";
import { CreativeHubGallery } from "@/components/portfolio/CreativeHubGallery";
import { creativeHubGallery } from "@/lib/data/creative-hub-gallery";
import { featuredClientWork } from "@/lib/data/featured-client-work";
import { cn } from "@/lib/utils";

export type PortfolioTab = "live" | "creative";

const TABS: { id: PortfolioTab; label: string; shortLabel: string }[] = [
  { id: "live", label: "Live client sites", shortLabel: "Live" },
  { id: "creative", label: "Creative Hub", shortLabel: "Studio" },
];

type PortfolioTabbedGalleryProps = {
  /** Homepage embed uses shorter copy and defaults to live tab only navigation */
  variant?: "page" | "section";
  className?: string;
};

export function PortfolioTabbedGallery({
  variant = "page",
  className = "",
}: PortfolioTabbedGalleryProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPortfolioPage = pathname === "/portfolio";
  const tabParam = searchParams.get("tab");
  const initialTab: PortfolioTab =
    tabParam === "creative" || tabParam === "studio" ? "creative" : "live";

  const [activeTab, setActiveTab] = useState<PortfolioTab>(initialTab);

  useEffect(() => {
    if (tabParam === "creative" || tabParam === "studio") {
      setActiveTab("creative");
    } else if (tabParam === "live") {
      setActiveTab("live");
    }
  }, [tabParam]);

  const onSelect = useCallback((tab: PortfolioTab) => {
    setActiveTab(tab);
    if (!isPortfolioPage || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (tab === "live") url.searchParams.delete("tab");
    else url.searchParams.set("tab", "creative");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [isPortfolioPage]);

  const isPage = variant === "page";

  return (
    <div className={className}>
      <div
        className={cn("flex flex-col gap-4", isPage ? "mb-10" : "mb-8")}
        role="tablist"
        aria-label="Portfolio views"
      >
        <div className="mx-auto inline-flex w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-1">
          {TABS.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`portfolio-panel-${tab.id}`}
                id={`portfolio-tab-${tab.id}`}
                onClick={() => onSelect(tab.id)}
                className={cn(
                  "sa-pressable flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition-colors md:py-3 md:text-[15px]",
                  selected
                    ? "bg-sa-primary text-sa-bg shadow-sm"
                    : "text-sa-muted/80",
                )}
              >
                <span className="md:hidden">{tab.shortLabel}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-sm text-sa-muted/75">
          {activeTab === "live"
            ? "Production websites you can open right now — screenshots captured from each live URL."
            : "Studio concepts and illustrative UI — not live client deployments."}
        </p>
      </div>

      <div
        role="tabpanel"
        id={`portfolio-panel-${activeTab}`}
        aria-labelledby={`portfolio-tab-${activeTab}`}
      >
        {activeTab === "live" ? (
          <ClientWorkGrid items={featuredClientWork} />
        ) : (
          <CreativeHubGallery items={creativeHubGallery} />
        )}
      </div>
    </div>
  );
}
