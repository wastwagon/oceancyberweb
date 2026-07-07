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
  const policies = [
    {
      title: "Data Collection",
      content: "We only collect data that is essential for delivering our services, such as your contact information and project requirements. We never collect data without a clear purpose."
    },
    {
      title: "Data Usage",
      content: "Your data is used solely to manage your projects, provide technical support, and improve your experience on our platform. We do not sell or share your data with third parties for marketing."
    },
    {
      title: "Security Measures",
      content: "We implement industry-standard security protocols to protect your information from unauthorized access, loss, or alteration. Your trust is our priority."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or request the deletion of your personal data at any time. We respond to all such requests promptly and transparently."
    }
  ];

  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-16">
          <span className="sa-eyebrow inline-flex">Data Sovereignty</span>
          <h1 className="sa-title !text-left mt-5 text-4xl md:text-5xl lg:text-6xl">
            Privacy <span className="text-sa-primary">Policy</span>
          </h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            Transparency is a core engineering value. We are committed to protecting your intellectual and personal data with zero compromise.
          </p>
        </header>

        <div className="space-y-6">
          {policies.map((policy) => (
            <div key={policy.title} className="sa-card p-8 border-sa-border">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3">
                  <h2 className="font-heading text-lg font-bold text-white uppercase tracking-widest">{policy.title}</h2>
                </div>
                <div className="md:w-2/3">
                  <p className="text-sa-muted/80 text-sm leading-relaxed">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 rounded-3xl border border-sa-border bg-sa-surface p-10 text-center">
          <p className="text-sa-muted/60 text-xs uppercase tracking-widest font-bold">Inquiries</p>
          <p className="mt-4 text-white">
            Questions about your data? Reach out to our privacy officer at{" "}
            <a href="mailto:privacy@oceancyber.net" className="text-sa-primary font-bold hover:underline underline-offset-4">
              privacy@oceancyber.net
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
