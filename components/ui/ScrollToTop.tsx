"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 group p-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full shadow-2xl shadow-cyan-500/50 hover:scale-110 hover:shadow-cyan-400/70 transition-all duration-300 border border-cyan-400/30 backdrop-blur-sm"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
    </button>
  );
}