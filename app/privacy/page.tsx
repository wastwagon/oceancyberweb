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
    <main className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          We collect only the information needed to provide services, respond to
          enquiries, and improve platform performance. We do not sell personal
          data. Operational and security logs may be retained for fraud
          prevention and compliance.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          If you want your data updated or removed, contact
          <a
            href="mailto:info@oceancyber.net"
            className="ml-1 font-semibold text-ocean-700 hover:text-ocean-900"
          >
            info@oceancyber.net
          </a>
          .
        </p>
      </div>
    </main>
  );
}
