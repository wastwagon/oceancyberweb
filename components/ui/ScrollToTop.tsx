"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

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
      className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-sa-primary/30 bg-sa-bg text-sa-primary shadow-2xl transition-all hover:bg-sa-primary hover:text-sa-bg active:scale-[0.95] sm:bottom-6 sm:right-6"
      aria-label="Scroll to top"
      data-app-print-hide-chrome
    >
      <ArrowUp className="h-6 w-6" strokeWidth={2.5} />
    </button>
  );
}
