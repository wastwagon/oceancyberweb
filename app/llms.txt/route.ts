import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

const site =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://oceancyber.net";

export function GET() {
  const p = googleBusinessProfile;
  const text = `# OceanCyber

> Best web design company in Accra and Ghana for websites, mobile apps, and cybersecurity.

- Founded: ${p.foundedYear}
- Founder and CEO: ${p.founderName}
- Team: ${p.teamSize} people
- Only office: ${p.address.street}, ${p.address.locality}, ${p.address.country}
- Phone: ${p.phone}
- Email: info@oceancyber.net
- Google rating: ${p.rating} from ${p.reviewCount} reviews
- Prices: Startup from GHS 6,000, Professional from GHS 14,500, Enterprise from GHS 30,000

## Published results

- Fitch Advisory (https://www.fitchadvisory.com/): client engagement up 250%
- Fitch Attorneys (https://www.fitchattorneys.com/): case-management efficiency up 180%
- ThinQ Shopping (https://thinqshopping.app/): mobile conversions up 165%

## Read these first

- ${site}/
- ${site}/about
- ${site}/services/web-design-in-accra
- ${site}/services/web-design-in-ghana
- ${site}/guides/website-cost-in-ghana
- ${site}/pricing
- ${site}/reviews
- ${site}/portfolio
- ${site}/team
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
