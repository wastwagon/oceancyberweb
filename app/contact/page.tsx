import type { Metadata } from "next";
import { Contact } from "@/components/startup-agency/ContactPageContent";
import {
  CONTACT_PAGE_TITLE,
  contactPageMetaDescription,
} from "@/lib/marketing/agency-positioning";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: CONTACT_PAGE_TITLE,
    description: contactPageMetaDescription(),
  },
  "/contact",
);

export default function ContactPage() {
  return <Contact revealHeaderOnMount />;
}
