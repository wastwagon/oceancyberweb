import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing the use of OceanCyber services and website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          By using this website and our services, you agree to lawful use,
          accurate project information, and respectful communication. Delivery
          timelines, scope, and support terms are defined in signed proposals or
          contracts.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          For formal terms related to a project, refer to your service
          agreement, or contact
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
