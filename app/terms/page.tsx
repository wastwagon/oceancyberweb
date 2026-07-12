import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";

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
      content:
        "By accessing this website, creating an account, purchasing a subscription, or using an OceanCyber service, you agree to these terms. If you act for an organisation, you confirm that you are authorised to bind it. If you do not agree, do not use the relevant service.",
    },
    {
      title: "2. Proposals and project scope",
      content:
        "Project scope, deliverables, assumptions, client responsibilities, timelines, fees, and acceptance criteria are defined in the applicable proposal or service agreement. That signed document takes precedence if it conflicts with these general terms. Changes may affect cost and delivery dates and must be agreed in writing.",
    },
    {
      title: "3. Fees and payment",
      content:
        "Fees, taxes, deposits, milestones, renewal dates, and payment methods are shown at checkout or in your agreement. Unless stated otherwise, invoices are due on the date shown. We may pause work or suspend a service after notice when payment is overdue. Third-party fees and usage charges may change independently.",
    },
    {
      title: "4. Intellectual property",
      content:
        "You retain ownership of materials you provide and confirm that we may use them to deliver the service. Unless the applicable agreement says otherwise, ownership of bespoke final deliverables transfers after full payment, excluding OceanCyber's pre-existing tools, reusable components, know-how, and third-party materials. Those exclusions remain subject to their applicable licences.",
    },
    {
      title: "5. Accounts and acceptable use",
      content:
        "You must provide accurate information, protect account credentials, and promptly report suspected unauthorised access. You may not misuse the service, attempt unauthorised access, interfere with availability, distribute malicious code, violate another person's rights, or use the service unlawfully.",
    },
    {
      title: "6. Third-party services",
      content:
        "Projects and subscriptions may rely on third-party platforms such as payment, hosting, domain, app-store, analytics, or communications providers. Their terms, availability, review processes, and pricing may apply separately. We are not responsible for outages or policy changes outside our reasonable control.",
    },
    {
      title: "7. Warranties and liability",
      content:
        "We provide services with reasonable skill and care and will address reproducible defects within any warranty period stated in your agreement. To the extent permitted by law, services are otherwise provided without implied guarantees. Liability limits, exclusions, and remedies in a signed agreement take precedence over this summary.",
    },
    {
      title: "8. Suspension and termination",
      content:
        "Either party may end an engagement as stated in the applicable agreement. We may suspend access where reasonably necessary for security, unlawful use, material breach, or overdue payment. Amounts already due remain payable, and provisions intended to survive termination continue to apply.",
    },
    {
      title: "9. Privacy and governing law",
      content:
        "Our Privacy and Cookie Policies explain how we handle personal data. Unless a signed agreement states otherwise, these terms are governed by the laws of Ghana, and disputes are subject to the courts of competent jurisdiction in Ghana after reasonable good-faith efforts to resolve them.",
    },
    {
      title: "10. Changes and contact",
      content:
        "We may update these terms to reflect service, legal, or operational changes. The updated date will appear on this page. Material changes affecting an active paid service will be communicated where reasonably practicable. Continued use after an update means the revised terms apply from their effective date.",
    },
  ];

  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-16">
          <span className="sa-eyebrow inline-flex">Legal Framework</span>
          <h1 className="sa-title !text-left mt-5 text-4xl md:text-5xl lg:text-6xl">
            Terms of <span className="text-sa-primary">Service</span>
          </h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            These general terms set expectations for using our website,
            subscriptions, and professional services. A signed proposal or
            service agreement may contain additional terms.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-sa-muted/60">
            Last updated: 12 July 2026
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

        <LegalPageFooter
          current="terms"
          contactLabel="legal@oceancyber.net"
          contactHref="mailto:legal@oceancyber.net"
        />
      </div>
    </main>
  );
}
