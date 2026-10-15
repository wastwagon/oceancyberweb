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

- [Fitch Advisory](https://www.fitchadvisory.com/): client engagement up 250%
- [Fitch Attorneys](https://www.fitchattorneys.com/): case-management efficiency up 180%
- [ThinQ Shopping](https://thinqshopping.app/): mobile conversions up 165%

## Hire pages (Accra)

- [Web design in Accra](${site}/services/web-design-in-accra)
- [Web development in Accra](${site}/services/web-development-in-accra)
- [Software development in Accra](${site}/services/software-development-in-accra)
- [Mobile app development in Accra](${site}/services/mobile-app-development-in-accra)
- [Ecommerce development in Accra](${site}/services/ecommerce-development-in-accra)
- [Cybersecurity in Accra](${site}/services/cybersecurity-in-accra)
- [UI UX design in Accra](${site}/services/ui-ux-design-in-accra)

## Hire pages (Ghana)

- [Web design in Ghana](${site}/services/web-design-in-ghana)
- [Web development in Ghana](${site}/services/web-development-in-ghana)
- [Software development in Ghana](${site}/services/software-development-in-ghana)
- [Mobile app development in Ghana](${site}/services/mobile-app-development-in-ghana)
- [Ecommerce development in Ghana](${site}/services/ecommerce-development-in-ghana)
- [Cybersecurity in Ghana](${site}/services/cybersecurity-in-ghana)
- [UI UX design in Ghana](${site}/services/ui-ux-design-in-ghana)

## Capability services

- [Web development](${site}/services/web-development)
- [Software development](${site}/services/software-development): custom tools from GHS 14,500
- [Mobile apps](${site}/services/mobile-apps)
- [Ecommerce](${site}/services/ecommerce)
- [Cybersecurity](${site}/services/cybersecurity)
- [UI/UX design](${site}/services/ui-ux-design)

## Commerce

- [Buy a domain](${site}/domains): domain registration in GHS
- [Web hosting](${site}/hosting): cPanel hosting from GHS 69/mo
- [SSL certificates](${site}/ssl): PositiveSSL from GHS 45/yr
- [Domain prices in Ghana](${site}/guides/domain-prices-in-ghana)
- [Hosting cost in Ghana](${site}/guides/web-hosting-cost-in-ghana)

## Read these first

- [Home](${site}/): Accra web design, apps, and cybersecurity
- [About](${site}/about): team, office, and founding story
- [Website cost in Ghana](${site}/guides/website-cost-in-ghana): pricing guide for Ghana businesses
- [Pricing](${site}/pricing): Startup, Professional, and Enterprise plans
- [Reviews](${site}/reviews): Google reviews and client feedback
- [Portfolio](${site}/portfolio): published client work
- [Products](${site}/products): domains, SSL certificates, and hosting
- [Team](${site}/team): people behind OceanCyber
- [Contact](${site}/contact): talk to the Accra team
- [Get started](${site}/get-started): guided intake for a new project
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
