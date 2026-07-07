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
  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for basic site functionality, including authentication, security, and session management."
    },
    {
      title: "Performance Cookies",
      description: "Help us understand how visitors interact with our site by collecting and reporting information anonymously."
    },
    {
      title: "Functional Cookies",
      description: "Enable the site to provide enhanced functionality and personalization, such as remembering your preferences."
    },
    {
      title: "Analytical Cookies",
      description: "Used to track website usage and performance, helping us optimize the platform for all users."
    }
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
            We use cookies to ensure the reliability and security of our platform while continuously improving the engineering experience.
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
          <h2 className="font-heading text-xl font-bold text-white mb-4">Managing Your Preferences</h2>
          <p className="text-sa-muted/80 text-sm leading-relaxed">
            Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
          </p>
        </div>
      </div>
    </main>
  );
}
