import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/healthcare" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
