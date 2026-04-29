import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services/website-to-mobile-app" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
