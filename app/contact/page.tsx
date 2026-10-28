import type { Metadata } from "next";
import { Contact } from "@/components/startup-agency/ContactPageContent";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Contact our web design company in Accra, Ghana",
    description:
      "Talk to OceanCyber — best-rated website design and development team at 47 Nii Kwashiefio Avenue, Accra. Web, mobile, ecommerce, and security from GHS 6,000.",
  },
  "/contact",
);

export default function ContactPage() {
  return <Contact revealHeaderOnMount />;
}
