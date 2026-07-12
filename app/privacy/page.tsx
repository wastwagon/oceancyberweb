import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";

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
      title: "Information we collect",
      content:
        "We collect information you submit through contact, intake, proposal, checkout, account, and support forms. This may include your name, business details, contact information, project requirements, billing records, and messages. We also receive limited technical data such as device, browser, page, and security logs when you use our website or platform.",
    },
    {
      title: "How we use information",
      content:
        "We use personal data to respond to enquiries, prepare proposals, deliver and support services, process payments and renewals, secure our systems, meet legal obligations, and improve our website. We do not sell personal data. Where required, we rely on consent, contract performance, legal obligations, or our legitimate business interests.",
    },
    {
      title: "Service providers",
      content:
        "We disclose only the information needed to providers that help us operate, such as payment processors, analytics providers, scheduling tools, email services, and hosting or domain partners. These providers process information under their own terms and privacy notices. We may also disclose information where required by law or to protect users, OceanCyber, or the public.",
    },
    {
      title: "Retention and security",
      content:
        "We retain information only for as long as needed for the purpose collected, contractual record-keeping, dispute resolution, security, and applicable legal requirements. We use access controls, encryption where appropriate, monitoring, and operational safeguards, but no internet service can guarantee absolute security.",
    },
    {
      title: "Your choices and rights",
      content:
        "Subject to applicable law, including Ghana's Data Protection Act, 2012 (Act 843), you may ask to access, correct, restrict, object to, or delete personal data we hold about you. You may also withdraw consent for future processing where consent is the basis. Some records may need to be retained for legal or contractual reasons.",
    },
    {
      title: "Cookies and international processing",
      content:
        "Essential storage supports security and platform functions. Optional analytics runs only after consent; see our Cookie Policy for details. Some service providers may process data outside Ghana. Where this occurs, we take reasonable steps to use providers with appropriate privacy and security protections.",
    },
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
            This policy explains what personal information we collect, why we
            use it, who may process it, and the choices available to you.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-sa-muted/60">
            Last updated: 12 July 2026
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

        <LegalPageFooter current="privacy" />
      </div>
    </main>
  );
}
