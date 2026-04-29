import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services/ecommerce" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
