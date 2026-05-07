import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata: Metadata = withCanonical(
  {
    title: "Cookie Policy",
    description: "How OceanCyber uses cookies and related technologies.",
  },
  "/cookies",
);

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-sa-bg pt-28 pb-16 text-sa-muted">
      <div className="sa-container max-w-3xl px-6 md:px-8">
        <h1 className="sa-title">
          Cookie Policy
        </h1>
        <p className="mt-6 text-sm leading-relaxed md:text-base">
          We use essential cookies for session reliability and security. Limited
          analytics cookies may be used to understand performance and improve the
          user experience.
        </p>
        <p className="mt-4 text-sm leading-relaxed md:text-base">
          You can manage cookie preferences in your browser settings at any
          time. If you disable essential cookies, parts of the site may not work
          as expected.
        </p>
      </div>
    </main>
  );
}
