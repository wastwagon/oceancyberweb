import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";

export const metadata: Metadata = withCanonical(
  {
    title: "Cookie Policy",
    description: "How OceanCyber uses cookies and related technologies.",
  },
  "/cookies",
);

export default function CookiesPage() {
  const cookieTypes = [
    {
      title: "Essential storage",
      description:
        "Required for authentication, security, session management, checkout, and other features you request. These technologies cannot be disabled through our consent banner because the service may not work without them.",
    },
    {
      title: "Analytics",
      description:
        "Optional analytics helps us understand visits, navigation, and site performance so we can improve the experience. Analytics is enabled only after you select Accept in our consent banner.",
    },
    {
      title: "Preference storage",
      description:
        "Local browser storage may remember choices such as cookie consent and other interface preferences. Clearing site data in your browser removes these saved choices.",
    },
    {
      title: "Third-party services",
      description:
        "Embedded or linked services, such as payment, scheduling, or external product platforms, may set their own cookies when you use them. Their privacy and cookie notices apply on those services.",
    },
  ];

  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-16">
          <span className="sa-eyebrow inline-flex">Digital Experience</span>
          <h1 className="sa-title !text-left mt-5 text-4xl md:text-5xl lg:text-6xl">
            Cookie <span className="text-sa-primary">Policy</span>
          </h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            We use essential browser storage to operate and secure the site.
            Optional analytics is activated only with your consent.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-sa-muted/60">
            Last updated: 12 July 2026
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {cookieTypes.map((type) => (
            <div key={type.title} className="sa-card p-8 border-sa-border">
              <h2 className="font-heading text-lg font-bold text-white mb-3">{type.title}</h2>
              <p className="text-sa-muted/80 text-sm leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 sa-card p-8 border-sa-border bg-sa-surface/50">
          <h2 className="font-heading text-xl font-bold text-white mb-4">Managing your preferences</h2>
          <p className="text-sa-muted/80 text-sm leading-relaxed">
            On your first visit, choose Accept or Decline in the consent
            banner. To reset that choice, clear this site&apos;s local storage
            in your browser and reload the page. You can also block or delete
            cookies and site data in your browser settings; doing so may sign
            you out or prevent requested platform features from working.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-sa-muted/80">
            For questions about these technologies or your personal data,
            email{" "}
            <a
              href="mailto:privacy@oceancyber.net"
              className="font-semibold text-sa-primary underline-offset-4 hover:underline"
            >
              privacy@oceancyber.net
            </a>
            .
          </p>
        </div>

        <LegalPageFooter current="cookies" />
      </div>
    </main>
  );
}
