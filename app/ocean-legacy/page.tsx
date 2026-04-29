import { Hero } from "@/components/sections/Hero";
import { MarketingLeadStrip } from "@/components/sections/MarketingLeadStrip";
import { ProjectCostPromo } from "@/components/sections/ProjectCostPromo";
import { ServiceIllustrationStrip } from "@/components/sections/ServiceIllustrationStrip";
import { Services } from "@/components/sections/Services";
import { WebsiteToAppHighlight } from "@/components/sections/WebsiteToAppHighlight";
import { HostingHighlight } from "@/components/sections/HostingHighlight";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";
import { getTestimonialCards } from "@/lib/data/testimonials-loader";
import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export const revalidate = 300;

export const metadata: Metadata = withCanonical(
  {
    title: "OceanCyber home (legacy)",
    robots: { index: false, follow: false },
  },
  "/ocean-legacy",
);

/** Previous OceanCyber homepage composition — kept for rollback comparison with the marketing homepage. */
export default async function OceanLegacyHome() {
  const [portfolioCases, testimonialCards] = await Promise.all([
    getPortfolioCaseStudies(),
    getTestimonialCards(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <MarketingLeadStrip />
      <Stats />
      <Services />
      <Portfolio cases={portfolioCases} />
      <ServiceIllustrationStrip />
      <WebsiteToAppHighlight />
      <HostingHighlight />
      <ProjectCostPromo />
      <Testimonials cards={testimonialCards} />
      <Contact />
    </div>
  );
}
