"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Facebook, ArrowRight, ShieldAlert } from "lucide-react";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Works", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

const serviceLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "E-commerce", href: "/services/ecommerce" },
  { label: "Cloud Hosting", href: "/hosting" },
] as const;

const industryLinks = [
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Education", href: "/industries/education" },
  { label: "Retail & Commerce", href: "/industries/retail" },
  { label: "All Sectors", href: "/industries" },
] as const;

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/oceancyber" },
  { icon: Twitter, href: "https://twitter.com/oceancyber" },
  { icon: Facebook, href: "https://facebook.com/oceancyber" },
  { icon: Instagram, href: "https://instagram.com/oceancyber" },
] as const;

export function StartupAgencyFooter() {
  return (
    <footer className="bg-sa-bg py-12 lg:py-24">
      <div className="sa-container">
        {/* Main Floating Container */}
        <div className="relative overflow-hidden rounded-[40px] border border-sa-border bg-sa-surface p-10 lg:p-20">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
            
            {/* Left: Branding & Connect */}
            <div className="lg:col-span-5">
              <Link href="/" className="group inline-block">
                <Image
                  src="/images/oceancyber-logo.webp"
                  alt="OceanCyber"
                  width={200}
                  height={60}
                  className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-sa-muted/80">
                Ready to elevate your digital presence? We ship with clear milestones, disciplined delivery, and Ghana‑based support for ambitious African brands.
              </p>

              <div className="mt-12">
                <p className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">
                  Emergency Support
                </p>
                <div className="flex items-center gap-4 rounded-2xl border border-sa-primary/20 bg-sa-primary/5 p-4 max-w-sm group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sa-primary text-black">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                      24/7 Security Line
                    </p>
                    <a href="tel:+233242565695" className="font-heading text-sm font-bold text-white transition-colors group-hover:text-sa-primary">
                      +233 242 565 695
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Navigation */}
            <div className="lg:col-span-2">
              <span className="mb-8 block font-heading text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">
                Company
              </span>
              <ul className="space-y-4">
                {footerLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Services & Industries */}
            <div className="lg:col-span-3">
              <span className="mb-8 block font-heading text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">
                Services
              </span>
              <ul className="space-y-4">
                {serviceLinks.slice(0, 4).map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <span className="mb-8 block font-heading text-xs font-bold uppercase tracking-[0.2em] text-sa-primary">
                Industries
              </span>
              <ul className="space-y-4">
                {industryLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 flex flex-col gap-10 border-t border-sa-border pt-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm text-sa-muted">
                © {new Date().getFullYear()} OceanCyber Platform. Delivering excellence in Africa.
              </p>
              <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-sa-muted/60">
                <Link href="/privacy" className="hover:text-white">Privacy</Link>
                <Link href="/terms" className="hover:text-white">Terms</Link>
                <Link href="/cookies" className="hover:text-white">Cookies</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-14 w-14 items-center justify-center rounded-full border border-sa-border bg-transparent text-white transition-all duration-500 hover:border-sa-primary hover:bg-sa-primary hover:text-black"
                >
                  <social.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          {/* Background Glow Overlay */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sa-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sa-primary/5 blur-[100px]" />
        </div>
      </div>
    </footer>
  );
}
