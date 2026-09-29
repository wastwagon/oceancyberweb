"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";
import {
  footerCompanyLinks,
  footerServiceLinks,
} from "@/lib/navigation/menu";
import {
  industryFooterLinks,
  industryFooterViewAllLink,
} from "@/lib/data/industries-catalog";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/oceancyber", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/oceancyber", label: "X" },
  { icon: Facebook, href: "https://facebook.com/oceancyber", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/oceancyber", label: "Instagram" },
] as const;

export function StartupAgencyFooter() {
  return (
    <footer
      className="bg-sa-bg py-12 pb-[var(--sa-mobile-footer-pad)] md:pb-12 lg:py-24"
      data-app-print-hide-chrome
    >
      <div className="sa-container">
        <div className="relative overflow-hidden rounded-3xl border border-sa-border bg-sa-surface p-6 sm:p-10 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
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
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                We design and build websites, apps, and secure systems for teams in Ghana and across Africa.
              </p>

              <ul className="sa-ios-group mt-8 divide-y divide-white/10">
                <li>
                  <a href="tel:+233242565695" className="sa-ios-row sa-pressable">
                    <span>
                      <span className="block text-xs text-white/55">Call</span>
                      <span className="block text-[15px] text-white">+233 242 565 695</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@oceancyber.net" className="sa-ios-row sa-pressable">
                    <span>
                      <span className="block text-xs text-white/55">Email</span>
                      <span className="block text-[15px] text-white">info@oceancyber.net</span>
                    </span>
                  </a>
                </li>
                <li>
                  <span className="sa-ios-row">
                    <span>
                      <span className="block text-xs text-white/55">Office</span>
                      <span className="block text-[15px] text-white">232 Nii Kwashiefio Avenue, Accra</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <span className="mb-4 block text-sm font-semibold text-sa-primary">
                Company
              </span>
              <ul className="space-y-4">
                {footerCompanyLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="sa-ios-link text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary active:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <span className="mb-4 block text-sm font-semibold text-sa-primary">
                Services
              </span>
              <ul className="space-y-4">
                {footerServiceLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="sa-ios-link text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary active:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <span className="mb-4 block text-sm font-semibold text-sa-primary">
                Industries
              </span>
              <ul className="space-y-4">
                {industryFooterLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="sa-ios-link text-base font-medium text-white transition-colors duration-300 hover:text-sa-primary active:text-sa-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={industryFooterViewAllLink.href}
                    className="sa-ios-link inline-flex items-center gap-1.5 text-base font-medium text-sa-primary transition-colors duration-300 hover:text-white active:text-white"
                  >
                    {industryFooterViewAllLink.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-sa-border pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} OceanCyber. Accra, Ghana.
              </p>
              <div className="flex flex-wrap gap-x-1 text-sm">
                <Link href="/privacy" className="inline-flex min-h-11 items-center pr-4 text-white/70 hover:text-white">
                  Privacy
                </Link>
                <Link href="/terms" className="inline-flex min-h-11 items-center pr-4 text-white/70 hover:text-white">
                  Terms
                </Link>
                <Link href="/cookies" className="inline-flex min-h-11 items-center pr-4 text-white/70 hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="sa-pressable flex h-11 w-11 items-center justify-center rounded-full border border-sa-border text-white transition hover:border-sa-primary hover:text-sa-primary"
                >
                  <social.icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sa-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sa-primary/5 blur-[100px]" />
        </div>
      </div>
    </footer>
  );
}
