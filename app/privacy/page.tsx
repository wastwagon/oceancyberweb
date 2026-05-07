import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Privacy Policy",
    description: "How OceanCyber collects, uses, and protects your information.",
  },
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-sa-bg pt-28 pb-16 text-sa-muted">
      <div className="sa-container max-w-3xl px-6 md:px-8">
        <h1 className="sa-title">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm leading-relaxed md:text-base">
          We collect only the information needed to provide services, respond to
          enquiries, and improve platform performance. We do not sell personal
          data. Operational and security logs may be retained for fraud
          prevention and compliance.
        </p>
        <p className="mt-4 text-sm leading-relaxed md:text-base">
          If you want your data updated or removed, contact
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
