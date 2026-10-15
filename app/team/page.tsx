import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTeamMembers } from "@/lib/data/team-loader";
import { withCanonical } from "@/lib/seo/canonical";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export const revalidate = 60;

export const metadata: Metadata = withCanonical(
  {
    title: "The OceanCyber team",
    description:
      `Leadership at OceanCyber, an Accra company of ${googleBusinessProfile.teamSize} people at ${googleBusinessProfile.address.street}.`,
  },
  "/team",
);

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  const founder = teamMembers.find(
    (m) => m.name === googleBusinessProfile.founderName,
  );
  const leads = teamMembers.filter(
    (m) => m.name !== googleBusinessProfile.founderName,
  );

  return (
    <main className="sa-shell min-h-screen">
      <section className="sa-page-intro border-b border-sa-border pb-12">
        <div className="sa-container max-w-5xl text-center">
          <p className="sa-eyebrow">Team</p>
          <h1 className="sa-title-lg mt-4 text-balance">
            The Accra team behind the work
          </h1>
          <p className="sa-subtitle mx-auto max-w-3xl">
            OceanCyber is {googleBusinessProfile.teamSize} people at{" "}
            {googleBusinessProfile.address.street}. You work with founder-led
            delivery — designers, engineers, and security specialists on the same
            Accra team.
          </p>
        </div>
      </section>

      <section className="sa-section">
        <div className="sa-container max-w-6xl">
          {founder ? (
            <article className="sa-card mx-auto mb-10 max-w-3xl overflow-hidden md:flex">
              <div className="relative h-52 w-full shrink-0 md:h-auto md:w-[40%] md:min-h-[240px]">
                {founder.imageUrl ? (
                  <Image
                    src={founder.imageUrl}
                    alt={founder.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div
                    className={`relative flex h-full min-h-[13rem] w-full items-center justify-center bg-gradient-to-br ${founder.accent} md:min-h-[240px]`}
                    aria-hidden="true"
                  >
                    <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-sa-border bg-black/40 font-heading text-2xl font-bold tracking-[0.08em] text-white">
                      {founder.initials}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                <p className="text-sm font-semibold text-sa-primary">{founder.role}</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-white">
                  {founder.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-sa-muted">{founder.bio}</p>
              </div>
            </article>
          ) : null}

          {leads.length > 0 ? (
            <>
              <h2 className="mb-2 text-center font-heading text-xl font-semibold text-white md:text-2xl">
                Practice leads
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-sa-muted/80">
                Named practice leads for engineering, security, and design. The
                wider delivery team joins every engagement from Accra.
              </p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {leads.map((member) => (
                  <article key={member.name} className="sa-card overflow-hidden">
                    <div className="relative h-44 w-full">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div
                          className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${member.accent}`}
                          aria-hidden="true"
                        >
                          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-sa-border bg-black/40 font-heading text-xl font-bold tracking-[0.08em] text-white">
                            {member.initials}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-semibold text-sa-primary">
                        {member.role}
                      </p>
                      <h3 className="mt-2 font-heading text-lg font-semibold text-white">
                        {member.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-sa-muted">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-12 text-center">
            <Link href="/contact" className="sa-btn-primary w-full sm:w-auto">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
