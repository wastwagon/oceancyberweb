"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { faqItems } from "@/lib/startup-agency/content";
import { cn } from "@/lib/utils";

export function StartupAgencyFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="sa-ios-group divide-y divide-white/[0.06] md:space-y-4 md:divide-y-0">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={cn(
                "overflow-hidden transition-colors md:rounded-[20px] md:border md:shadow-lg",
                isOpen
                  ? "md:border-sa-primary/50 md:bg-sa-surface md:shadow-sa-primary/5"
                  : "md:border-sa-border md:bg-sa-surface/30 md:hover:border-sa-primary/30",
              )}
            >
              <button
                type="button"
                className="sa-pressable flex w-full min-h-[52px] items-center justify-between gap-4 px-4 py-4 text-left md:px-6 md:py-6"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-[17px] font-semibold leading-snug text-white md:font-heading md:text-lg md:font-bold md:tracking-tight md:text-xl">
                  {item.q}
                </span>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 shrink-0 text-sa-muted transition-transform duration-300",
                    isOpen && "rotate-90 text-sa-primary",
                  )}
                  aria-hidden
                />
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pt-0 md:px-6 md:pb-8">
                    <p className="text-[15px] leading-relaxed text-sa-muted/90 md:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
