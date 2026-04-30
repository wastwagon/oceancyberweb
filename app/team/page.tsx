import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { withCanonical } from "@/lib/seo/canonical";

const team = [
  {
    name: "Marcus Owusu",
    role: "Founder & CEO",
    image: "/images/EGP Ghana.webp",
    bio: "Leads strategy, product direction, and delivery standards across multidisciplinary teams.",
  },
  {
    name: "Sarah Mensah",
    role: "CTO & Lead Architect",
    image: "/images/Fitch Advisory.webp",
    bio: "Designs resilient platform architecture with strong quality gates and release discipline.",
  },
  {
    name: "Kwame Nkrumah",
    role: "Head of Security",
    image: "/images/Juelle Hair.webp",
    bio: "Owns security posture, assessments, hardening, and incident-readiness execution.",
  },
  {
    name: "Ama Serwaa",
    role: "Creative Director",
    image: "/images/Tour World Tourism.webp",
    bio: "Shapes visual systems, content storytelling, and conversion-aware interface design.",
  },
] as const;

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
    <main className="sa-shell min-h-screen pt-28 md:pt-32">
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
            {team.map((member) => (
              <article key={member.name} className="sa-card overflow-hidden">
                <div className="relative h-52 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
    </main>
  );
}
