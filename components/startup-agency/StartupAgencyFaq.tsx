"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/lib/startup-agency/content";
import { cn } from "@/lib/utils";

export function StartupAgencyFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn(
              "group overflow-hidden rounded-[20px] border transition-all duration-500",
              isOpen 
                ? "border-sa-primary/50 bg-sa-surface shadow-lg shadow-sa-primary/5" 
                : "border-sa-border bg-sa-surface/30 hover:border-sa-primary/30"
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                {item.q}
              </span>
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                isOpen 
                  ? "border-sa-primary bg-sa-primary text-black" 
                  : "border-sa-border bg-transparent text-white group-hover:border-sa-primary group-hover:text-sa-primary"
              )}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </div>
            </button>
            
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-8 pt-0">
                  <p className="text-base leading-relaxed text-sa-muted/90">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
