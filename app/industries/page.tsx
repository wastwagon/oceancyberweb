"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroSectionMotionLayers } from "@/components/layout/HeroSectionMotionLayers";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";

type IndustryCard = {
  title: string;
  description: string;
  image: string;
  services: string[];
  href: string | null;
};

const industries: IndustryCard[] = [
  {
    title: "Financial Services",
    description:
      "Banking-grade platforms, payments, and risk tooling designed for Ghana's regulatory reality.",
    image: "/images/industries/finance.png",
    services: [
      "Digital banking platforms",
      "Payment gateway integration",
      "Fraud detection systems",
      "Compliance solutions",
    ],
    href: "/industries/financial-services",
  },
  {
    title: "Healthcare",
    description:
      "Healthcare technology that improves access and operations while respecting privacy and uptime.",
    image: "/images/industries/healthcare.png",
    services: [
      "Electronic health records",
      "Telemedicine platforms",
      "Medical data analytics",
      "Patient management systems",
    ],
    href: "/industries/healthcare",
  },
  {
    title: "Education",
    description:
      "E-learning platforms and tools that scale from institutions to national programs.",
    image: "/images/industries/education.png",
    services: [
      "Learning management systems",
      "Virtual classrooms",
      "Educational apps",
      "Student analytics",
    ],
    href: "/industries/education",
  },
  {
    title: "Tourism & Hospitality",
    description:
      "Booking, guest experience, and operations software for travel brands.",
    image: "/images/industries/tourism.png",
    services: [
      "Booking systems",
      "Hotel management software",
      "Travel apps",
      "Customer experience platforms",
    ],
    href: null,
  },
  {
    title: "Retail & E-commerce",
    description:
      "Omnichannel commerce and retail systems that convert and scale.",
    image: "/images/industries/retail.png",
    services: [
      "E-commerce platforms",
      "Inventory management",
      "Customer analytics",
      "Mobile shopping apps",
    ],
    href: "/industries/retail",
  },
  {
    title: "Legal Services",
    description:
      "Case management, portals, and secure document workflows for modern firms.",
    image: "/images/industries/legal.png",
    services: [
      "Case management systems",
      "Document automation",
      "Client portals",
      "Legal analytics",
    ],
    href: null,
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

function IndustryGridCard({
  industry,
  index,
}: {
  industry: IndustryCard;
  index: number;
}) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
        <Image
          src={industry.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sa-surface via-transparent to-transparent" />
      </div>
      <div className="border-t border-sa-border p-6 md:p-7">
        <h2 className="font-heading text-xl font-bold tracking-tight text-white md:text-2xl">
          {industry.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
          {industry.description}
        </p>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-sa-muted/50">
          Typical scope
        </p>
        <ul className="mt-2 space-y-2">
          {industry.services.map((s) => (
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
          {industry.href ? "Explore vertical" : "Discuss this vertical"}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </>
  );

  const className = "sa-card group flex h-full flex-col overflow-hidden text-left";

  if (industry.href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={staggerDelay(index, 0.07)}
      >
        <Link href={industry.href} className={className}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={staggerDelay(index, 0.07)}
    >
      <Link
        href={`/contact?topic=${encodeURIComponent(industry.title)}`}
        className={className}
      >
        {inner}
      </Link>
    </motion.div>
  );
}

export default function IndustriesPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="sa-shell relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
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
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Industries
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="sa-title mx-auto max-w-4xl text-balance"
            >
              Sectors we
              <span className="text-sa-primary"> ship for</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-subtitle mx-auto mt-6"
            >
              Deep vertical context: regulation, customer journeys, and
              operational reality, folded into every architecture and release
              plan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="sa-section relative z-10">
        <div className="sa-container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {industries.map((industry, index) => (
              <IndustryGridCard
                key={industry.title}
                industry={industry}
                index={index}
              />
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
              Not listed here?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-sa-muted/80 md:text-base">
              We regularly onboard new verticals when the problem space is
              clear: logistics, energy, media, and more.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="sa-btn-primary"
              >
                Talk to our team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
