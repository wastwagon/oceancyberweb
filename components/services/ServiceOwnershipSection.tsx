import Link from "next/link";
import { serviceOwnershipBlock } from "@/lib/services/ownership-terms";

export function ServiceOwnershipSection() {
  return (
    <section className="sa-section relative z-10 border-b border-sa-border bg-sa-surface/30">
      <div className="sa-container max-w-4xl">
        <p className="sa-eyebrow">{serviceOwnershipBlock.eyebrow}</p>
        <h2 className="sa-title-md mt-3 text-white">{serviceOwnershipBlock.title}</h2>
        <p className="mt-3 text-sm text-sa-muted">{serviceOwnershipBlock.subtitle}</p>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-sm text-sa-muted/90">
          {serviceOwnershipBlock.bullets.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href={serviceOwnershipBlock.termsHref} className="sa-text-link font-medium">
            Read full terms →
          </Link>
        </p>
      </div>
    </section>
  );
}
