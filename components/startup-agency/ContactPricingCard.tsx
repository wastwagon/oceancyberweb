import Link from "next/link";
import { PricingPathsLinks } from "@/components/startup-agency/PricingPathsLinks";

export function ContactPricingCard() {
  return (
    <div className="sa-card border-sa-primary/20 bg-sa-primary/5 p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-sa-primary">
        Investment
      </p>
      <p className="mt-2 font-heading text-lg font-bold text-white">
        Packages from GHS 6,000
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sa-muted/80">
        Compare Startup, Professional, and Enterprise tiers before you write — or estimate
        custom scope in Ghana cedis.
      </p>
      <div className="mt-4">
        <PricingPathsLinks variant="stack" />
      </div>
      <Link
        href="/pricing#startup"
        className="mt-4 inline-block text-xs font-semibold text-sa-primary hover:underline"
      >
        See Startup package inclusions →
      </Link>
    </div>
  );
}
