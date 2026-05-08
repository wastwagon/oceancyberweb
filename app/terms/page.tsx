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
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the OceanCyber platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Service Engagement",
      content: "Engagement timelines, specific project scopes, and deliverables are defined in individual service agreements or signed proposals. These documents take precedence over general terms."
    },
    {
      title: "3. Intellectual Property",
      content: "Unless otherwise agreed in writing, all code, designs, and intellectual property developed by OceanCyber remain the property of OceanCyber until final payment is received."
    },
    {
      title: "4. User Conduct",
      content: "Users agree to provide accurate information, maintain the security of their accounts, and engage in professional communication with our team."
    }
  ];

  return (
    <main className="sa-shell min-h-screen bg-sa-bg pt-28 pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-16">
          <span className="sa-eyebrow inline-flex">Legal Framework</span>
          <h1 className="sa-title !text-left mt-5 text-4xl md:text-5xl lg:text-6xl">
            Terms of <span className="text-sa-primary">Service</span>
          </h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            Our standard operating terms designed to ensure clear expectations and professional delivery for all our partners.
          </p>
        </header>

        <div className="grid gap-12 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="sa-card p-8 border-sa-border hover:border-sa-primary/30 transition-colors">
              <h2 className="font-heading text-xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-sa-muted/80 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <footer className="mt-20 rounded-3xl border border-sa-primary/20 bg-sa-primary/5 p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-white">Have questions?</h2>
          <p className="mt-4 text-sa-muted/80">
            For specific inquiries regarding your engagement or these terms, please contact our legal team.
          </p>
          <div className="mt-8">
            <a
              href="mailto:legal@oceancyber.net"
              className="sa-btn-primary"
            >
              Contact Legal Dept
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
