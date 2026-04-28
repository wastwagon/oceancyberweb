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
      className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 text-white shadow-lg shadow-ocean-600/30 transition-all hover:brightness-110 hover:shadow-ocean-600/40 active:scale-[0.97] sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 sm:h-[1.15rem] sm:w-[1.15rem]" strokeWidth={2.25} />
    </button>
  );
}
