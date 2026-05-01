"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ShieldAlert
} from "lucide-react";

const serviceLinks = [
  { href: "/services/web-development", label: "Web development" },
  { href: "/services/mobile-apps", label: "Mobile apps" },
  { href: "/services/ecommerce", label: "E-commerce" },
  { href: "/services/cybersecurity", label: "Cybersecurity" },
  { href: "/services", label: "All services" },
] as const;

const exploreLinks = [
  { href: "/domains", label: "Domains & SSL" },
  { href: "/hosting", label: "Hosting" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/security-journey", label: "Security journey" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const industryLinks = [
  { href: "/industries/financial-services", label: "Financial services" },
  { href: "/industries/healthcare", label: "Healthcare" },
  { href: "/industries/education", label: "Education" },
  { href: "/industries/retail", label: "Retail" },
  { href: "/industries", label: "All industries" },
] as const;

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex text-sm text-sa-muted/60 transition-all hover:text-sa-primary hover:translate-x-1"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-sa-border bg-black text-sa-muted">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.2]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(187, 243, 64, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(187, 243, 64, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 100%, black 0%, transparent 80%)",
          }}
        />
      </div>

      <div className="sa-container relative z-10 mx-auto">
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:py-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:py-24">
          
          {/* Brand & Mission */}
          <div className="flex flex-col md:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="mb-8 inline-flex w-fit items-center gap-3 transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/oceancyber-logo.webp"
                alt="OceanCyber"
                width={180}
                height={54}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-sa-muted/70 md:text-[0.9375rem]">
              Providing premium digital infrastructure and cybersecurity solutions. We build Africa&apos;s digital backbone with a zero-trust mindset and SOC-aligned delivery.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { Icon: Linkedin, href: "https://linkedin.com/company/oceancyber", label: "LinkedIn" },
                { Icon: Twitter, href: "https://twitter.com/oceancyber", label: "Twitter" },
                { Icon: Facebook, href: "https://facebook.com/oceancyber", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com/oceancyber", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-sa-border bg-sa-surface text-sa-muted/50 transition-all hover:border-sa-primary hover:text-sa-primary hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Groups */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-6 lg:gap-4">
            <div>
              <p className="font-heading mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-sa-primary">
                Services
              </p>
              <ul className="space-y-4">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-heading mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-sa-primary">
                Industries
              </p>
              <ul className="space-y-4">
                {industryLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="font-heading mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-sa-primary">
                Company
              </p>
              <ul className="space-y-4">
                {exploreLinks.slice(2).map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + Emergency */}
          <div className="flex flex-col lg:col-span-2">
            <p className="font-heading mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-sa-primary">
              Contact
            </p>
            <div className="space-y-5 text-sm">
              <div className="flex gap-4">
                <MapPin className="h-4 w-4 shrink-0 text-sa-muted/40" />
                <span className="leading-relaxed text-sa-muted/70">
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-4 w-4 shrink-0 text-sa-muted/40" />
                <a href="mailto:info@oceancyber.net" className="text-sa-muted/70 transition-colors hover:text-sa-primary">
                  info@oceancyber.net
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-sa-primary/20 bg-sa-primary/5 p-5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-3.5 w-3.5 text-sa-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                  24/7 Response
                </p>
              </div>
              <a
                href="tel:+233242565695"
                className="mt-2 block font-heading text-sm font-bold text-white transition-colors hover:text-sa-primary"
              >
                +233 242 565 695
              </a>
            </div>

            <Link
              href="/contact"
              className="sa-btn-primary mt-8 w-full group"
            >
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-6 border-t border-sa-border py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-xs text-sa-muted/40 md:text-left">
            © {year} OceanCyber. Crafted for excellence in Africa.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-sa-muted/30">
            <Link href="/privacy" className="transition-colors hover:text-sa-primary">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-sa-primary">Terms</Link>
            <Link href="/cookies" className="transition-colors hover:text-sa-primary">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
