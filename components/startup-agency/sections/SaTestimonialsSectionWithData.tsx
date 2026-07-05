import { SaTestimonialsSection } from "@/components/startup-agency/sections/SaTestimonialsSection";
import { getGooglePlaceProfile } from "@/lib/google-places-stats";

export async function SaTestimonialsSectionWithData() {
  const { stats, reviews } = await getGooglePlaceProfile();

  return <SaTestimonialsSection googleStats={stats} googleReviews={reviews} />;
}
