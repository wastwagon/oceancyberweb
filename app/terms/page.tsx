import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Terms of Service",
    description: "Terms governing the use of OceanCyber services and website.",
  },
  "/terms",
);

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-sa-bg pt-28 pb-16 text-sa-muted">
      <div className="sa-container max-w-3xl px-6 md:px-8">
        <h1 className="sa-title">
          Terms of Service
        </h1>
        <p className="mt-6 text-sm leading-relaxed md:text-base">
          By using this website and our services, you agree to lawful use,
          accurate project information, and respectful communication. Delivery
          timelines, scope, and support terms are defined in signed proposals or
          contracts.
        </p>
        <p className="mt-4 text-sm leading-relaxed md:text-base">
          For formal terms related to a project, refer to your service
          agreement, or contact
          <a
            href="mailto:info@oceancyber.net"
            className="ml-1 font-semibold text-sa-primary hover:text-white transition-colors"
          >
            info@oceancyber.net
          </a>
          .
        </p>
      </div>
    </main>
  );
}
