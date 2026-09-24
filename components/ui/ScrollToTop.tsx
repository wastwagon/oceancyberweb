"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { floatingChrome } from "@/components/ui/floating-chrome";
import { cn } from "@/lib/utils";

/** Desktop-only — mobile relies on the tab bar; avoids FAB stack clutter. */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 320);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(floatingChrome.scrollToTop, floatingChrome.fab, "hidden md:flex")}
      aria-label="Scroll to top"
      data-app-print-hide-chrome
    >
      <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
