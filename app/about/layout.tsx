import type { Metadata } from "next";
import { getGooglePlaceStats } from "@/lib/google-places-stats";
import {
  ABOUT_PAGE_TITLE,
  aboutPageMetaDescription,
} from "@/lib/marketing/agency-positioning";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";
import { buildTrustBlurb } from "@/lib/trust/review-trust";

export async function generateMetadata(): Promise<Metadata> {
  const stats = await getGooglePlaceStats();
  const { reviewsOnly } = buildTrustBlurb(stats);
  return {
    title: ABOUT_PAGE_TITLE,
    description: aboutPageMetaDescription({
      reviewsOnly,
      teamSize: googleBusinessProfile.teamSize,
      street: googleBusinessProfile.address.street,
      foundedYear: googleBusinessProfile.foundedYear,
    }),
    alternates: { canonical: "/about" },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
