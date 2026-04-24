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
    return "You are welcome. If you want a human to follow up, visit /contact or email info@oceancyber.net.";
  }

  if (/\b(contact|email|reach|speak|human|call|phone|whatsapp|office)\b/.test(t)) {
    return "Reach us at info@oceancyber.net or +233 242 565 695. For a full form, open the Contact page: /contact (WhatsApp is linked there too).";
  }

  if (/\b(price|pricing|cost|quote|budget|how\s*much)\b/.test(t)) {
    return "Pricing depends on scope and timelines. The fastest path is to tell us about your project on /contact and we will respond with next steps.";
  }

  if (/\b(service|web|website|app|mobile|ecommerce|e-commerce|shop|store|security|cyber|audit)\b/.test(t)) {
    return "We cover web development, mobile apps, e-commerce, and cybersecurity. Browse /services for details, or describe your goal here and I will narrow it down.";
  }

  if (/\b(portfolio|work|project|case\s*stud|example)\b/.test(t)) {
    return "See selected work on the home page portfolio section, the full /portfolio listing, and /case-studies for deeper write-ups.";
  }

  if (/\b(where|location|address|accra|ghana)\b/.test(t)) {
    return "We are based in Accra, Ghana: 232 Nii Kwashiefio Avenue. Remote delivery across the region is normal for us.";
  }

  if (/\b(job|career|hire|intern)\b/.test(t)) {
    return "For roles or partnerships, email info@oceancyber.net with your background. We read every message.";
  }

  return (
    "Thanks for your message. For web, mobile, commerce, or security programs, the team can help on /contact. " +
    "You can also say “services”, “portfolio”, or “pricing” for quick pointers."
  );
}
