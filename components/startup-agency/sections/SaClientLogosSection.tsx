"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import type { ClientLogoEntry } from "@/lib/startup-agency/client-logos-runtime";

function ClientLogoMark({ client }: { client: ClientLogoEntry }) {
  return (
    <div className="relative flex h-10 w-32 items-center justify-center md:h-12 md:w-36">
      <Image
        src={client.logoUrl}
        alt={client.name}
        width={144}
        height={48}
        className="h-auto max-h-8 w-auto max-w-full object-contain opacity-50 transition duration-500 group-hover:opacity-90 brightness-0 invert"
      />
    </div>
  );
}

type SaClientLogosSectionProps = {
  entries: ClientLogoEntry[];
};

export function SaClientLogosSection({ entries }: SaClientLogosSectionProps) {
  const loop = useMemo(() => [...entries, ...entries], [entries]);

  return (
    <section
      aria-label="Clients and partners"
      className="border-b border-sa-border bg-sa-bg py-10 md:py-14"
    >
      <div className="sa-container">
        <SaReveal className="mb-8 text-center">
          <p className="sa-eyebrow">Trusted by teams across Ghana and beyond</p>
        </SaReveal>

        <div className="hidden flex-wrap items-center justify-center gap-10 md:flex md:gap-14">
          {entries.map((client) => (
            <SaReveal key={client.name} delay={client.order * 0.05}>
              <Link href={client.href} className="group flex flex-col items-center gap-3">
                <ClientLogoMark client={client} />
              </Link>
            </SaReveal>
          ))}
        </div>

        <div className="relative overflow-hidden md:hidden">
          <div className="flex w-max animate-sa-marquee gap-12 px-4">
            {loop.map((client, i) => (
              <Link
                key={`${client.name}-${i}`}
                href={client.href}
                className="group flex shrink-0 items-center"
              >
                <ClientLogoMark client={client} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
