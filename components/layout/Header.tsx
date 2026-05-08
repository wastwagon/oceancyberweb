"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppButton } from "@/components/ghana-specific/WhatsAppButton";
import { usePathname } from "next/navigation";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import { useNavigationConfig } from "@/lib/navigation/useNavigationConfig";
import { cn } from "@/lib/utils";

function MegaMenu({
  isOpen,
  menuId,
  triggerLabel,
  title,
  description,
  items,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  menuId: string;
  triggerLabel: string;
  title: string;
  description: string;
  items: Array<{
    heading: string;
    description: string;
    link: string;
  }>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-[calc(100%+6px)] z-[9999] w-[min(92vw,640px)] overflow-hidden rounded-xl border border-sa-border bg-sa-surface/95 shadow-xl backdrop-blur-md"
          id={menuId}
          role="region"
          aria-label={`${triggerLabel} menu`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="max-h-[min(70vh,520px)] overflow-y-auto p-4 sm:p-5">
            <div className="mb-4 border-b border-sa-border pb-4">
              <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
              <p className="mt-1 text-xs leading-snug text-sa-muted/80">{description}</p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="group relative rounded-lg border border-transparent p-3 transition-colors hover:bg-sa-bg"
                >
                  <h4 className="font-heading text-sm font-semibold text-white group-hover:text-sa-primary">
                    {item.heading}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-sa-muted/80">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="group mt-3 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-sa-primary transition-colors hover:text-white"
                  >
                    Learn more
                    <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileAccordion({
  title,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  title: string;
  items: Array<{
    heading: string;
    description: string;
    link: string;
  }>;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sa-border bg-sa-surface">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-white sm:py-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-sa-primary" aria-hidden />
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-sa-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-sa-border"
          >
            <div className="space-y-2 px-3 pb-3 pt-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-3 sm:pb-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block rounded-xl border border-sa-border bg-sa-bg p-3 transition-colors hover:border-sa-primary/50"
                  onClick={onClose}
                >
                  <h4 className="mb-1 text-sm font-bold text-white">{item.heading}</h4>
                  <p className="line-clamp-2 text-[11px] leading-snug text-sa-muted/80">{item.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const HEADER_SOCIAL_LINKS = [
  { Icon: Facebook, href: "https://facebook.com/oceancyber", label: "Facebook" },
  { Icon: Twitter, href: "https://twitter.com/oceancyber", label: "Twitter" },
  { Icon: Instagram, href: "https://instagram.com/oceancyber", label: "Instagram" },
  { Icon: Linkedin, href: "https://linkedin.com/company/oceancyber", label: "LinkedIn" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const { mainHeaderNav: navItems, mainHeaderDropdownContent: dropdownContent } =
    useNavigationConfig();

  const homeNav = navItems.find((i) => i.href === "/");
  const dropdownNav = navItems.filter((i) => Boolean(i.dropdownKey));
  const flatNav = navItems.filter((i) => !i.dropdownKey && i.href !== "/");
  const isItemActive = (item: { href: string; activeMatch?: string[] }) => {
    const candidates = item.activeMatch ?? [item.href];
    return candidates.some((href) =>
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`),
    );
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] flex flex-col items-center px-4 pt-4 sm:px-6 md:px-8">
      <div
        className={`hidden w-full max-w-7xl overflow-hidden transition-all duration-500 lg:block ${scrolled ? "h-0 translate-y-[-100%] opacity-0" : "h-10 translate-y-0 opacity-100"}`}
      >
        <div className="flex h-full items-center justify-between gap-3 rounded-t-2xl border-x border-t border-sa-border bg-sa-bg/80 px-5 backdrop-blur-md">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60 2xl:gap-x-5">
            <a
              href="tel:+233242565695"
              className="flex min-w-0 items-center gap-2 transition-colors hover:text-sa-primary"
            >
              <Phone className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">+233 242 565 695</span>
            </a>
            <a
              href="mailto:info@oceancyber.net"
              className="flex min-w-0 items-center gap-2 transition-colors hover:text-sa-primary"
            >
              <Mail className="h-3 w-3 shrink-0" aria-hidden />
              <span className="truncate">info@oceancyber.net</span>
            </a>
            <span className="hidden min-w-0 2xl:inline text-sa-border">
              232 Nii Kwashiefio Avenue, Accra, Ghana
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <CurrencySelector compact className="hidden lg:flex" />
            <WhatsAppButton
              variant="default"
              size="sm"
              className="hidden h-8 min-h-0 rounded-full px-4 text-[10px] uppercase tracking-widest xl:inline-flex bg-emerald-500 text-white hover:bg-emerald-600 border-none"
            />
            {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sa-muted/60 transition-colors hover:text-sa-primary"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`w-full max-w-7xl transition-all duration-500 ${scrolled ? "" : ""}`}>
        <nav
          aria-label="Primary"
          className={`relative flex h-16 items-center gap-3 border border-sa-border px-4 backdrop-blur-md transition-all duration-500 sm:h-20 sm:px-6 ${
            scrolled
              ? "rounded-2xl bg-sa-surface/90 shadow-2xl"
              : "rounded-2xl lg:rounded-t-none bg-sa-surface/80"
          }`}
        >
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/images/oceancyber-logo.png"
              alt="OceanCyber"
              width={200}
              height={60}
              className="h-8 w-auto object-contain sm:h-10"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex max-w-full flex-nowrap items-center justify-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative flex shrink-0 items-stretch"
                  onMouseEnter={() => item.dropdownKey && setOpenDropdown(item.dropdownKey)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex h-10 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-[11px] font-bold uppercase tracking-widest transition-colors xl:px-4 ${
                      isItemActive(item)
                        ? "text-white bg-sa-bg/50"
                        : "text-sa-muted hover:text-white hover:bg-sa-bg/30"
                    }`}
                    aria-haspopup={item.dropdownKey ? "menu" : undefined}
                    aria-expanded={
                      item.dropdownKey
                        ? openDropdown === item.dropdownKey
                        : undefined
                    }
                    aria-controls={
                      item.dropdownKey
                        ? `${item.dropdownKey}-menu`
                        : undefined
                    }
                  >
                    {item.label}
                    {item.dropdownKey && (
                      <ChevronDown
                        className={`h-3 w-3 shrink-0 transition-transform ${openDropdown === item.dropdownKey ? "rotate-180 text-sa-primary" : ""}`}
                      />
                    )}
                  </Link>

                  {isItemActive(item) && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-sa-primary shadow-[0_0_8px_rgba(var(--sa-primary),0.5)]"
                    />
                  )}

                  {item.dropdownKey && (
                    <MegaMenu
                      isOpen={openDropdown === item.dropdownKey}
                      menuId={`${item.dropdownKey}-menu`}
                      triggerLabel={item.label}
                      title={dropdownContent[item.dropdownKey]?.title || ""}
                      description={dropdownContent[item.dropdownKey]?.description || ""}
                      items={dropdownContent[item.dropdownKey]?.items || []}
                      onMouseEnter={() => setOpenDropdown(item.dropdownKey!)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/signin"
                className="rounded-full border border-sa-border px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/get-started"
                className="sa-btn-primary h-auto py-2 px-5 min-h-0 text-[10px]"
              >
                Get started
              </Link>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-full border border-sa-border px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sa-muted transition-colors hover:border-sa-primary/50 hover:text-white sm:inline-flex lg:hidden"
            >
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex shrink-0 rounded-xl p-2 text-white hover:bg-sa-bg lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[40] bg-sa-bg/80 backdrop-blur-sm lg:hidden"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 360 }}
              className="fixed inset-x-0 bottom-0 z-[50] flex max-h-[min(90dvh,calc(100dvh-5.25rem))] flex-col rounded-t-3xl border border-sa-border border-b-0 bg-sa-surface shadow-2xl sm:inset-x-auto sm:bottom-6 sm:left-auto sm:right-4 sm:top-24 sm:max-h-[min(calc(100dvh-6.5rem),680px)] sm:w-[min(24rem,calc(100vw-1.5rem))] sm:rounded-3xl sm:border-b md:right-6 md:top-28 lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-sa-border px-5 py-4 sm:rounded-t-3xl">
                <div>
                  <p className="sa-eyebrow">
                    Navigate
                  </p>
                  <p className="mt-1 font-heading text-lg font-bold text-white">OceanCyber</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-sa-border p-2.5 text-sa-muted transition-colors hover:bg-sa-bg hover:text-white"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-4">
                {homeNav ? (
                  <Link
                    href={homeNav.href}
                    className={cn(
                      "mb-6 flex items-center justify-between rounded-2xl border px-5 py-4 text-sm font-bold transition-colors",
                      pathname === homeNav.href
                        ? "border-sa-primary bg-sa-primary/10 text-sa-primary"
                        : "border-sa-border bg-sa-bg text-white hover:border-sa-primary/50"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {homeNav.label}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sa-muted">Start here</span>
                  </Link>
                ) : null}

                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                  Solutions
                </p>
                <div className="space-y-3">
                  {dropdownNav.map((item) => (
                    <MobileAccordion
                      key={item.href}
                      title={item.label}
                      items={dropdownContent[item.dropdownKey!]?.items || []}
                      isOpen={openDropdown === item.dropdownKey}
                      onToggle={() =>
                        setOpenDropdown(
                          openDropdown === item.dropdownKey
                            ? null
                            : item.dropdownKey!
                        )
                      }
                      onClose={() => setIsMenuOpen(false)}
                    />
                  ))}
                </div>

                {flatNav.length > 0 ? (
                  <>
                    <p className="mb-3 mt-8 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                      Pages
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {flatNav.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "rounded-2xl border px-5 py-4 text-sm font-bold transition-colors",
                            pathname === item.href
                              ? "border-sa-primary bg-sa-primary/10 text-sa-primary"
                              : "border-sa-border bg-sa-bg text-white hover:border-sa-primary/50"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="shrink-0 border-t border-sa-border bg-sa-bg px-5 py-4">
                <CurrencySelector className="max-w-full sm:max-w-xs" compact={false} />
              </div>

              <div className="shrink-0 space-y-3 border-t border-sa-border bg-sa-surface px-5 py-5 sm:rounded-b-3xl">
                <WhatsAppButton variant="default" size="md" className="w-full bg-emerald-500 text-white hover:bg-emerald-600 border-none" />
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/signin"
                    className="flex min-h-[48px] items-center justify-center rounded-xl border border-sa-border bg-sa-bg text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-sa-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="flex min-h-[48px] items-center justify-center rounded-xl border border-sa-border bg-sa-bg text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-sa-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create account
                  </Link>
                </div>
                <Link
                  href="/get-started"
                  className="sa-btn-primary w-full min-h-[48px] justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started
                </Link>
                <div className="border-t border-sa-border pt-5 mt-2">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-sa-muted/60">
                    Reach us
                  </p>
                  <div className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-widest text-sa-muted">
                    <a
                      href="tel:+233242565695"
                      className="flex items-center gap-3 transition-colors hover:text-sa-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                      <span>+233 242 565 695</span>
                    </a>
                    <a
                      href="mailto:info@oceancyber.net"
                      className="flex items-center gap-3 transition-colors hover:text-sa-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail className="h-4 w-4 shrink-0 text-sa-primary" aria-hidden />
                      <span>info@oceancyber.net</span>
                    </a>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sa-muted transition-colors hover:text-sa-primary"
                        aria-label={label}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
