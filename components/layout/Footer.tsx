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
} from "lucide-react";

const serviceLinks = [
  { href: "/services/web-development", label: "Web development" },
  { href: "/services/mobile-apps", label: "Mobile apps" },
  { href: "/services/ecommerce", label: "E-commerce" },
  { href: "/services/cybersecurity", label: "Cybersecurity" },
  { href: "/services", label: "All services" },
] as const;

const exploreLinks = [
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
      className="inline-flex text-sm text-slate-400 transition-colors hover:text-blue-200"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#00000a] text-slate-400">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(20, 50, 150, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 50, 150, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 100%, black 0%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#143296cc]/40 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:py-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:py-24">
          {/* Brand */}
          <div className="flex flex-col md:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="mb-6 inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-[#143296cc]/45 hover:bg-white/[0.05]"
            >
              <Image
                src="/images/oceancyber logo.webp"
                alt="OceanCyber"
                width={160}
                height={48}
                className="h-9 w-auto object-contain brightness-0 invert md:h-10"
              />
            </Link>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-slate-400 md:text-[0.9375rem]">
              ICT solutions provider: web, mobile, commerce, and security-aware
              delivery for teams across Ghana and Africa.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                SOC-aligned delivery
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                Zero-trust mindset
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-[#143296cc]/50 hover:bg-[#143296cc]/15 hover:text-blue-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-1 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
              Services
            </p>
            <ul className="space-y-3.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="md:max-lg:col-span-1 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
              Explore
            </p>
            <ul className="space-y-3.5">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="md:col-span-1 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
              Industries
            </p>
            <ul className="space-y-3.5">
              {industryLinks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div className="md:col-span-1 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
              Contact
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-400/90"
                  aria-hidden
                />
                <span className="leading-relaxed text-slate-400">
                  232 Nii Kwashiefo Avenue
                  <br />
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-blue-400/90" aria-hidden />
                <a
                  href="tel:+233242565695"
                  className="text-slate-300 transition-colors hover:text-blue-200"
                >
                  +233 242 565 695
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-blue-400/90" aria-hidden />
                <a
                  href="mailto:info@oceancyber.net"
                  className="text-slate-300 transition-colors hover:text-blue-200"
                >
                  info@oceancyber.net
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-950/25 p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-red-300/95">
                24/7 security line
              </p>
              <a
                href="tel:+233242565695"
                className="mt-1 inline-block font-mono text-sm font-medium text-red-200/95 transition-colors hover:text-red-100"
              >
                +233 242 565 695
              </a>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#143296cc] bg-gradient-to-t from-[#143296cc] to-[#00000a] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#143296cc]/20 transition-all hover:brightness-110 sm:w-auto"
            >
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/[0.08] py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <p className="text-center text-xs text-slate-500 md:text-left md:text-sm">
            © {year} OceanCyber. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 md:justify-end md:text-sm"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-blue-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-blue-200"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="transition-colors hover:text-blue-200"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
