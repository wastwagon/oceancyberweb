import Image from "next/image";
import Link from "next/link";
import { SaReveal } from "@/components/startup-agency/SaReveal";
import { teamHeadshotFilenameGuide, teamMembers } from "@/lib/data/team";

/** Aeolla team = LIGHT cream band. Uses OC team content/images when present. */
export function CaTeamSection() {
  const members = teamMembers.slice(0, 4);

  return (
    <section id="team" className="ae-band-light relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[1770px] px-4 sm:px-8 lg:px-[75px]">
        <SaReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="ae-eyebrow">Team members</p>
            <h2 className="ae-title-light mt-4 text-[clamp(2rem,4vw,3.25rem)]">
              The people behind the work
            </h2>
          </div>
          <Link
            href="/team"
            className="sa-pressable inline-flex min-h-11 items-center rounded-full border border-[var(--ae-ink)]/20 px-6 text-xs font-bold uppercase tracking-wider text-[var(--ae-ink)]"
          >
            View all
          </Link>
        </SaReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {members.map((member, i) => {
            const image = teamHeadshotFilenameGuide[member.name];
            return (
              <SaReveal key={member.name} delay={i * 0.08}>
                <article className="group overflow-hidden rounded-[10px] border border-[var(--ae-line-light)] bg-white/55">
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${member.accent}`}>
                    {image ? (
                      <Image
                        src={image}
                        alt={member.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width:1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center font-heading text-5xl font-extrabold text-[var(--ae-ink)]/25">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[var(--ae-ink)]">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ae-primary)]">
                      {member.role}
                    </p>
                    <p className="ae-body-light mt-3 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              </SaReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
