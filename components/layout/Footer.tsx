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
      className="inline-flex text-sm text-slate-600 transition-colors hover:text-ocean-700"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-600">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 100%, black 0%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ocean-300/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 gap-14 py-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:py-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:py-24">
          {/* Brand */}
          <div className="flex flex-col md:col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="mb-6 inline-flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors hover:border-ocean-200"
            >
              <Image
                src="/images/oceancyber logo.webp"
                alt="OceanCyber"
                width={160}
                height={48}
                className="h-9 w-auto object-contain md:h-10"
              />
            </Link>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-slate-600 md:text-[0.9375rem]">
              ICT solutions provider: web, mobile, commerce, and security-aware
              delivery for teams across Ghana and Africa.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                SOC-aligned delivery
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-ocean-300 hover:bg-ocean-50 hover:text-ocean-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-1 lg:col-span-2">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
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
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
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
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
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
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ocean-600">
              Contact
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-ocean-600"
                  aria-hidden
                />
                <span className="leading-relaxed text-slate-600">
                  232 Nii Kwashiefio Avenue
                  <br />
                  Accra, Ghana
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-ocean-600" aria-hidden />
                <a
                  href="tel:+233242565695"
                  className="text-slate-700 transition-colors hover:text-ocean-700"
                >
                  +233 242 565 695
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-ocean-600" aria-hidden />
                <a
                  href="mailto:info@oceancyber.net"
                  className="text-slate-700 transition-colors hover:text-ocean-700"
                >
                  info@oceancyber.net
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-red-700">
                24/7 security line
              </p>
              <a
                href="tel:+233242565695"
                className="mt-1 inline-block font-mono text-sm font-medium text-red-800 transition-colors hover:text-red-900"
              >
                +233 242 565 695
              </a>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border-2 border-ocean-600 bg-gradient-to-b from-ocean-600 to-ocean-800 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-ocean-600/25 transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-slate-200 py-8 md:flex-row md:items-center md:justify-between md:py-10">
          <p className="text-center text-xs text-slate-500 md:text-left md:text-sm">
            © {year} OceanCyber. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 md:justify-end md:text-sm"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-ocean-700"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-ocean-700"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="transition-colors hover:text-ocean-700"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
