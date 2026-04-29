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
          className="absolute left-0 top-[calc(100%+6px)] z-[9999] w-[min(92vw,640px)] overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.12)] backdrop-blur-md"
          id={menuId}
          role="region"
          aria-label={`${triggerLabel} menu`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="max-h-[min(70vh,520px)] overflow-y-auto p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
              <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">{description}</p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="group relative rounded-lg border border-transparent p-3 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50"
                >
                  <h4 className="text-sm font-semibold text-slate-900 group-hover:text-ocean-600 sm:text-[15px]">
                    {item.heading}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                    {item.description}
                  </p>
                  <Link
                    href={item.link}
                    className="group mt-2 inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-ocean-700 transition-colors hover:text-ocean-900"
                  >
                    Learn more
                    <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-semibold text-slate-900 sm:py-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean-500" aria-hidden />
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-slate-200"
          >
            <div className="space-y-2 px-3 pb-3 pt-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 sm:px-3 sm:pb-4">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-ocean-300 hover:bg-slate-50"
                  onClick={onClose}
                >
                  <h4 className="mb-0.5 text-sm font-bold text-slate-900">{item.heading}</h4>
                  <p className="line-clamp-2 text-[11px] leading-snug text-slate-600">{item.description}</p>
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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/industries", label: "Industries", hasDropdown: true },
    { href: "/domains", label: "Domains" },
    { href: "/hosting", label: "Hosting" },
    { href: "/insights", label: "Resources", hasDropdown: true },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const dropdownContent = {
    services: {
      title: "Our services",
      description: "Comprehensive digital solutions tailored to your business needs",
      items: [
        {
          heading: "Web Development",
          description:
            "Modern, high-performance websites built with proven technologies.",
          link: "/services/web-development",
        },
        {
          heading: "Mobile apps",
          description:
            "Native and cross-platform applications designed for reliable user experiences.",
          link: "/services/mobile-apps",
        },
        {
          heading: "Website to App Conversion",
          description: "Bring your website and get a scoped mobile app conversion quote.",
          link: "/services/website-to-mobile-app",
        },
        {
          heading: "E-commerce",
          description:
            "Scalable online stores with dependable checkout and payment flows.",
          link: "/services/ecommerce",
        },
        {
          heading: "Cybersecurity",
          description: "Comprehensive security solutions to protect your business.",
          link: "/services/cybersecurity",
        },
      ],
    },
    industries: {
      title: "Industries We Serve",
      description: "Empowering diverse industries across Ghana and Africa.",
      items: [
        {
          heading: "Financial Services",
          description: "Secure banking solutions and fintech innovations.",
          link: "/industries/financial-services",
        },
        {
          heading: "Healthcare",
          description: "HIPAA-compliant healthcare technology solutions.",
          link: "/industries/healthcare",
        },
        {
          heading: "Education",
          description:
            "Practical e-learning platforms that improve delivery and outcomes.",
          link: "/industries/education",
        },
        {
          heading: "Retail & E-commerce",
          description: "Retail technology to boost online sales and engagement.",
          link: "/industries/retail",
        },
      ],
    },
    resources: {
      title: "Insights & Guidance",
      description:
        "Planning resources, real project stories, and security guidance.",
      items: [
        {
          heading: "Insights",
          description: "Strategy notes, platform updates, and practical guides.",
          link: "/insights",
        },
        {
          heading: "Case studies",
          description: "Delivery outcomes across sectors in Ghana and beyond.",
          link: "/case-studies",
        },
        {
          heading: "Security journey",
          description: "A practical path to strengthen your security posture.",
          link: "/security-journey",
        },
        {
          heading: "Help center",
          description: "Answers to common questions about onboarding and support.",
          link: "/help-center",
        },
      ],
    },
  };

  const homeNav = navItems.find((i) => i.href === "/");
  const dropdownNav = navItems.filter((i) => i.hasDropdown);
  const flatNav = navItems.filter((i) => !i.hasDropdown && i.href !== "/");
  const isItemActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center bg-white/95 px-3 pt-2 shadow-sm backdrop-blur-md sm:px-5 sm:pt-3 md:px-8">
      <div
        className={`hidden w-full max-w-7xl overflow-hidden transition-all duration-500 lg:block ${scrolled ? "h-0 translate-y-[-100%] opacity-0" : "h-10 translate-y-0 opacity-100"}`}
      >
        <div className="flex h-full items-center justify-between gap-3 rounded-t-2xl border-x border-t border-slate-200/90 bg-gradient-to-r from-slate-50/95 via-white/90 to-slate-50/95 px-4 backdrop-blur-md sm:px-5">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 2xl:gap-x-5">
            <a
              href="tel:+233242565695"
              className="flex min-w-0 items-center gap-2 text-slate-700 transition-colors hover:text-ocean-700"
            >
              <Phone className="h-3 w-3 shrink-0 text-ocean-600" aria-hidden />
              <span className="truncate">+233 242 565 695</span>
            </a>
            <a
              href="mailto:info@oceancyber.net"
              className="flex min-w-0 items-center gap-2 text-slate-700 transition-colors hover:text-ocean-700"
            >
              <Mail className="h-3 w-3 shrink-0 text-ocean-600" aria-hidden />
              <span className="truncate">info@oceancyber.net</span>
            </a>
            <span className="hidden min-w-0 text-slate-500 2xl:inline">
              232 Nii Kwashiefio Avenue, Accra, Ghana
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <CurrencySelector compact className="hidden lg:flex" />
            <WhatsAppButton
              variant="default"
              size="sm"
              className="hidden h-8 min-h-0 rounded-full px-3 text-xs shadow-sm xl:inline-flex"
            />
            {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 transition-colors hover:text-ocean-600"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`w-full max-w-7xl transition-all duration-500 ${scrolled ? "mt-4" : "mt-0"}`}>
        <nav
          aria-label="Primary"
          className={`relative flex h-[4.25rem] min-h-[4.25rem] items-center gap-2 border border-slate-200/90 px-3 backdrop-blur-md transition-all duration-500 sm:h-20 sm:min-h-[5rem] sm:gap-3 sm:px-6 ${
            scrolled
              ? "rounded-2xl bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
              : "max-lg:rounded-2xl max-lg:bg-white/95 lg:rounded-b-2xl lg:bg-white/80"
          }`}
        >
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/images/oceancyber logo.webp"
              alt="OceanCyber"
              width={200}
              height={60}
              className="h-9 w-auto object-contain sm:h-10"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className="flex max-w-full flex-nowrap items-center justify-center gap-0.5 xl:gap-1">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative flex shrink-0 items-stretch"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label.toLowerCase())}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex h-10 items-center gap-1 whitespace-nowrap rounded-lg px-2.5 text-[12px] font-semibold leading-none transition-all duration-300 xl:px-3 xl:text-[13px] ${
                      isItemActive(item.href)
                        ? "text-ocean-800"
                        : "text-slate-600 hover:text-ocean-700"
                    }`}
                    aria-haspopup={item.hasDropdown ? "menu" : undefined}
                    aria-expanded={
                      item.hasDropdown
                        ? openDropdown === item.label.toLowerCase()
                        : undefined
                    }
                    aria-controls={
                      item.hasDropdown
                        ? `${item.label.toLowerCase()}-menu`
                        : undefined
                    }
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`h-3 w-3 shrink-0 transition-transform ${openDropdown === item.label.toLowerCase() ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {isItemActive(item.href) && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-ocean-600 shadow-[0_0_12px_rgba(2,106,255,0.35)]"
                    />
                  )}

                  {item.hasDropdown && (
                    <MegaMenu
                      isOpen={openDropdown === item.label.toLowerCase()}
                      menuId={`${item.label.toLowerCase()}-menu`}
                      triggerLabel={item.label}
                      title={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.title || ""}
                      description={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.description || ""}
                      items={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items || []}
                      onMouseEnter={() => setOpenDropdown(item.label.toLowerCase())}
                      onMouseLeave={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <div className="hidden items-center gap-1.5 lg:flex">
              <Link
                href="/signin"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-ocean-300 hover:text-ocean-700"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-ocean-300 hover:text-ocean-700"
              >
                Create account
              </Link>
              <Link
                href="/get-started"
                className="rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-ocean-600/20 transition-all hover:brightness-110"
              >
                Get started
              </Link>
            </div>
            <Link
              href="/contact"
              className="hidden rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/80 sm:inline-flex lg:hidden"
            >
              Contact
            </Link>
            <button
              type="button"
              className="inline-flex shrink-0 rounded-xl p-2.5 text-slate-800 hover:bg-slate-100 lg:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="fixed inset-0 z-[40] bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
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
              className="fixed inset-x-0 bottom-0 z-[50] flex max-h-[min(90dvh,calc(100dvh-5.25rem))] flex-col rounded-t-3xl border border-slate-200 border-b-0 bg-white shadow-[0_-20px_60px_rgba(15,23,42,0.12)] sm:inset-x-auto sm:bottom-6 sm:left-auto sm:right-4 sm:top-20 sm:max-h-[min(calc(100dvh-6.5rem),680px)] sm:w-[min(22rem,calc(100vw-1.5rem))] sm:rounded-3xl sm:border-b sm:border-slate-200 md:right-6 md:top-24 lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:rounded-t-3xl sm:px-5 sm:py-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
                    Navigate
                  </p>
                  <p className="text-sm font-semibold text-slate-900">OceanCyber</p>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4 pt-2 sm:px-5">
                {homeNav ? (
                  <Link
                    href={homeNav.href}
                    className={`mb-4 flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-bold transition-colors sm:py-4 ${
                      pathname === homeNav.href
                        ? "border-ocean-300 bg-ocean-50 text-ocean-900"
                        : "border-slate-200 bg-slate-50/80 text-slate-800 hover:border-ocean-200"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {homeNav.label}
                    <span className="text-xs font-normal text-slate-500">Start here</span>
                  </Link>
                ) : null}

                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Solutions
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {dropdownNav.map((item) => (
                    <MobileAccordion
                      key={item.href}
                      title={item.label}
                      items={dropdownContent[item.label.toLowerCase() as keyof typeof dropdownContent]?.items || []}
                      isOpen={openDropdown === item.label.toLowerCase()}
                      onToggle={() =>
                        setOpenDropdown(
                          openDropdown === item.label.toLowerCase()
                            ? null
                            : item.label.toLowerCase()
                        )
                      }
                      onClose={() => setIsMenuOpen(false)}
                    />
                  ))}
                </div>

                <p className="mb-2 mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Pages
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {flatNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "border-ocean-200 bg-ocean-50/80 text-ocean-900"
                          : "border-slate-200 bg-slate-50/50 text-slate-800 hover:border-ocean-200 hover:bg-slate-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-200 bg-gradient-to-b from-slate-50/80 to-white px-4 py-4 sm:px-5">
                <CurrencySelector className="max-w-full sm:max-w-xs" compact={false} />
              </div>

              <div className="shrink-0 space-y-2 border-t border-slate-200 bg-slate-50/90 px-4 py-4 sm:rounded-b-3xl sm:px-5">
                <WhatsAppButton variant="default" size="md" className="w-full" />
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create account
                  </Link>
                </div>
                <Link
                  href="/get-started"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 py-3 text-sm font-bold text-white shadow-sm shadow-ocean-600/25 transition-all hover:brightness-110"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started
                </Link>
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-ocean-300 hover:bg-ocean-50/60"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact form
                </Link>
                <div className="border-t border-slate-200 pt-4">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Reach us
                  </p>
                  <div className="flex flex-col gap-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-800">
                    <a
                      href="tel:+233242565695"
                      className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-ocean-600" aria-hidden />
                      <span>+233 242 565 695</span>
                    </a>
                    <a
                      href="mailto:info@oceancyber.net"
                      className="flex items-center gap-2.5 break-all transition-opacity hover:opacity-90"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-ocean-600" aria-hidden />
                      <span>info@oceancyber.net</span>
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {HEADER_SOCIAL_LINKS.map(({ Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 transition-colors hover:text-ocean-600"
                        aria-label={label}
                      >
                        <Icon size={16} strokeWidth={1.75} />
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
