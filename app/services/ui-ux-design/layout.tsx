import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX Design & Brand Identity",
  description:
    "Human-centered UI/UX design, brand identity, and Figma prototypes from OceanCyber — Accra's product design and engineering studio.",
  alternates: { canonical: "/services/ui-ux-design" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
