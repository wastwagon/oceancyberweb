import { Portfolio } from "@/components/sections/Portfolio";
import { getPortfolioCaseStudies } from "@/lib/data/portfolio-loader";

export default async function PortfolioPage() {
  const cases = await getPortfolioCaseStudies();
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/80 to-slate-50">
        <div className="container mx-auto max-w-5xl px-4 pb-12 pt-28 text-center md:px-6 md:pb-16 md:pt-34">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean-600">
            Portfolio
          </p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Proven delivery across products, platforms, and industries
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Browse featured projects and detailed case studies. Each engagement highlights
            scope, technical approach, and measurable outcomes.
          </p>
        </div>
      </section>
      <Portfolio cases={cases} />
    </main>
  );
}