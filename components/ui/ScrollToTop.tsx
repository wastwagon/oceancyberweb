"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { floatingChrome } from "@/components/ui/floating-chrome";
import { cn } from "@/lib/utils";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(floatingChrome.scrollToTop, floatingChrome.fab)}
      aria-label="Scroll to top"
      data-app-print-hide-chrome
    >
      <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
