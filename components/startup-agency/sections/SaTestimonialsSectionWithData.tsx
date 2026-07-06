import { SaTestimonialsSection } from "@/components/startup-agency/sections/SaTestimonialsSection";
import { getGooglePlaceProfile } from "@/lib/google-places-stats";
import { getTestimonialCards } from "@/lib/data/testimonials-loader";

export async function SaTestimonialsSectionWithData() {
  const [{ stats, reviews }, featuredCards] = await Promise.all([
    getGooglePlaceProfile(),
    getTestimonialCards(),
  ]);

  return (
    <SaTestimonialsSection
      googleStats={stats}
      googleReviews={reviews}
      featuredCards={featuredCards}
    />
  );
}
