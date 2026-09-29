import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";
import { LegalPageFooter } from "@/components/legal/LegalPageFooter";

export const metadata: Metadata = withCanonical(
  {
    title: "Cookie policy",
    description: "How OceanCyber uses cookies and related technologies.",
  },
  "/cookies",
);

export default function CookiesPage() {
  const cookieTypes = [
    {
      title: "Public site",
      description:
        "Browsing the marketing site does not set an analytics cookie and does not ask you to accept one. We are not running a visit tracker on these pages.",
    },
    {
      title: "Signed-in session",
      description:
        "After you sign in, the browser stores a session cookie so the workspace can recognise you and stay secure. Signing out or clearing site data removes it.",
    },
    {
      title: "Payments and other services",
      description:
        "Checkout, scheduling, or a linked product may set cookies on its own service when you use it. That provider’s notice applies there.",
    },
  ];

  return (
    <main className="sa-shell min-h-screen bg-sa-bg sa-page-top pb-16 md:py-36">
      <div className="sa-container max-w-4xl px-6">
        <header className="mb-16">
          <span className="sa-eyebrow inline-flex">Cookies</span>
          <h1 className="sa-title-lg !text-left mt-5">
            Cookie policy
          </h1>
          <p className="sa-subtitle !text-left mt-6 max-w-2xl">
            The marketing site does not use an analytics cookie. A session cookie
            is set only after you sign in.
          </p>
          <p className="mt-4 text-sm text-sa-muted">
            Last updated: 29 September 2026
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
            You can block or delete cookies in your browser settings. Doing so
            signs you out of the workspace. It does not change anything about
            browsing the public pages.
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
