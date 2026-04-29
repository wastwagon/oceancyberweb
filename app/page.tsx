import { Hero } from "@/components/sections/Hero";
import { MarketingLeadStrip } from "@/components/sections/MarketingLeadStrip";
import { ProjectCostPromo } from "@/components/sections/ProjectCostPromo";
import { Services } from "@/components/sections/Services";
import { HostingHighlight } from "@/components/sections/HostingHighlight";
import { Portfolio } from "@/components/sections/Portfolio";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";
import { getTestimonialCards } from "@/lib/data/testimonials-loader";

/** ISR: avoid serving a year-stale HTML shell from CDN/Next after deploys (see next/cache + s-maxage). */
export const revalidate = 300;

export default async function Home() {
  const [portfolioCases, testimonialCards] = await Promise.all([
    getPortfolioCaseStudies(),
    getTestimonialCards(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <MarketingLeadStrip />
      <Stats />
      <ProjectCostPromo />
      <Services />
      <HostingHighlight />
      <Portfolio cases={portfolioCases} />
      <Testimonials cards={testimonialCards} />
      <Contact />
    </div>
  );
}
