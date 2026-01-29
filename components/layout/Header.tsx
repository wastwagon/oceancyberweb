"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ocean-900/80 backdrop-blur-2xl border-b border-cyan-400/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center group-hover:from-cyan-300 group-hover:to-teal-300 transition-all shadow-lg shadow-cyan-500/20">
                <Waves className="w-5 h-5 text-ocean-900" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className="text-lg font-semibold transition-colors tracking-tight text-cyan-100">
              OceanCyber
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-cyan-100/70 hover:text-cyan-100 transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <div className="ml-4">
              <WhatsAppButton variant="outline" size="sm" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-cyan-100/70 hover:text-cyan-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ocean-900/95 backdrop-blur-2xl border-b border-cyan-400/20"
          >
            <div className="container mx-auto px-6 py-8 space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2 text-cyan-100 font-medium hover:text-cyan-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <WhatsAppButton variant="default" size="md" className="w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
