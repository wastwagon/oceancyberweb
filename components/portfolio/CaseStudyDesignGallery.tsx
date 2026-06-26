import Image from "next/image";
import type { DesignArtifact } from "@/lib/data/case-study-design";

export function CaseStudyDesignGallery({
  artifacts,
  projectTitle,
}: {
  artifacts: DesignArtifact[];
  projectTitle: string;
}) {
  if (artifacts.length === 0) return null;

  return (
    <section className="space-y-8" aria-labelledby="design-process-heading">
      <div>
        <p className="sa-eyebrow">Design process</p>
        <h2
          id="design-process-heading"
          className="font-heading text-2xl font-bold text-white md:text-3xl"
        >
          From research to shipped UI
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-sa-muted/80">
          How we shaped {projectTitle} — discovery, interface design, and the final
          product experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {artifacts.map((artifact) => (
          <article
            key={`${artifact.phase}-${artifact.title}`}
            className="sa-card group overflow-hidden p-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-sa-border">
              <Image
                src={artifact.image}
                alt={artifact.imageAlt}
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute left-4 top-4 rounded-full border border-sa-primary/40 bg-black/70 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-widest text-sa-primary">
                Phase {artifact.phase}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">
                {artifact.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sa-muted/80">
                {artifact.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
