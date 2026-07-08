"use client";

import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import type { ClientLogoEntry } from "@/lib/startup-agency/client-logos-runtime";

function ClientLogoLink({
  client,
  className,
  children,
}: {
  client: ClientLogoEntry;
  className?: string;
  children: React.ReactNode;
}) {
  if (client.href.startsWith("http")) {
    return (
      <a
        href={client.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={client.href} className={className}>
      {children}
    </Link>
  );
}

function ClientLogoMark({ client }: { client: ClientLogoEntry }) {
  return (
    <div className="relative flex h-10 w-32 items-center justify-center md:h-12 md:w-36">
      <Image
        src={client.logoUrl}
        alt={client.name}
        width={144}
        height={48}
        className="h-auto max-h-8 w-auto max-w-full object-contain opacity-70 brightness-0 invert transition duration-500 md:opacity-50 md:group-hover:opacity-90"
      />
    </div>
  );
}

type SaClientLogosSectionProps = {
  entries: ClientLogoEntry[];
};

export function SaClientLogosSection({ entries }: SaClientLogosSectionProps) {
  return (
    <section
      aria-label="Clients and partners"
      className="border-b border-sa-border bg-sa-bg py-10 md:py-14"
    >
      <div className="sa-container">
        <SaReveal className="mb-8 text-center">
          <p className="sa-eyebrow">Trusted by teams across Ghana and beyond</p>
          <p className="mt-2 text-sm text-sa-muted/70">
            Select a client to read the case study
          </p>
        </SaReveal>

        <div className="hidden flex-wrap items-center justify-center gap-10 md:flex md:gap-14">
          {entries.map((client) => (
            <SaReveal key={client.name} delay={client.order * 0.05}>
              <ClientLogoLink client={client} className="group flex flex-col items-center gap-3">
                <ClientLogoMark client={client} />
              </ClientLogoLink>
            </SaReveal>
          ))}
        </div>

        <div className="relative md:hidden">
          <div
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {entries.map((client) => (
              <ClientLogoLink
                key={client.name}
                client={client}
                className="sa-pressable group flex shrink-0 snap-center items-center"
              >
                <ClientLogoMark client={client} />
              </ClientLogoLink>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-sa-muted/50">Swipe to browse clients</p>
        </div>
      </div>
    </section>
  );
}
