import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/industries/education" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
