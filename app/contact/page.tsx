import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { withCanonical } from "@/lib/seo/canonical";

export const metadata = withCanonical(
  {
    title: "Contact",
    description:
      "Reach OceanCyber for web, mobile, cybersecurity, hosting, and transformation projects in Ghana.",
  },
  "/contact",
);

export default function ContactPage() {
  return (
    <main className="pt-24 md:pt-28">
      <Contact revealHeaderOnMount />
    </main>
  );
}