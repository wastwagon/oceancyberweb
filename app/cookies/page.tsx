import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How OceanCyber uses cookies and related technologies.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-16">
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          We use essential cookies for session reliability and security. Limited
          analytics cookies may be used to understand performance and improve the
          user experience.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          You can manage cookie preferences in your browser settings at any
          time. If you disable essential cookies, parts of the site may not work
          as expected.
        </p>
      </div>
    </main>
  );
}
