import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help centre",
  description:
    "Billing, renewals, hosting, and account help for OceanCyber customers in Ghana.",
  alternates: { canonical: "/help-center" },
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
