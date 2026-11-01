import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";
import { LegalPublisherNotice } from "@/components/legal/LegalPublisherNotice";
import { readDpcRegistrationNumber } from "@/lib/marketing/data-protection-registration";

export const metadata: Metadata = withCanonical(
  {
    title: "Data protection",
    description:
      "How OceanCyber I.T Solutions Provider handles personal data under Ghana law — registration status and contact.",
  },
  "/data-protection",
);

export default function DataProtectionPage() {
  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-12">
          <span className="sa-eyebrow inline-flex">Legal</span>
          <h1 className="sa-title-lg !text-left mt-5">Data protection</h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            Summary of our data protection posture for oceancyber.net and client
            projects. Full processing details are in our{" "}
            <a href="/privacy" className="sa-text-link">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-sa-muted">Last updated: 1 November 2026</p>
        </header>

        <LegalPublisherNotice />

        <div className="space-y-6">
          {readDpcRegistrationNumber() ? (
            <div className="sa-card border-sa-border p-8">
              <h2 className="font-heading text-lg font-bold text-white">Registration</h2>
              <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">
                Data Protection Commission registration number:{" "}
                <strong className="text-white">{readDpcRegistrationNumber()}</strong>
              </p>
            </div>
          ) : null}
          <div className="sa-card border-sa-border p-8">
            <h2 className="font-heading text-lg font-bold text-white">Controller contact</h2>
            <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">
              For access, correction, or deletion requests under the Data
              Protection Act, 2012 (Act 843), email{" "}
              <a href="mailto:privacy@oceancyber.net" className="sa-text-link">
                privacy@oceancyber.net
              </a>
              . We respond within reasonable timelines required by law.
            </p>
          </div>
          <div className="sa-card border-sa-border p-8">
            <h2 className="font-heading text-lg font-bold text-white">DwumaPOS</h2>
            <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">
              DwumaPOS merchant and buyer data is processed under DwumaPOS terms
              and privacy policies on{" "}
              <a
                href="https://www.dwumapos.com/privacy"
                className="sa-text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                dwumapos.com/privacy
              </a>
              . OceanCyber is the publisher of DwumaPOS software.
            </p>
          </div>
        </div>

        <LegalPageFooter current="privacy" />
      </div>
    </main>
  );
}
