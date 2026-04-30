import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartupAgencyMobileQuickBar } from "@/components/startup-agency/StartupAgencyMobileQuickBar";
import { teamMembers } from "@/lib/data/team";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Team",
    description:
      "Meet the OceanCyber leadership team behind web, mobile, and cybersecurity delivery.",
  },
  "/team",
);

export default function TeamPage() {
  return (
    <main className="sa-shell min-h-screen pb-24 pt-28 md:pb-0 md:pt-32">
      <section className="border-b border-sa-border pb-12">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow">Team</p>
          <h1 className="sa-title mt-4 text-balance">
            Leadership and specialists focused on outcomes
          </h1>
          <p className="sa-subtitle mx-auto max-w-3xl">
            Strategy, engineering, design, and security in one delivery rhythm, with clear ownership
            at every stage.
          </p>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {teamMembers.map((member) => (
              <article key={member.name} className="sa-card overflow-hidden">
                <div className="relative h-52 w-full">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div
                      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${member.accent}`}
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)]" />
                      <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-sa-border bg-black/40 font-heading text-2xl font-bold tracking-[0.08em] text-white shadow-lg shadow-black/30">
                        {member.initials}
                      </div>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sa-primary">
                    {member.role}
                  </p>
                  <h2 className="mt-2 font-heading text-xl font-semibold text-white">{member.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-sa-muted">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="sa-btn-primary"
            >
              Work with our team
            </Link>
          </div>
        </div>
      </section>
      <StartupAgencyMobileQuickBar />
    </main>
  );
}
