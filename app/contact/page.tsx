import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Contact — Web & Mobile Development in Ghana",
    description:
      "Reach OceanCyber for web, mobile, cybersecurity, and hosting projects in Ghana. Packages from GHS 6,000 — compare tiers or request a formal quote.",
  },
  "/contact",
);

export default function ContactPage() {
  return <Contact revealHeaderOnMount />;
}
