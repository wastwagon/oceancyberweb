"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Globe,
  Lock,
  Megaphone,
  Network,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { revealViewport, staggerDelay } from "@/lib/scroll-reveal";
import { cn } from "@/lib/utils";

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  href?: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Modern, high-performance websites built with proven technologies and measurable delivery standards.",
    features: ["Next.js", "TypeScript", "Performance"],
    icon: Globe,
    href: "/services/web-development",
  },
  {
    title: "Mobile apps",
    description:
      "Native and cross-platform apps built for reliable performance and clear user journeys.",
    features: ["React Native", "Flutter"],
    icon: Smartphone,
    href: "/services/mobile-apps",
  },
  {
    title: "E-commerce",
    description:
      "Scalable online stores with dependable checkout flows and payment integrations.",
    features: ["Shopify", "WooCommerce"],
    icon: ShoppingBag,
    href: "/services/ecommerce",
  },
  {
    title: "SEO & Marketing",
    description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
    features: ["Local SEO", "Content"],
    icon: Megaphone,
    href: "/services",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from digital threats.",
    features: ["Audits", "Protection"],
    icon: Lock,
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud migration services for modern businesses.",
    features: ["AWS", "Azure"],
    icon: Cloud,
    href: "/services",
  },
  {
    title: "Networking",
    description: "Robust network infrastructure ensuring reliable and secure connectivity.",
    features: ["Design", "Support"],
    icon: Network,
    href: "/services",
  },
  {
    title: "Website to App Conversion",
    description: "Bring your existing website and convert it into a mobile app with a scoped, milestone-based delivery plan.",
    features: ["iOS/Android", "UX mapping", "Quote-first"],
    icon: Smartphone,
    href: "/services/website-to-mobile-app",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const isFeatured = index === 0 || index === 3;
  const tone =
    index % 3 === 0
      ? "from-ocean-50 via-cyan-50/70 to-white"
      : index % 3 === 1
        ? "from-emerald-50/70 via-white to-ocean-50/40"
        : "from-violet-50/60 via-white to-sky-50/70";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={staggerDelay(index, 0.06)}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md sm:p-5 md:p-6",
        isFeatured && "md:col-span-2",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-80",
          tone,
        )}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ocean-100/70 blur-2xl" />
      <div className="flex h-full flex-col">
        <div className="relative z-10 mb-4 flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ocean-200/70 bg-white/80 text-ocean-700 ring-1 ring-ocean-100 backdrop-blur-sm">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-xs font-semibold text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          className={cn(
            "relative z-10 font-bold text-slate-900",
            isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
          )}
        >
          {service.title}
        </h3>
        <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-slate-200/80 bg-white/85 px-2.5 py-1 text-[11px] font-medium text-slate-600 backdrop-blur-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={service.href ?? "/services"}
          className={cn(
            "relative z-10 mt-5 inline-flex items-center gap-1.5 font-semibold text-ocean-700 transition-colors hover:text-ocean-800",
            isFeatured ? "text-sm" : "text-sm",
          )}
        >
          Explore service
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}

function ServicesRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600">
        Why OceanCyber
      </p>
      <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
        Premium delivery system for complex projects
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
        Built around OceanCyber execution standards: clear service categories, concise outcomes, and fast decision paths for teams.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 sm:mt-5 sm:space-y-2.5">
        <li>• Clear scope and phased rollout</li>
        <li>• Security and performance baseline included</li>
        <li>• Local support, global implementation quality</li>
      </ul>
      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
        <Link
          href="/contact"
          className="inline-flex min-h-[46px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-5 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
        >
          Talk to our team
        </Link>
        <Link
          href="/services"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
        >
          All services
        </Link>
        <Link
          href="/services/website-to-mobile-app"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ocean-300 bg-ocean-50/80 px-5 text-sm font-semibold text-ocean-800 transition hover:border-ocean-400 hover:bg-ocean-100/70"
        >
          Website-to-Mobile App Conversion Quote
        </Link>
      </div>
    </motion.aside>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-20 pt-24 md:pb-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-50/30 via-transparent to-white" />
        <div
          className="absolute left-1/2 top-0 h-[min(55vh,420px)] w-[min(150vw,1000px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(2,106,255,0.10)_0%,transparent_72%)] blur-[88px]"
          aria-hidden
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <header className="mx-auto mb-10 max-w-6xl text-center md:mb-14">
          <p className="mb-5 inline-flex items-center rounded-full border border-ocean-200 bg-ocean-50/95 px-4 py-2 text-xs font-medium tracking-wide text-ocean-800 shadow-sm sm:px-5 sm:py-2.5 sm:text-sm">
            Our services
          </p>
          <h3 className="mx-auto mb-4 max-w-4xl text-balance text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:mb-5 md:text-5xl lg:text-6xl">
            Premium service architecture{" "}
            <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
              for scale-ready brands
            </span>
          </h3>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            Designed for your market and audience: focused service clarity, stronger trust cues, and direct conversion paths.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.55fr]">
          <ServicesRail />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
