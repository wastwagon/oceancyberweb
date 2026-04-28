"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { fadeFromLeft, revealViewport } from "@/lib/scroll-reveal";

interface Service {
  title: string;
  description: string;
  features: string[];
  size: "featured" | "medium" | "small";
  highlight?: string;
  href?: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Modern, performant websites built with cutting-edge technologies and best practices that drive results.",
    features: ["Next.js", "TypeScript", "Performance"],
    size: "featured",
    highlight: "Full-Stack Excellence",
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform applications that deliver exceptional user experiences.",
    features: ["React Native", "Flutter"],
    size: "medium",
    href: "/services/mobile-apps",
  },
  {
    title: "E-Commerce",
    description: "Scalable online stores with seamless checkout and payment integrations.",
    features: ["Shopify", "WooCommerce"],
    size: "medium",
    href: "/services/ecommerce",
  },
  {
    title: "SEO & Marketing",
    description: "Data-driven strategies that increase visibility and drive qualified traffic to your business.",
    features: ["Local SEO", "Content"],
    size: "small",
    href: "/services",
  },
  {
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from digital threats.",
    features: ["Audits", "Protection"],
    size: "small",
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud migration services for modern businesses.",
    features: ["AWS", "Azure"],
    size: "small",
    href: "/services",
  },
  {
    title: "Networking",
    description: "Robust network infrastructure ensuring reliable and secure connectivity.",
    features: ["Design", "Support"],
    size: "small",
    href: "/services",
  },
  {
    title: "Custom Software",
    description: "Tailored solutions that automate processes and drive operational efficiency.",
    features: ["APIs", "Integration"],
    size: "medium",
    href: "/services",
  },
];

function InteractiveGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(2,106,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(2,106,255,0.28) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="absolute inset-0 z-10 opacity-40"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(480px circle at ${x}px ${y}px, rgba(2, 106, 255, 0.09), transparent 75%)`,
          ),
        }}
      />
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const isFeatured = service.size === "featured";
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-sm ring-1 ring-slate-200/50 backdrop-blur-sm transition-all duration-500 hover:border-ocean-300/80 hover:bg-white hover:shadow-md hover:shadow-slate-200/40 ${
        isFeatured ? "md:col-span-2 md:row-span-2 p-5 sm:p-6 md:p-7" : "p-4 sm:p-5 md:p-6"
      }`}
    >
      <div className="absolute -inset-px bg-gradient-to-br from-ocean-500/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col">
        {isFeatured && service.highlight && (
          <div className="mb-2 md:mb-3">
            <span className="rounded-full border border-ocean-200 bg-ocean-50 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-ocean-800 md:text-[10px]">
              {service.highlight}
            </span>
          </div>
        )}

        <h3
          className={`font-bold text-slate-900 transition-colors group-hover:text-ocean-800 ${
            isFeatured ? "mb-2 text-2xl md:text-3xl" : "mb-1.5 text-base md:text-lg"
          }`}
        >
          {service.title}
        </h3>

        <p
          className={`leading-relaxed text-slate-600 ${
            isFeatured ? "mb-4 max-w-lg text-sm md:text-base" : "mb-3 text-xs md:text-sm"
          }`}
        >
          {service.description}
        </p>

        <div className="mb-4 mt-auto flex flex-wrap gap-1.5 md:gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="rounded-md border border-slate-200/90 bg-slate-50/90 px-2 py-0.5 text-[10px] font-medium text-slate-600 transition-colors group-hover:border-ocean-200/80 group-hover:text-ocean-900 md:text-[11px]"
            >
              {feature}
            </span>
          ))}
        </div>

        <Link
          href={service.href ?? "/services"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean-700 transition-colors group-hover:text-ocean-900 md:text-sm"
        >
          {isFeatured ? "Start Your Journey" : "Learn More"}
          <span className="text-base transition-transform duration-200 group-hover:translate-x-0.5 md:text-lg">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50/95 via-white to-slate-100/90 py-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 via-white to-slate-50" />
        <div
          className="absolute left-1/2 top-0 h-[min(65vh,520px)] w-[min(160vw,1200px)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(2,106,255,0.12)_0%,transparent_70%)] blur-[88px]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-slate-100/50" />
      </div>

      <InteractiveGrid />

      <div className="container relative z-10 mx-auto px-6">
        <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <motion.div {...fadeFromLeft}>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-ocean-600">
              Our Services
            </h2>
            <h1 className="mx-auto mb-8 max-w-4xl text-balance text-center text-5xl font-bold tracking-tighter text-slate-900 md:text-7xl">
              What We Build{" "}
              <span className="bg-gradient-to-r from-ocean-600 via-ocean-700 to-cyan-600 bg-clip-text text-transparent">
                for You
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              We specialize in building high-performance digital products. Our approach combines technical precision with strategic design to ensure your business thrives in the modern tech landscape.
            </p>
          </motion.div>
        </header>

        <div className="mx-auto grid max-w-5xl auto-rows-[minmax(200px,auto)] grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-slate-200/80 pt-12 md:flex-row"
        >
          <div className="text-center md:text-left">
            <h4 className="mb-2 text-xl font-bold text-slate-900">Ready to transform your vision?</h4>
            <p className="text-slate-600">Join 50+ companies already scaling with our expertise.</p>
          </div>
          <Link href="/contact" className="w-full sm:w-auto">
            <button
              type="button"
              className="min-h-[48px] w-full min-w-[240px] rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-8 py-4 font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Schedule a Consultation
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
