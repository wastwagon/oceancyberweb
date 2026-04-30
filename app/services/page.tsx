"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";

type ServiceCard = {
  title: string;
  description: string;
  image: string;
  services: string[];
  href: string;
};

const services: ServiceCard[] = [
  {
    title: "Web development",
    description:
      "Modern, high-performance websites and web products, with SEO, accessibility, and speed budgets built in from day one.",
      image: "/images/Fitch Advisory.webp",
    services: [
      "Marketing and brand experiences",
      "Product dashboards and workflows",
      "Headless CMS and integrations",
    ],
    href: "/services/web-development",
  },
  {
    title: "Mobile apps",
    description:
      "Cross-platform and native paths: offline-aware flows, push, and store-ready release discipline.",
      image: "/images/EGP Ghana.webp",
    services: [
      "iOS and Android delivery",
      "Performance and crash hygiene",
      "Payments, identity, and deep links",
    ],
    href: "/services/mobile-apps",
  },
  {
    title: "Website to mobile app conversion",
    description:
      "Bring your existing website, and we will convert it into an iOS- and Android-ready app with a structured quote and migration roadmap.",
    image: "/images/EGP Ghana.webp",
    services: [
      "Website architecture audit",
      "Mobile UX conversion plan",
      "Scoped quote with milestones",
    ],
    href: "/services/website-to-mobile-app",
  },
  {
    title: "E-commerce",
    description:
      "Checkout trust, catalog accuracy, and operations tooling, from launch campaigns to steady-state ops.",
      image: "/images/Juelle Hair.webp",
    services: [
      "Shopify, WooCommerce, and custom",
      "Payments and reconciliation",
      "Inventory and analytics layers",
    ],
    href: "/services/ecommerce",
    },
    {
      title: "Cybersecurity",
    description:
      "Assessments, hardening, and readiness: practical controls, evidence, and response planning your teams can run.",
      image: "/images/Fitch Attorney.webp",
    services: [
      "Threat detection alignment",
      "Data protection and privacy",
      "Compliance and incident readiness",
    ],
    href: "/services/cybersecurity",
  },
];

function PageAmbient() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(2, 106, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 106, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(2,106,255,0.1)_0%,transparent_72%)] blur-[88px]" />
    </div>
  );
}

function ServiceGridCard({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={staggerDelay(index, 0.07)}
    >
      <Link
        href={service.href}
        className="sa-card group flex h-full flex-col overflow-hidden text-left"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
        </div>
        <div className="border-t border-sa-border p-6 md:p-7">
          <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
            {service.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
            {service.description}
          </p>
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-sa-muted/50">
            Typical scope
          </p>
          <ul className="mt-2 space-y-2">
            {service.services.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-sm text-sa-muted/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sa-primary" />
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sa-primary transition-colors group-hover:text-white">
            Explore service
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <section className="sa-section relative z-10 overflow-hidden border-b border-sa-border pt-28 md:pt-36">
        <div className="sa-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="sa-eyebrow mb-6 inline-flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" aria-hidden />
              Services
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              End-to-end
              <span className="text-sa-primary"> delivery</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
            >
              Strategy, design, engineering, and security, composed into programs
              you can fund, staff, and measure without surprises.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {services.map((service, index) => (
              <ServiceGridCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="sa-section relative z-10 border-t border-sa-border">
        <div className="sa-container max-w-3xl">
          <motion.div
            {...fadeUpProps}
            className="sa-card p-10 text-center md:p-14"
          >
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
              Not sure where to start?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted md:text-base">
              Tell us about constraints, timelines, and stakeholders, and we will
              recommend a sequencing plan and team shape that fits.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="sa-btn-primary">
                Talk to our team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
