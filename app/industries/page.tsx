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
      "Secure banking solutions and fintech innovations tailored for Ghana's growing financial sector.",
    image: "/images/EGP Ghana.webp",
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
    image: "/images/Fitch Advisory.webp",
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
    image: "/images/Juelle Hair.webp",
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
    image: "/images/Tour World Tourism.webp",
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
    image: "/images/Africa Trade Chamber.webp",
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
    image: "/images/Fitch Attorney.webp",
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
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(20, 50, 150, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20, 50, 150, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 70% at 50% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-0 h-[min(420px,50vh)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(20,50,150,0.26)_0%,transparent_72%)] blur-[88px]" />
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
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <Image
          src={industry.image}
          alt=""
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#00000a]/85 via-transparent to-transparent" />
      </div>
      <div className="p-6 md:p-7">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
          {industry.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {industry.description}
        </p>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Typical scope
        </p>
        <ul className="mt-2 space-y-2">
          {industry.services.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/90" />
              {s}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors group-hover:text-blue-200">
          {industry.href ? "Explore vertical" : "Discuss this vertical"}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </>
  );

  const className =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition-all hover:-translate-y-0.5 hover:border-[#143296cc]/40 hover:shadow-xl hover:shadow-[#143296cc]/10";

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
    <main className="relative min-h-screen overflow-hidden bg-[#00000a] text-white">
      <PageAmbient />

      <section className="relative z-10 overflow-hidden border-b border-white/[0.06] pb-16 pt-28 md:pb-20 md:pt-36">
        <HeroSectionMotionLayers />
        <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.span
              variants={heroMotion.item}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#143296cc] bg-[#143296cc]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
            >
              <Building2 className="h-3.5 w-3.5 text-blue-400" aria-hidden />
              Industries
            </motion.span>
            <motion.h1
              variants={heroMotion.item}
              className="mx-auto max-w-4xl text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Sectors we
              <span className="bg-gradient-to-r from-blue-400 via-[#143296cc] to-blue-400 bg-clip-text text-transparent">
                {" "}
                ship for
              </span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="mx-auto mt-6 max-w-2xl text-pretty text-center text-base font-light leading-relaxed text-slate-400 md:text-lg"
            >
              Deep vertical context: regulation, customer journeys, and
              operational reality, folded into every architecture and release
              plan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
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

      <section className="relative z-10 border-t border-white/[0.06] py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <motion.div
            {...fadeUpProps}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-10 text-center shadow-2xl shadow-black/50 backdrop-blur-xl md:p-14 [&_h2]:text-center [&_p]:text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Not listed here?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
              We regularly onboard new verticals when the problem space is
              clear: logistics, energy, media, and more.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/25 transition-all hover:brightness-110"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#00000a] via-transparent to-transparent"
        aria-hidden
      />
    </main>
  );
}
