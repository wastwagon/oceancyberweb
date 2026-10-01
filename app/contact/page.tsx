import type { Metadata } from "next";
import { Contact } from "@/components/startup-agency/ContactPageContent";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Contact OceanCyber in Accra",
    description:
      "Call, email, or send a message about a web, mobile, or cybersecurity project. The company is at 47 Nii Kwashiefio Avenue, Accra.",
  },
  "/contact",
);

export default function ContactPage() {
  return <Contact revealHeaderOnMount />;
}
