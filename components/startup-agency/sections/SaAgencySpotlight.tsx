import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SaWhenVisibleImage } from "@/components/startup-agency/SaWhenVisibleImage";
import { SITE_CTA } from "@/lib/marketing/site-cta";
import { agencyPillars } from "@/lib/startup-agency/content";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { serviceImages } from "@/lib/startup-agency/service-images";

const craftShots = [
  {
    src: serviceImages.uiUxBrand,
    alt: "UI and brand design work by OceanCyber in Accra",
    label: "UI / brand",
  },
  {
    src: serviceImages.webDevelopment,
    alt: "Web development and dashboards built by OceanCyber",
    label: "Web platforms",
  },
  {
    src: serviceImages.mobileApps,
    alt: "Mobile app interfaces designed by OceanCyber",
    label: "Mobile apps",
  },
] as const;

export function SaAgencySpotlight() {
  const address = `${googleBusinessProfile.address.street}, ${googleBusinessProfile.address.locality}`;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full bg-sa-primary/15 blur-[80px]"
      />

      <div className="relative overflow-hidden rounded-3xl border border-sa-border bg-gradient-to-br from-sa-surface/80 to-sa-bg/40 p-5 md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-sa-border bg-sa-bg/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sa-muted">
            <MapPin className="h-3.5 w-3.5 text-sa-primary" aria-hidden />
            {address}
          </p>
          <p className="text-xs font-medium text-sa-muted">
            Team of {googleBusinessProfile.teamSize} · Est. {googleBusinessProfile.foundedYear}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {craftShots.map((shot, index) => (
            <div
              key={shot.label}
              className={`relative overflow-hidden rounded-2xl border border-white/5 bg-black/40 ${
                index === 0 ? "col-span-2 aspect-[21/9]" : "aspect-[4/3]"
              }`}
            >
              <SaWhenVisibleImage
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover"
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 480px"
                    : "(max-width: 1024px) 50vw, 240px"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sa-bg/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-wide text-white/90 md:text-xs">
                {shot.label}
              </span>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-4 border-t border-sa-border/60 pt-6">
          {agencyPillars.map((pillar) => (
            <li key={pillar.title}>
              <p className="font-heading text-sm font-semibold text-white md:text-base">
                {pillar.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-sa-muted">{pillar.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/team"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sa-border bg-sa-bg/50 px-5 text-sm font-semibold text-white transition hover:border-sa-primary/50 hover:text-sa-primary"
          >
            Meet the team
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href={SITE_CTA.selectedWork.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-medium text-sa-primary underline underline-offset-4 hover:text-white"
          >
            {SITE_CTA.selectedWork.label}
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -left-6 hidden h-24 w-24 overflow-hidden rounded-2xl border border-sa-border opacity-40 lg:block"
      >
        <Image
          src={serviceImages.cyberSecurity}
          alt=""
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
