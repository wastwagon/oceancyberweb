import { Portfolio } from "@/components/sections/Portfolio";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";

export default async function PortfolioPage() {
  const cases = await getPortfolioCaseStudies();
  return (
    <div className="min-h-screen">
      <Portfolio cases={cases} />
    </div>
  );
}