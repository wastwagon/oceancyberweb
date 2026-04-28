"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Cloud,
  Globe,
  Lock,
  Megaphone,
  Network,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { fadeFromLeft, revealViewport } from "@/lib/scroll-reveal";

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
    description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
    features: ["Next.js", "TypeScript", "Performance"],
    icon: Globe,
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform applications that deliver exceptional user experiences.",
    features: ["React Native", "Flutter"],
    icon: Smartphone,
    href: "/services/mobile-apps",
  },
  {
    title: "E-Commerce",
    description: "Scalable online stores with seamless checkout and payment integrations.",
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
    title: "Custom Software",
    description: "Tailored solutions that automate processes and drive operational efficiency.",
    features: ["APIs", "Integration"],
    icon: Blocks,
    href: "/services",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-ocean-200 hover:shadow-md"
    >
      <div className="flex h-full flex-col">
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean-700 ring-1 ring-ocean-100">
          <Icon className="h-5 w-5" aria-hidden />
        </span>

        <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={service.href ?? "/services"}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-700 transition-colors hover:text-ocean-800"
        >
          Explore service
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-24 pt-28 md:pb-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-50/30 via-transparent to-white" />
        <div
          className="absolute left-1/2 top-0 h-[min(55vh,420px)] w-[min(150vw,1000px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(2,106,255,0.10)_0%,transparent_72%)] blur-[88px]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/90" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <header className="mx-auto mb-14 max-w-6xl text-center md:mb-16">
          <motion.div {...fadeFromLeft}>
            <h2 className="mb-6 inline-flex items-center rounded-full border border-ocean-200 bg-ocean-50/95 px-5 py-2.5 text-sm font-medium tracking-wide text-ocean-800 shadow-sm">
              Our Services
            </h2>
            <h3 className="mx-auto mb-6 max-w-4xl text-balance text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Premium execution for{" "}
              <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
                growth, reliability, and trust
              </span>
            </h3>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Designed for global audiences and built with enterprise discipline, our services combine strong UX, technical depth, and measurable business outcomes.
            </p>
          </motion.div>
        </header>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 flex max-w-6xl flex-col items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:mt-20 md:flex-row md:p-8"
        >
          <div className="text-center md:text-left">
            <h4 className="mb-1.5 text-xl font-bold text-slate-900">Need a tailored service mix?</h4>
            <p className="text-slate-600">We will recommend the right stack based on your goals, budget, and launch timeline.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] min-w-[220px] items-center justify-center rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-6 py-3 text-sm font-bold text-white shadow-md shadow-ocean-600/20 transition hover:brightness-110 active:scale-[0.98]"
          >
            Book a consultation
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            View all service details
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
