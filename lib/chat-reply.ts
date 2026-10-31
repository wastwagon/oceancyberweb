import { AGENCY_IDENTITY_GHANA, AGENCY_WHAT_WE_ARE } from "@/lib/marketing/agency-positioning";
import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

const POS_REPLY =
  "For in-store POS (counter sales, branches, pharmacy or restaurant tills), we publish editorial guides on DwumaPOS — not OceanCyber-built POS software. " +
  "Start with /guides/dwumapos-for-ghana-shops, /guides/dwumapos-restaurant-pos-ghana, or /guides/dwumapos-pharmacy-pos-ghana. " +
  "If you need a custom website or ecommerce store with Paystack or MoMo, say “ecommerce” or open /services/ecommerce.";

function isPosPlanningIntent(t: string): boolean {
  if (/\b(dwuma|dwumapos)\b/.test(t)) return true;
  if (/\b(pos|point of sale|point-of-sale|cash register|barcode|receipt printer)\b/.test(t)) return true;
  if (/\b(pharmacy)\b/.test(t) && /\b(counter|pos|inventory|dispens)\b/.test(t)) return true;
  if (/\b(restaurant|cafe|bar|kitchen)\b/.test(t) && /\b(pos|till|order)\b/.test(t)) return true;
  if (/\b(shop|store|retail|supermarket|boutique)\b/.test(t) && /\b(pos|till|branch|inventory)\b/.test(t)) {
    return !/\b(online|website|ecommerce|e-commerce|web store)\b/.test(t);
  }
  return false;
}

/**
 * Offline assistant when OPENAI_API_KEY is not set (or OpenAI fails).
 * Keep answers short and point to real site routes.
 */
export function getLocalChatReply(userText: string): string {
  const t = userText.trim().toLowerCase();
  if (!t) {
    return "Ask us anything about web, mobile, e-commerce, or security, or say “contact” to reach the team.";
  }

  if (/\b(hi|hello|hey|good\s*(morning|afternoon|evening))\b/.test(t)) {
    return "Hi there. I can point you to services, portfolio work, or our contact page. What are you looking for?";
  }

  if (/\b(thanks|thank\s*you|ty)\b/.test(t)) {
    return "You are welcome. If you want a human to follow up, use our Contact page or email info@oceancyber.net.";
  }

  if (/\b(contact|email|reach|speak|human|call|phone|whatsapp|office)\b/.test(t)) {
    return "Reach us at info@oceancyber.net or +233 242 565 695. For a full form, open our Contact page (WhatsApp is linked there too).";
  }

  if (/\b(price|pricing|cost|quote|budget|how\s*much)\b/.test(t)) {
    return "Packages start from GHS 6,000 for web work and GHS 12,000 for mobile add-ons. Compare tiers on our pricing page, use the project cost estimator, or contact us for a formal quote.";
  }

  if (isPosPlanningIntent(t)) {
    return POS_REPLY;
  }

  if (
    /\b(boutique|freelance shop)\b/.test(t) ||
    (/\bdesign\b/.test(t) && /\bstud[\s-]?io\b/.test(t))
  ) {
    return (
      `${AGENCY_WHAT_WE_ARE} in Accra (${AGENCY_IDENTITY_GHANA}). ` +
      "We design in Figma and build websites and mobile apps with our own team — see /about or /services."
    );
  }

  if (/\b(who are you|what are you|what do you do|what kind of company)\b/.test(t)) {
    return (
      `${AGENCY_WHAT_WE_ARE} in Accra, Ghana — websites, mobile apps, ecommerce, hosting, and security consulting. ` +
      "Packages from GHS 6,000 on /pricing. Live client URLs on /portfolio."
    );
  }

  if (
    /\b(best|top|number\s*one|#1)\b/.test(t) &&
    /\b(web|website|design|developer|development|company|accra|ghana)\b/.test(t)
  ) {
    return (
      `${AGENCY_IDENTITY_GHANA} — also highly rated as a web design company on Google Maps. ` +
      "Packages from GHS 6,000. See /services/web-design-in-ghana or /services/web-development-in-ghana, or /contact."
    );
  }

  if (/\b(developer|developers|web design company|design company)\b/.test(t)) {
    return (
      `We are a ${AGENCY_WHAT_WE_ARE.toLowerCase()} — design and engineering in one Accra team. ` +
      "/services/web-design-in-ghana · /services/web-development-in-ghana"
    );
  }

  if (/\b(service|web|website|app|mobile|ecommerce|e-commerce|shop|store|security|cyber|audit)\b/.test(t)) {
    return "We cover web development, mobile apps, e-commerce, and cybersecurity. Browse our Services page for details, or describe your goal here and I will narrow it down.";
  }

  if (/\b(portfolio|work|project|case\s*stud|example)\b/.test(t)) {
    return "See selected work on the home page portfolio section and our full portfolio for deeper project write-ups.";
  }

  if (/\b(where|location|address|accra|ghana)\b/.test(t)) {
    return `Our only office is in Accra, Ghana: ${googleBusinessProfile.address.street}. A team of ${googleBusinessProfile.teamSize} works from there, including for clients outside Accra.`;
  }

  if (/\b(job|career|hire|intern)\b/.test(t)) {
    return "For roles or partnerships, email info@oceancyber.net with your background. We read every message.";
  }

  return (
    "Thanks for your message. For web, mobile, commerce, or security work, the team can help on our Contact page. " +
    "You can also say “services”, “portfolio”, or “pricing” for quick pointers."
  );
}
