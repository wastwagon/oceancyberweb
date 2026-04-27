import type { TestimonialCard } from "@/lib/types/testimonial-card";

/** In-repo default when the database has no `Testimonial` rows. */
export const fallbackTestimonialCards: TestimonialCard[] = [
  {
    id: "fallback-fitch",
    name: "John Mensah",
    company: "Fitch Attorneys",
    role: "Managing Partner",
    content:
      "OceanCyber transformed our online presence completely. The new website has significantly increased our client inquiries and improved our professional image.",
    rating: 5,
    initials: "JM",
  },
  {
    id: "fallback-bravia",
    name: "Sarah Adjei",
    company: "Bravia Residency",
    role: "Marketing Director",
    content:
      "Working with OceanCyber was a game-changer. Their attention to detail and understanding of our business needs exceeded our expectations.",
    rating: 5,
    initials: "SA",
  },
  {
    id: "fallback-euroworld",
    name: "Kwame Asante",
    company: "Euroworld Projects",
    role: "CEO",
    content:
      "The team at OceanCyber delivered exactly what they promised. Our website now reflects the quality of our construction projects perfectly.",
    rating: 5,
    initials: "KA",
  },
];
