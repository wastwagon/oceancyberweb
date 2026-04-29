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

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  accent: string;
  chip: string;
  href?: string;
}

function CardClipart({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[1]">
      <div className="relative h-16 w-20">
        <div className="absolute right-0 top-0 h-12 w-12 rounded-2xl border border-white/80 bg-white/85 shadow-sm backdrop-blur-sm" />
        <div className="absolute left-0 top-6 h-8 w-8 rounded-full border border-white/80 bg-white/75" />
        <div className="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </div>
      </div>
    </div>
  );
}

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Modern, high-performance websites built with proven technologies and measurable delivery standards.",
    features: ["Next.js", "TypeScript", "Performance"],
    icon: Globe,
    accent: "from-sky-100 via-cyan-50 to-white",
    chip: "bg-sky-100 text-sky-700 border-sky-200",
    href: "/services/web-development",
  },
  {
    title: "Mobile apps",
    description:
      "Native and cross-platform apps built for reliable performance and clear user journeys.",
    features: ["React Native", "Flutter"],
    icon: Smartphone,
    accent: "from-violet-100 via-fuchsia-50 to-white",
    chip: "bg-violet-100 text-violet-700 border-violet-200",
    href: "/services/mobile-apps",
  },
  {
    title: "E-commerce",
    description:
      "Scalable online stores with dependable checkout flows and payment integrations.",
    features: ["Shopify", "WooCommerce"],
    icon: ShoppingBag,
    accent: "from-amber-100 via-orange-50 to-white",
    chip: "bg-amber-100 text-amber-700 border-amber-200",
    href: "/services/ecommerce",
  },
  {
    title: "SEO & Marketing",
    description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
    features: ["Local SEO", "Content"],
    icon: Megaphone,
    accent: "from-emerald-100 via-lime-50 to-white",
    chip: "bg-emerald-100 text-emerald-700 border-emerald-200",
    href: "/services",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from digital threats.",
    features: ["Audits", "Protection"],
    icon: Lock,
    accent: "from-rose-100 via-pink-50 to-white",
    chip: "bg-rose-100 text-rose-700 border-rose-200",
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud migration services for modern businesses.",
    features: ["AWS", "Azure"],
    icon: Cloud,
    accent: "from-indigo-100 via-blue-50 to-white",
    chip: "bg-indigo-100 text-indigo-700 border-indigo-200",
    href: "/services",
  },
  {
    title: "Networking",
    description: "Robust network infrastructure ensuring reliable and secure connectivity.",
    features: ["Design", "Support"],
    icon: Network,
    accent: "from-teal-100 via-cyan-50 to-white",
    chip: "bg-teal-100 text-teal-700 border-teal-200",
    href: "/services",
  },
  {
    title: "Website to App Conversion",
    description: "Bring your existing website and convert it into a mobile app with a scoped, milestone-based delivery plan.",
    features: ["iOS/Android", "UX mapping", "Quote-first"],
    icon: Smartphone,
    accent: "from-blue-100 via-sky-50 to-white",
    chip: "bg-blue-100 text-blue-700 border-blue-200",
    href: "/services/website-to-mobile-app",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={staggerDelay(index, 0.06)}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md sm:p-5 md:p-6"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-90`}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/70 blur-2xl" />
      <CardClipart Icon={Icon} />
      <div className="flex h-full flex-col">
        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/70 bg-white text-ocean-700 ring-1 ring-slate-100">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${service.chip}`}>
            Service
          </span>
          <span className="ml-auto text-xs font-semibold text-slate-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="relative z-10 text-base font-bold text-slate-900 sm:text-lg md:text-xl">
          {service.title}
        </h3>
        <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:line-clamp-2">
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

        <div className="relative z-10 mt-5 border-t border-slate-200/70 pt-4">
          <Link
            href={service.href ?? "/services"}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition-colors hover:text-ocean-800"
          >
            Explore service
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.div>
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

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-7 py-3 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
          >
            Talk to our team
          </Link>
          <Link
            href="/services/website-to-mobile-app"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Website-to-Mobile App Conversion Quote
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
