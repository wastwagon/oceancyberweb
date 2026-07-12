import { IndustryFeaturedProof } from "@/components/industries/IndustryFeaturedProof";
import { LeadMagnetGate } from "@/components/marketing/LeadMagnetGate";
import { industryExtras } from "@/lib/data/industry-extras";

type IndustryPageExtrasProps = {
  industrySlug: string;
};

export function IndustryPageExtras({ industrySlug }: IndustryPageExtrasProps) {
  const extras = industryExtras[industrySlug];
  if (!extras) return null;

  return (
    <>
      {extras.proof ? (
        <IndustryFeaturedProof
          title={extras.proof.title}
          subtitle={extras.proof.subtitle}
          items={extras.proof.items}
        />
      ) : null}
      {extras.leadMagnet ? (
        <section className="sa-section relative z-10 border-t border-sa-border bg-sa-bg">
          <div className="sa-container max-w-4xl">
            <LeadMagnetGate
              magnetId={extras.leadMagnet.magnetId}
              page={extras.leadMagnet.page}
              description={extras.leadMagnet.description}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
