"use client";

import { motion } from "framer-motion";
import { revealViewport, staggerDelay } from "@/lib/scroll-reveal";

function DomainClipart() {
  return (
    <svg viewBox="0 0 80 80" className="h-10 w-10" fill="none" aria-hidden>
      <circle cx="40" cy="40" r="30" fill="#DBEAFE" />
      <ellipse cx="40" cy="40" rx="22" ry="10" stroke="#0369A1" strokeWidth="2.4" />
      <path d="M18 40h44M40 18c6 6 6 38 0 44M40 18c-6 6-6 38 0 44" stroke="#0EA5E9" strokeWidth="2.4" />
    </svg>
  );
}

function SslClipart() {
  return (
    <svg viewBox="0 0 80 80" className="h-10 w-10" fill="none" aria-hidden>
      <rect x="14" y="20" width="52" height="46" rx="12" fill="#DCFCE7" />
      <rect x="28" y="16" width="24" height="16" rx="8" stroke="#15803D" strokeWidth="2.4" />
      <path d="M30 45l8 8 14-16" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HostingClipart() {
  return (
    <svg viewBox="0 0 80 80" className="h-10 w-10" fill="none" aria-hidden>
      <rect x="14" y="14" width="52" height="52" rx="10" fill="#E0F2FE" />
      <rect x="22" y="24" width="36" height="10" rx="4" stroke="#0284C7" strokeWidth="2.3" />
      <rect x="22" y="38" width="36" height="10" rx="4" stroke="#0284C7" strokeWidth="2.3" />
      <rect x="22" y="52" width="36" height="10" rx="4" stroke="#0284C7" strokeWidth="2.3" />
      <circle cx="50" cy="29" r="1.8" fill="#0EA5E9" />
      <circle cx="50" cy="43" r="1.8" fill="#0EA5E9" />
      <circle cx="50" cy="57" r="1.8" fill="#0EA5E9" />
    </svg>
  );
}

function CommerceClipart() {
  return (
    <svg viewBox="0 0 80 80" className="h-10 w-10" fill="none" aria-hidden>
      <rect x="12" y="16" width="56" height="48" rx="10" fill="#F5F3FF" />
      <rect x="20" y="24" width="40" height="8" rx="3" fill="#DDD6FE" />
      <path d="M24 46h32M24 52h18" stroke="#7C3AED" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="54" cy="52" r="7" fill="#C4B5FD" />
      <path d="M54 48v8M50 52h8" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const items = [
  {
    art: DomainClipart,
    title: "Domains",
    body: "Fast search, registrar setup, and clean DNS handover.",
    tone: "from-orange-50 via-white to-amber-50/70",
  },
  {
    art: SslClipart,
    title: "SSL security",
    body: "Certificates and trust signals configured for launch-ready security.",
    tone: "from-emerald-50 via-white to-cyan-50/70",
  },
  {
    art: HostingClipart,
    title: "Hosting",
    body: "WHM/cPanel infrastructure with local support and global reliability.",
    tone: "from-sky-50 via-white to-ocean-50/70",
  },
  {
    art: CommerceClipart,
    title: "Commerce setup",
    body: "Checkout, payments, and storefront flow built for conversions.",
    tone: "from-violet-50/70 via-white to-fuchsia-50/60",
  },
] as const;

export function ServiceIllustrationStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/80 py-16 md:py-20">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Art = item.art;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={staggerDelay(index, 0.06)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.tone} opacity-80`} />
                <div className="relative z-10">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/85 text-ocean-700 backdrop-blur-sm">
                    <Art />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
