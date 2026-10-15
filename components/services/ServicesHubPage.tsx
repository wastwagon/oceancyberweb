"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPageHeroMotionVariants } from "@/lib/page-hero-motion";
import {
  fadeUpProps,
  revealViewport,
  staggerDelay,
} from "@/lib/scroll-reveal";
import { SaPageAmbient } from "@/components/startup-agency/SaPageAmbient";
import { PricingQuickSummary } from "@/components/startup-agency/PricingQuickSummary";
import { ServicePageHeroBanner } from "@/components/services/ServicePageHeroBanner";
import { serviceImages } from "@/lib/startup-agency/service-images";
import { geoServiceHubCards } from "@/lib/seo/geo-service-pages";

type ServiceCard = {
  title: string;
  description: string;
  image: string;
  services: string[];
  href: string;
};

/** Capability pages only — geo hire URLs live in the compact link strip below. */
const services: ServiceCard[] = [
  {
    title: "UI/UX & Brand Design",
    description:
      "Research, wireframes, and Figma files your team can build from — packages from GHS 3,500.",
    image: serviceImages.uiUxBrand,
    services: [
      "Brand identity and visual language",
      "UX research and journey mapping",
      "Figma prototypes and design systems",
    ],
    href: "/services/ui-ux-design",
  },
  {
    title: "Web Development",
    description:
      "Company sites and web apps from GHS 6,000 — built for Ghana mobile networks, SEO, and Paystack or MoMo when you sell online.",
    image: serviceImages.webDevelopment,
    services: [
      "Marketing and company sites",
      "Product dashboards and workflows",
      "CMS and payment integrations",
    ],
    href: "/services/web-development",
  },
  {
    title: "Mobile Apps",
    description:
      "iOS and Android from GHS 12,000 per platform — offline-aware flows and store submission help from Accra.",
    image: serviceImages.mobileApps,
    services: [
      "iOS and Android delivery",
      "MoMo and Paystack when needed",
      "Store-ready releases",
    ],
    href: "/services/mobile-apps",
  },
  {
    title: "Website to Mobile App",
    description:
      "Turn an existing website into an App Store and Play Store release — scoped quote with clear milestones.",
    image: serviceImages.mobileApps,
    services: [
      "Website architecture audit",
      "Mobile UX conversion plan",
      "Scoped quote with milestones",
    ],
    href: "/services/website-to-mobile-app",
  },
  {
    title: "E-Commerce",
    description:
      "Online stores from GHS 6,000 with catalog, checkout, and Mobile Money — for Accra retailers and Ghana-wide sellers.",
    image: serviceImages.ecommerce,
    services: [
      "Catalog and checkout",
      "Paystack and MoMo",
      "Inventory-ready ops",
    ],
    href: "/services/ecommerce",
  },
  {
    title: "Cybersecurity",
    description:
      "Assessments and hardening from GHS 4,500 — practical controls the same Accra team that builds your product can run.",
    image: serviceImages.cyberSecurity,
    services: [
      "Security assessments",
      "Hardening and monitoring",
      "Incident readiness",
    ],
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud Hosting",
    description:
      "cPanel hosting with SSL and backups — billed in GHS with Paystack, supported from Accra.",
    image: serviceImages.cloudHosting,
    services: [
      "Managed cPanel accounts",
      "SSL and backup routines",
      "Paystack billing in GHS",
    ],
    href: "/hosting",
  },
];

const hireLinks = geoServiceHubCards();

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
        className="sa-card sa-pressable group flex h-full flex-col overflow-hidden text-left active:scale-[0.99]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-105 saturate-110 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
          <p className="mt-6 text-sm font-medium text-sa-muted">
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

export function ServicesHubPage() {
  const reduceMotion = useReducedMotion();
  const heroMotion = getPageHeroMotionVariants(reduceMotion);

  return (
    <main className="relative min-h-screen overflow-hidden bg-sa-bg text-sa-muted">
      <SaPageAmbient />
      <section className="sa-page-hero">
        <ServicePageHeroBanner image={serviceImages.webDevelopment} />
        <div className="sa-page-hero-body">
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
              className="sa-title-lg mx-auto max-w-4xl text-balance"
            >
              Web, apps, shops, and security
              <span className="text-sa-primary"> from one Accra office</span>
            </motion.h1>
            <motion.p
              variants={heroMotion.item}
              className="sa-lead mx-auto mt-3"
            >
              Fixed GHS packages, clear milestones, and a team you can meet at
              47 Nii Kwashiefio Avenue — not a middleman agency.
            </motion.p>
            <motion.div variants={heroMotion.item} className="mt-10">
              <Link href="/get-started" className="sa-btn-primary">
                Get started
              </Link>
            </motion.div>
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

      <section className="relative z-10 border-t border-sa-border py-12 md:py-16">
        <div className="sa-container max-w-4xl">
          <h2 className="font-heading text-xl font-semibold text-white md:text-2xl">
            Hire by city
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
            Looking for Accra- or Ghana-specific hire pages? These keep local SEO
            clear without repeating every service card above.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {hireLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="sa-text-link inline-flex min-h-11 items-center text-sm font-medium"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PricingQuickSummary />

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
              Tell us your goals, budget range, and timeline — we will reply with
              the right package or a scoped next step.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link href="/get-started" className="sa-btn-primary w-full sm:w-auto">
                Get started
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center text-sm font-medium text-white/80 underline underline-offset-4 hover:text-sa-primary"
              >
                Talk to our team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
