import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export type IntentKind = "guide" | "compare" | "alternative";

export const intentPagesUpdated = "2026-10-15";
export const intentPagesUpdatedLabel = "October 2026";

export type IntentLink = {
  href: string;
  label: string;
};

export type IntentExample = {
  title: string;
  paragraphs: string[];
  link?: IntentLink;
};

export type IntentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  table?: IntentTable;
  example?: IntentExample;
  links?: IntentLink[];
};

export type IntentTable = {
  caption: string;
  columns: string[];
  rows: string[][];
};

export type IntentFaq = {
  question: string;
  answer: string;
};

export type IntentPage = {
  kind: IntentKind;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: IntentSection[];
  table?: IntentTable;
  faqs: IntentFaq[];
  related: IntentLink[];
  cta: {
    title: string;
    body: string;
    href: string;
    label: string;
  };
  /**
   * Paid / affiliate placements only. Shows a disclosure box and adds
   * rel="sponsored" on outbound product links. Omit for editorial
   * product guides (dofollow contextual links).
   */
  partnerBrand?: {
    name: string;
    siteLabel: string;
    disclosure: string;
  };
};

export const intentKindMeta: Record<
  IntentKind,
  { path: string; label: string; hubTitle: string; hubDescription: string }
> = {
  guide: {
    path: "/guides",
    label: "Guides",
    hubTitle: "Guides for building in Ghana",
    hubDescription:
      "Practical answers on website cost, domain prices, hosting cost, Mobile Money checkout, ecommerce timelines, the Ghana Data Protection Act, and DwumaPOS for Ghana shops.",
  },
  compare: {
    path: "/compare",
    label: "Comparisons",
    hubTitle: "Comparisons for Ghana teams",
    hubDescription:
      "Side-by-side choices buyers search before they hire: agency or freelancer, Shopify or custom, Wix or a site you own.",
  },
  alternative: {
    path: "/alternatives",
    label: "Alternatives",
    hubTitle: "Alternatives for Ghana businesses",
    hubDescription:
      "When a hosted builder is enough, and when a Ghana team should move to a site that takes Mobile Money and stays under local support.",
  },
};

export function intentPagePath(page: Pick<IntentPage, "kind" | "slug">): string {
  return `${intentKindMeta[page.kind].path}/${page.slug}`;
}

/** Shared DwumaPOS facts so the shop, restaurant, and pharmacy guides stay aligned. */
const dwumaPlanSummary =
  "Setting up the shop is free. The 30-day trial starts when you open the shop for sales, on Starter, Business, or Scale. After the trial, Starter is GHS 149 a month, Business is GHS 249 a month, and Scale is GHS 399 a month. You can pay each month, or prepay for one to five years. One year uses the same monthly price. A longer prepay lowers that monthly rate.";

const dwumaPlanTable: IntentTable = {
  caption: "DwumaPOS plans after the 30-day trial (GHS a month)",
  columns: ["Plan", "GHS a month", "Limits", "What you get"],
  rows: [
    [
      "Starter",
      "149",
      "1 branch, unlimited products, 3 staff",
      "Website on yourshop.dwumapos.com, pickup and delivery, POS Desktop keeps sales for up to 3 days",
    ],
    [
      "Business",
      "249",
      "Up to 3 branches, 10 staff",
      "Your own domain, transfers between branches, promotions and coupons, part payments",
    ],
    [
      "Scale",
      "399",
      "Up to 50 branches, 200 staff",
      "POS Desktop keeps sales for up to 7 days, payroll with SSNIT and PAYE",
    ],
  ],
};

const dwumaOfflineSummary =
  "Install POS Desktop on a Windows PC if you need to keep selling when the network drops. Cash, a card payment you record, a bank transfer, and MoMo you type in by hand stay on that computer and upload when you are back online. Starter and Business hold them for up to three days. Scale holds them for up to seven days. A live MoMo prompt, the sales report, moving stock between branches, and promotions wait for the internet. If you only use the POS in a browser, sales stop until the internet returns. Leave stock edits alone until those sales have uploaded, so the website and the POS do not show two quantities for one product.";

const dwumaWebsiteNote =
  "On Starter the website is yourshop.dwumapos.com. Business and Scale can use your own domain, such as yourshop.com. Customer MoMo and card payments go to the Paystack or Hubtel account you connect. That money is not the DwumaPOS bill.";

export const intentPages: readonly IntentPage[] = [
  {
    kind: "guide",
    slug: "website-cost-in-ghana",
    title: "How much does a website cost in Ghana?",
    description:
      "What a website costs in Ghana in 2026: GHS 6,000, GHS 14,500, and GHS 30,000 starting builds, what each leaves out, and a first-year total with domain and hosting.",
    eyebrow: "Pricing guide",
    image: "/images/articles/website-cost-ghana.png",
    imageAlt: "A quiet Accra desk with a website sketch and cedis, lit by a lime edge light",
    intro:
      "A website from us starts at GHS 6,000, GHS 14,500, or GHS 30,000. That price is the build. A .com is GHS 120 a year. Hosting starts at GHS 69 a month. A five-page site, with the domain and hosting paid each month, comes to GHS 6,948 in the first year.",
    sections: [
      {
        heading: "The three prices",
        paragraphs: [
          "The package price is the work of building the site. It does not include the domain, hosting, photos, or a monthly care plan.",
          "Startup is GHS 6,000. It usually takes 3 to 5 weeks once the words are ready. You get up to five pages, your colours and type on a layout we already use, a contact form, one Paystack or MoMo checkout, basic search setup, and 30 days of support if something is broken.",
          "Professional is GHS 14,500. It usually takes 6 to 10 weeks. You get up to 12 pages, a design drawn for you, a way for your team to edit the site, Paystack or MoMo that finance can match to the orders, and 90 days of support.",
          "Enterprise is GHS 30,000. It usually takes 10 to 16 weeks, sometimes longer. We agree the scope first. It can include different logins for staff, a privacy setup that matches the Ghana Data Protection Act, a security review, and one person who leads the work.",
        ],
        links: [
          { href: "/pricing", label: "Full package comparison" },
          { href: "/tools/project-cost", label: "Estimate a custom scope" },
        ],
      },
      {
        heading: "What GHS 6,000 includes",
        paragraphs: [
          "GHS 6,000 is a real five-page site. Read this list before you compare it with a cheaper quote that does not say what is included.",
        ],
        table: {
          caption: "Startup package boundary",
          columns: ["Line", "Inside GHS 6,000", "Quoted separately"],
          rows: [
            ["Pages", "Up to 5", "Page six onward"],
            ["Design", "Brand styling on a proven layout", "Custom UI in Figma"],
            ["Payments", "One Paystack or Mobile Money flow", "Webhook reconciliation and a daily finance view"],
            ["Editing", "We place the copy you send", "A CMS so your team edits after launch"],
            ["Search", "Basic on-page titles and metadata", "An ongoing content programme"],
            ["After launch", "30 days of defect support", "Care retainer from GHS 850 a month"],
            ["Hosting and domain", "Not included", "From GHS 69 a month, plus the yearly domain"],
          ],
        },
      },
      {
        heading: "A five-page company site, in cedis",
        paragraphs: [
          "Say you need a home page, an about page, a services page, one page of work, and a contact page. You have a logo. You can write the words. You want the form to email you. You do not need a product list or a client login.",
          "That is Startup. The build is GHS 6,000. A .com is GHS 120 for the year. Hosting is GHS 69 a month, which is GHS 828 if you pay every month for a year. If you pay hosting for the year up front, that hosting line is about 15% less, around GHS 704.",
          "Paid monthly, year one is GHS 6,000 + GHS 120 + GHS 828 = GHS 6,948. Paid yearly for hosting, year one is about GHS 6,824. Photos, extra pages, and Paystack’s own fee on a sale are not in that sum.",
        ],
        example: {
          title: "When five pages is not enough",
          paragraphs: [
            "If the same firm needs a client login, file sharing, or appointment booking, that is no longer a five-page site. Professional starts at GHS 14,500. A site with staff logins and a security review starts at GHS 30,000.",
            "Fitch Advisory is that kind of site: a client area, document sharing, and booking, live at fitchadvisory.com. The portfolio shows what was built. The contract price stays private. Use the prices on this page, then we confirm the fee before work starts.",
          ],
          link: { href: "/portfolio/fitch-advisory", label: "See the Fitch Advisory project" },
        },
      },
      {
        heading: "What makes the price go up",
        paragraphs: [
          "The number of pages is the small part. The price goes up when the site takes money, holds a product list, connects to another system, or needs a security review.",
        ],
        bullets: [
          "Custom interface design, quoted from Professional at GHS 14,500",
          "Paystack and Mobile Money with receipts and reconciliation, also Professional",
          "A catalog, bookings, or a client portal",
          "Copy, photography, and product data you still need to produce",
          "Each extra integration, from GHS 2,500 when it is scoped as an add-on",
          "A single mobile platform, from GHS 12,000",
          "A security review when the site holds payments or personal data",
        ],
      },
      {
        heading: "Hosting and the domain",
        paragraphs: [
          "Hosting is a separate bill. Launch is GHS 69 a month for one business site, with 25 GB, SSL, email, and weekly backups. Grow is GHS 129 a month for a shop or several sites. Scale is GHS 249 a month for a larger setup. If you pay for the year up front, those prices drop by 15%, 18%, and 20%.",
          "A .com on our list is GHS 120 a year. .africa is GHS 100 a year. Checkout shows the live total.",
          "After the support period, care starts at GHS 850 a month for updates, monitoring, and small fixes. Broken things inside the 30, 90, or 180 days that come with the package are included. New pages after that are new work.",
        ],
        links: [
          { href: "/hosting", label: "Hosting plans and what each includes" },
          { href: "/domains", label: "Check a domain price" },
        ],
      },
      {
        heading: "A shop costs more than a brochure",
        paragraphs: [
          "A shop with products, checkout, and payments that finance can match starts at GHS 14,500 and usually takes 6 to 10 weeks. A larger operation starts at GHS 30,000. Hosting for that shop is usually GHS 129 a month, not GHS 69.",
          "ThinQ Shopping is a shop we built for the phone, with Paystack and MoMo. Look at the project for what was built. Do not budget it as a GHS 6,000 brochure.",
        ],
        links: [
          { href: "/portfolio/thinq-shopping", label: "ThinQ Shopping project" },
          { href: "/guides/ecommerce-website-timeline-ghana", label: "How long a Ghana store takes" },
          { href: "/guides/accept-mobile-money-paystack", label: "What the payment integration includes" },
        ],
      },
      {
        heading: "How we price it",
        paragraphs: [
          "We use the same three prices as the pricing page. We check which lines on this page are in your brief.",
        ],
        steps: [
          "You tell us the pages, whether you take payment, and who will edit the site after launch.",
          "We match that to Startup, Professional, or Enterprise, and list anything extra.",
          "You see the build, the domain, the hosting, and the support period as separate lines before we start.",
          "We start when the words are ready, or when we have agreed who will write them. Waiting on photos is the usual pause.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is GHS 6,000 the full first-year cost?",
        answer:
          "GHS 6,000 is the build. Add GHS 120 for a .com and GHS 69 a month for hosting. Paid monthly, that is about GHS 6,948 in the first year. Paying hosting for the year up front takes about 15% off the hosting.",
      },
      {
        question: "Why do some Accra quotes look cheaper?",
        answer:
          "A lower quote is often a template with your logo on it. The words, payments, speed, search setup, and hosting are left to you. Ask what happens after day 30, and who owns the files.",
      },
      {
        question: "Can my team edit the site after launch?",
        answer:
          "On Startup we put in the words you send. A way for your team to edit is part of Professional, from GHS 14,500. After the support period, edits are GHS 850 a month, or a separate quote.",
      },
      {
        question: "Do you bill in cedis?",
        answer:
          "Yes. Packages, hosting, domain list prices, and the project cost calculator are in Ghana cedis.",
      },
    ],
    related: [
      { href: "/services/web-design-in-ghana", label: "Web design in Ghana" },
      { href: "/services/web-design-in-accra", label: "Web design in Accra" },
      { href: "/compare/wix-vs-custom-website-ghana", label: "Wix or a custom site" },
    ],
    cta: {
      title: "Tell us the pages and the budget",
      body: "Send the pages, whether you take payment, and the date you want. We will match that to a package before we build.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "guide",
    slug: "accept-mobile-money-paystack",
    title: "How to accept Mobile Money and Paystack on a website",
    description:
      "What a Ghana business website needs to take MTN Mobile Money, Telecel Cash, AirtelTigo Money, and cards through Paystack: checkout, webhooks, and reconciliation.",
    eyebrow: "Payments guide",
    image: "/images/articles/mobile-money-ghana.png",
    imageAlt: "A phone over a card terminal on a dark Ghana shop counter",
    intro:
      "People in Ghana pay from the phone. A Paystack button is not enough. The site has to confirm the MoMo or card payment, save it, and show your team a list that matches Paystack the next morning.",
    sections: [
      {
        heading: "The wallets",
        paragraphs: [
          "Paystack is the usual way to take cards and MoMo on a Ghana website. The wallets are usually MTN MoMo, Telecel Cash, and AirtelTigo Money. Check the live list with Paystack when you open the account, because the names change.",
          "Show the amount and the fee before the customer confirms. A surprise charge is how you lose a payment that has already left their wallet.",
        ],
        links: [{ href: "/insights/ghana-momo-economy", label: "How Mobile Money changes product design" }],
      },
      {
        heading: "What has to happen on a GHS 200 order",
        paragraphs: [
          "The customer taps Pay. Paystack sends a prompt to MTN MoMo, Telecel Cash, or AirtelTigo Money, or takes the card. They approve on the phone. Paystack then tells your site. The order is paid only after that message checks out. If they close the browser after approving, the sale still has to be saved. Refreshing the thank-you page must not create a second order.",
          "The next morning, finance needs a list that matches Paystack. A button that only sends people to Paystack does not give you that list.",
        ],
        steps: [
          "Open the Paystack account while we are designing, not the week you want to launch. Missing papers are a common reason a shop misses the date.",
          "Show the amount, the fee, and the wallet or card before the customer confirms.",
          "Check Paystack’s message and ignore a repeat of the same payment.",
          "Mark the order paid only after that check, and show the customer a receipt.",
          "Give the person who matches the bank a daily list of payments that worked and prompts that failed.",
          "Test a timeout and a wallet with no money before you tell people the shop is open.",
        ],
        example: {
          title: "A shop that already works this way",
          paragraphs: [
            "ThinQ Shopping is a phone shop we built with Paystack and MoMo. The team manages orders in the same system. That is the GHS 14,500 level of work, not a payment link pasted on a page.",
          ],
          link: { href: "/portfolio/thinq-shopping", label: "ThinQ Shopping project" },
        },
      },
      {
        heading: "Which package includes this",
        paragraphs: [
          "Startup includes one Paystack or MoMo payment. Professional adds the morning list that matches Paystack, which is what a shop needs. Enterprise is for more than one payment company.",
        ],
        links: [
          { href: "/services/ecommerce", label: "Ecommerce development" },
          { href: "/pricing", label: "See payment scope by package" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can Wix or Squarespace take MoMo properly?",
        answer:
          "They can show a payment link. A shop that must match Paystack and avoid sending the same order twice needs a checkout we build. The Wix page explains that choice.",
      },
      {
        question: "How long does Paystack take to approve us?",
        answer:
          "Paystack checks the business, the bank account, and the website. Start that while we are designing. Missing papers are a common reason a shop misses the opening date.",
      },
    ],
    related: [
      { href: "/compare/shopify-woocommerce-custom-ghana", label: "Shopify, WooCommerce, or custom" },
      { href: "/guides/ecommerce-website-timeline-ghana", label: "Ecommerce timelines" },
      { href: "/guides/dwumapos-for-ghana-shops", label: "DwumaPOS for Ghana shops" },
    ],
    cta: {
      title: "Tell us which wallets you need",
      body: "Tell us what you sell and which wallets you take. We will write the payment steps before we build.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "guide",
    slug: "ghana-data-protection-act-for-websites",
    title: "Ghana Data Protection Act for websites",
    description:
      "What the Ghana Data Protection Act (Act 843) means for a company website, store, or SaaS product: privacy notices, data mapping, security, and vendor records. Practical guidance, not legal advice.",
    eyebrow: "Compliance guide",
    image: "/images/articles/data-protection-ghana.png",
    imageAlt: "A closed folder and a key on a dark office desk",
    intro:
      "If your website collects a name, a phone number, an email, or a payment from someone in Ghana, the Data Protection Act, 2012 (Act 843) applies. The Data Protection Commission handles registration and complaints. This page is a build checklist. It is not legal advice.",
    sections: [
      {
        heading: "Write the notice from the site you actually have",
        paragraphs: [
          "A privacy page copied from a US site fails when it talks about data you do not collect, or skips the MoMo number and delivery address you do collect.",
          "For a normal company site or shop, the list is short.",
        ],
        steps: [
          "List every form: contact, checkout, newsletter. Say which fields you keep and for how long.",
          "If you use Paystack, say so, and say they also hold the payment record.",
          "Name the company that hosts the site and the analytics tool. If you use our hosting, say who can open the admin.",
          "Give admin access only to the people who run the site, and turn on HTTPS before the form goes live.",
          "Write one page for a breach: who you call, how you tell customers, and where the backup is.",
          "Ask the Data Protection Commission, or a lawyer in Ghana, whether you must register. Do that before a big client asks for the certificate.",
        ],
        links: [
          { href: "/insights/ghana-data-protection-act-2026", label: "2026 checklist for SaaS and fintech teams" },
          { href: "/services/cybersecurity", label: "Cybersecurity services" },
        ],
      },
      {
        heading: "Name the other companies that see the data",
        paragraphs: [
          "Hosting, email, Paystack, analytics, and any SMS service see personal data for you. Write down who they are. On a GHS 30,000 build we include that list in the work. A smaller site still needs the notice and the limited admin access on day one.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a simple contact form need a privacy notice?",
        answer:
          "Yes. A form that stores a name, phone number, or email is personal data. The notice should say what you do with the message and how long you keep it.",
      },
      {
        question: "Is this legal advice?",
        answer:
          "It is a build checklist. Registration and sending data outside Ghana should be checked with the Data Protection Commission or a lawyer in Ghana.",
      },
    ],
    related: [
      { href: "/insights/data-privacy-compliance", label: "Privacy as an engineering practice" },
      { href: "/tools/security-assessment", label: "Security self-assessment" },
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
    ],
    cta: {
      title: "Match the notice to the forms",
      body: "We list the forms, payments, and host before launch, so the privacy page matches the site.",
      href: "/contact",
      label: "Talk to the team",
    },
  },
  {
    kind: "guide",
    slug: "ecommerce-website-timeline-ghana",
    title: "How long does an ecommerce website take in Ghana?",
    description:
      "Realistic ecommerce timelines in Accra and across Ghana: 6–10 weeks for a scoped store, 10–16 weeks or more when catalog, payments, and operations are complex.",
    eyebrow: "Timeline guide",
    image: "/images/articles/ecommerce-timeline-ghana.png",
    imageAlt: "Blank timeline cards and a laptop on an Accra workshop table",
    intro:
      "A shop with products, checkout, and an admin your team can use usually takes 6 to 10 weeks. A larger shop, with custom operations or a big product list, takes 10 to 16 weeks or more.",
    sections: [
      {
        heading: "The times we actually use",
        paragraphs: [
          "A five-page site with one payment takes 3 to 5 weeks, from GHS 6,000. A real shop, with products, checkout, payments finance can match, and an admin your team can use, takes 6 to 10 weeks, from GHS 14,500.",
          "A larger build starts at GHS 30,000 and takes 10 to 16 weeks or more when it includes a full design, staff logins, and a security review.",
          "Here is an 8-week shop, counted from the day the product list and the Paystack application are both moving.",
        ],
        steps: [
          "Week 1: how many products, where you deliver, and the Paystack papers. We do not design from an empty spreadsheet.",
          "Week 2: the pages, the checkout steps, and the jobs your team will do every day.",
          "Weeks 3 and 4: the design, checked against real photos.",
          "Weeks 5 and 6: the product list, checkout, and the Paystack message. We test a failed payment here.",
          "Week 7: you load products. We fix what the data shows. Finance matches a test payment.",
          "Week 8: launch on GHS 129 hosting, send old shop links to the new pages, and name the person for the 90 days of support.",
        ],
        links: [{ href: "/services/ecommerce", label: "Ecommerce service" }],
      },
      {
        heading: "What makes a shop late",
        paragraphs: [
          "The date slips when product names, photos, or delivery rules arrive after the design is approved. Paystack’s checks are the other delay. Start the Paystack application in week 1.",
        ],
        bullets: [
          "Product names, prices, options, and photos in a spreadsheet",
          "Where you deliver, and the fee you are willing to promise",
          "The return rule, written in plain words",
          "A bank account Paystack can check",
          "One person on your side who can approve a page within two working days",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you launch a store in two weeks?",
        answer:
          "Two weeks is realistic only for a very small product list, a layout you have already approved, and payments that are already working. Most Ghana shops need 6 to 10 weeks so checkout and the products are right on day one.",
      },
      {
        question: "Does the time include my words and photos?",
        answer:
          "The weeks assume you send the words and the product list, or we agree to write them in the price. Waiting on photos is the usual pause.",
      },
    ],
    related: [
      { href: "/guides/accept-mobile-money-paystack", label: "Mobile Money and Paystack" },
      { href: "/compare/shopify-woocommerce-custom-ghana", label: "Shopify, WooCommerce, or custom" },
      { href: "/guides/dwumapos-for-ghana-shops", label: "DwumaPOS for Ghana shops" },
    ],
    cta: {
      title: "Put a date on it",
      body: "Tell us how many products you have and how you take payment. We will say which timeline fits.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "compare",
    slug: "agency-vs-freelancer-vs-in-house-ghana",
    title: "Agency vs freelancer vs in-house hire in Ghana",
    description:
      "How Accra teams should choose between a freelancer, a full-time hire, and a delivery agency for a website or product launch in Ghana.",
    eyebrow: "Comparison",
    image: "/images/articles/agency-freelancer-ghana.png",
    imageAlt: "Three people in an Accra meeting room reviewing a website on a large screen",
    intro:
      "Use a freelancer for a small page you can direct yourself. Hire someone full time when the product is already live and you need them every week. Use us when the launch needs design, build, payments, and a date.",
    table: {
      caption: "Which model fits the work",
      columns: ["Criteria", "Freelancer", "In-house hire", "Agency"],
      rows: [
        ["Best for", "A small site you can brief clearly", "Weekly work on a product you already run", "A launch with design, build, and payments"],
        ["Cost shape", "A project fee or day rate", "Salary, equipment, and management every month", "Fixed milestones from GHS 6,000"],
        ["Time to start", "Depends on their current clients", "Often months to recruit in Accra", "Discovery can start as soon as scope is clear"],
        ["Skills on the job", "Whoever you hired", "The role you opened", "Design, engineering, and launch support together"],
        ["After launch", "You manage the next change", "They stay on the team", "Support window, then a retainer if you want one"],
      ],
    },
    sections: [
      {
        heading: "Use a freelancer for a small page",
        paragraphs: [
          "A freelancer fits a landing page or a small change when you can review the work and you only need one skill. You carry the risk if they are busy, travelling, or have not done Paystack before.",
        ],
      },
      {
        heading: "Hire full time when the product is already live",
        paragraphs: [
          "Hire when the site is live and the next year is small changes every week. A planning figure we already use is a senior engineer plus design and security, above GHS 20,000 a month, before recruitment, a laptop, and a manager. One hire still leaves design and security as separate jobs. Filling the role often takes months.",
        ],
        links: [{ href: "/insights/agency-vs-hire-ghana", label: "Cost map for Accra teams" }],
      },
      {
        heading: "Use OceanCyber for a dated launch",
        paragraphs: [
          "We fit a job with an end: a company site, a shop, or a milestone, with a price in cedis and notes when we hand it over. Startup starts at GHS 6,000, Professional at GHS 14,500, and Enterprise at GHS 30,000. You can keep a monthly care plan if the work continues.",
        ],
        links: [
          { href: "/how-we-work", label: "How delivery works" },
          { href: "/pricing", label: "Package comparison" },
        ],
      },
    ],
    faqs: [
      {
        question: "Can we use an agency and still hire later?",
        answer:
          "Yes. A common path is we launch the site, hand over the notes, and you hire later once people are using it. The new person inherits a working site.",
      },
      {
        question: "Is an agency more expensive than a freelancer?",
        answer:
          "The invoice is often higher because it includes design, build, and a support period. A freelancer quote that leaves those out is a different job.",
      },
    ],
    related: [
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
      { href: "/services/web-design-in-accra", label: "Web design in Accra" },
      { href: "/team", label: "The OceanCyber team" },
    ],
    cta: {
      title: "Tell us the date",
      body: "Tell us when you want to launch and who will look after the site. We will say if a package fits.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "compare",
    slug: "shopify-woocommerce-custom-ghana",
    title: "Shopify vs WooCommerce vs a custom store in Ghana",
    description:
      "Choose Shopify, WooCommerce, or a custom ecommerce build for a Ghana store that needs Mobile Money, cards, and a catalog your team can run.",
    eyebrow: "Comparison",
    image: "/images/articles/shopify-woocommerce-custom.png",
    imageAlt: "A phone, a laptop, and a tablet showing different shop layouts on a dark table",
    intro:
      "Use Shopify when the product list already fits and you are fine paying for apps each month. Use WooCommerce when you want WordPress and someone will keep it updated. Use a custom shop when payments, staff roles, or delivery do not fit a theme.",
    table: {
      caption: "Store platforms for Ghana",
      columns: ["Criteria", "Shopify", "WooCommerce", "Custom build"],
      rows: [
        ["You own the storefront", "Shopify hosts it", "You host the WordPress site", "You own the code and the content"],
        ["Mobile Money", "Through a payments app such as Paystack", "Through a Paystack plugin on your server", "Checkout and webhooks built for your flow"],
        ["Monthly cost", "Plan plus apps", "Hosting from GHS 69, plus plugins", "Hosting, then changes scoped as work"],
        ["Best for", "A standard catalog and fast setup", "A WordPress team that will patch the site", "Custom ops, roles, or reconciliation"],
        ["OceanCyber package", "We can integrate where it is the right core", "We can build and harden it", "Professional from GHS 14,500, Enterprise from GHS 30,000"],
      ],
    },
    sections: [
      {
        heading: "Stay on Shopify when the products are straightforward",
        paragraphs: [
          "Shopify is a good fit for a normal product list, especially if you want themes and discounts without running a server. Cards and MoMo in Ghana usually go through an app such as Paystack. Add the app cost and the Shopify plan to the real monthly bill.",
          "Leave Shopify when finance cannot match the payments in the admin, or when delivery, branches, or staff roles do not fit.",
        ],
      },
      {
        heading: "Use WooCommerce if you will look after WordPress",
        paragraphs: [
          "WooCommerce is a shop on a site you host. Hosting starts at GHS 69 a month. You update the plugins and the backups. That is a fair deal if your team already knows WordPress.",
        ],
        links: [{ href: "/hosting", label: "Hosting for a store" }],
      },
      {
        heading: "Build a custom shop when the way you sell is the point",
        paragraphs: [
          "A custom shop is the right job when checkout, stock, or staff roles are specific to how you sell. It starts at GHS 14,500, with Paystack or MoMo that finance can match, usually in 6 to 10 weeks. A larger platform starts at GHS 30,000. Hosting for a real shop is usually GHS 129 a month.",
          "ThinQ Shopping is this kind of shop: products, Paystack, MoMo, and an order desk the team uses. If your products already fit Shopify and the Paystack app covers the wallets, stay. Move when the admin cannot show the payments finance asks for.",
        ],
        links: [
          { href: "/services/ecommerce", label: "Ecommerce development" },
          { href: "/portfolio/thinq-shopping", label: "ThinQ Shopping project" },
        ],
      },
    ],
    faqs: [
      {
        question: "Which one ranks better on Google?",
        answer:
          "The software does not rank by itself. Clear product pages, a fast phone load, and a checkout that matches what people searched for do the work. A neglected plugin site and a neglected custom site both lose.",
      },
      {
        question: "Can you migrate a Shopify catalog later?",
        answer:
          "Yes. Product data, customers, and URLs should be mapped before the new store launches so existing links keep working.",
      },
    ],
    related: [
      { href: "/alternatives/shopify-ghana", label: "Shopify alternatives in Ghana" },
      { href: "/guides/accept-mobile-money-paystack", label: "Mobile Money and Paystack" },
      { href: "/guides/ecommerce-website-timeline-ghana", label: "How long a store takes" },
    ],
    cta: {
      title: "Bring the product list",
      body: "Bring the products and how you deliver. We will say Shopify, WooCommerce, or a custom price.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "compare",
    slug: "wix-vs-custom-website-ghana",
    title: "Wix vs a custom website in Ghana",
    description:
      "When a Wix site is enough for a Ghana business, and when a custom website is the better buy for brand, Mobile Money, speed, and search.",
    eyebrow: "Comparison",
    image: "/images/articles/wix-custom-ghana.png",
    imageAlt: "A simple brochure beside a laptop with a custom website, separated by a lime light",
    intro:
      "Wix is enough for a simple site you edit yourself, if you are not matching MoMo payments. A custom site is the better buy when the website is how you sell, or a system your team will run for years.",
    table: {
      caption: "Wix and a custom OceanCyber site",
      columns: ["Criteria", "Wix", "Custom website"],
      rows: [
        ["Best for", "A simple brochure and DIY edits", "A company site, store, or web app"],
        ["Starting build cost", "Wix subscription", "From GHS 6,000"],
        ["Payments", "Payment links and Wix payments where available", "Paystack and Mobile Money with reconciliation on Professional"],
        ["Search and speed", "Limited by the builder", "Metadata, structure, and performance set for the project"],
        ["Who you call in Accra", "Wix support", "OceanCyber, on +233 242 565 695"],
      ],
    },
    sections: [
      {
        heading: "Keep Wix for a simple site",
        paragraphs: [
          "If you have a few pages, you like editing them, and the site does not take orders that finance must match, Wix can be the whole thing. Pay the subscription and spend your time on the business.",
        ],
      },
      {
        heading: "Move when the website has a job",
        paragraphs: [
          "Move when you need your own design, pages written for the searches you want, and a checkout that records MoMo the way finance expects. A five-page site starts at GHS 6,000. With a .com and hosting paid each month, the first year is GHS 6,948. Custom design and payments finance can match start at GHS 14,500.",
          "Keep the Wix addresses that already bring calls, or send each one to the new page, and launch the new site before the Wix subscription ends.",
        ],
        example: {
          title: "What the custom site looks like when it is done",
          paragraphs: [
            "Fitch Advisory needed a client login, file sharing, and booking on fitchadvisory.com. ThinQ Shopping needed Paystack and MoMo on the phone. Neither of those fits a Wix payment link. The portfolio shows what was built. The cost page shows how to budget it.",
          ],
          link: { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana, with the first-year total" },
        },
        links: [
          { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
          { href: "/services/web-design-in-ghana", label: "Web design in Ghana" },
        ],
      },
    ],
    faqs: [
      {
        question: "Will I lose my Google rankings if I leave Wix?",
        answer:
          "You keep rankings when the new site uses the same important URLs, or redirects each old URL to the matching new page. Plan that map before the Wix subscription ends.",
      },
      {
        question: "Can I still edit pages after a custom build?",
        answer:
          "Yes. Professional includes a CMS or a light admin so your team can update content without a developer for every sentence.",
      },
    ],
    related: [
      { href: "/alternatives/wix-ghana", label: "Wix alternatives in Ghana" },
      { href: "/alternatives/squarespace-ghana", label: "Squarespace alternatives in Ghana" },
      { href: "/compare/agency-vs-freelancer-vs-in-house-ghana", label: "Agency, freelancer, or hire" },
    ],
    cta: {
      title: "Send the current site",
      body: "Send the current site and what it needs to do next. We will say if GHS 6,000 or GHS 14,500 is the fit.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "alternative",
    slug: "wix-ghana",
    title: "Wix alternatives for businesses in Ghana",
    description:
      "Wix alternatives in Ghana, with a stay-or-move test, a first-year cost, and the redirect steps that keep the pages Google already knows.",
    eyebrow: "Alternatives",
    image: "/images/articles/wix-alternatives-ghana.png",
    imageAlt: "A person at a dark desk turning from a simple site toward a refined one",
    intro:
      "Stay on Wix when it is still a simple site you edit yourself. Move when the site has to match MoMo, show up for a local search, or give you a team in Accra you can call. A five-page replacement starts at GHS 6,000. With a .com and hosting paid each month, the first year is GHS 6,948.",
    sections: [
      {
        heading: "Stay on Wix",
        paragraphs: [
          "Stay when you have a few pages, you like the editor, and you do not take orders that finance must match to Paystack. If nothing about the site is failing, another year of Wix costs less than a move.",
        ],
      },
      {
        heading: "Which alternative fits",
        paragraphs: [
          "Pick the replacement for the job Wix is failing at.",
        ],
        table: {
          caption: "Wix alternatives for a Ghana business",
          columns: ["Alternative", "Choose it when", "You still carry"],
          rows: [
            ["Squarespace", "You want another hosted editor and a template", "The same limit on reconciled Mobile Money"],
            ["WordPress on our hosting", "Your team will publish often and accept plugin updates", "Launch hosting from GHS 69 a month, plus updates"],
            ["Custom OceanCyber site", "You need brand, search, and Paystack or Mobile Money done properly", "A scoped build from GHS 6,000, then hosting"],
          ],
        },
      },
      {
        heading: "What the move costs",
        paragraphs: [
          "A five-page replacement is GHS 6,000 for the build. A .com is GHS 120 for the year. Hosting is GHS 69 a month, which is GHS 828 over twelve months. Year one is GHS 6,948 before photos or extra pages. Paying hosting for the year up front takes 15% off that hosting.",
          "A shop that must match Paystack or MoMo starts at GHS 14,500, usually with hosting at GHS 129 a month. That price includes a way for your team to edit. GHS 6,000 does not.",
        ],
        example: {
          title: "Sites that do not fit Wix",
          paragraphs: [
            "Fitch Advisory is a consulting site with a client login, file sharing, and booking at fitchadvisory.com. That does not come out of Wix cleanly, and it is not a GHS 6,000 site. ThinQ Shopping takes Paystack and MoMo on the phone. The portfolio shows the work. The contract prices stay private.",
          ],
          link: { href: "/guides/website-cost-in-ghana", label: "First-year website cost in Ghana" },
        },
        links: [
          { href: "/portfolio/fitch-advisory", label: "Fitch Advisory project" },
          { href: "/compare/wix-vs-custom-website-ghana", label: "Wix compared with a custom site" },
        ],
      },
      {
        heading: "How to leave without losing the pages Google knows",
        paragraphs: [
          "Google already knows the Wix addresses that bring calls. The new site has to answer those same addresses.",
        ],
        steps: [
          "List every Wix page that gets enquiries or has links from Instagram, WhatsApp, or Google.",
          "Write the matching page on the new site, or a redirect from the old address to the new one.",
          "Launch and test the redirects while the Wix plan is still paid.",
          "Point the domain at the new host only after a test order or a test form succeeds.",
          "Cancel Wix after Search Console shows the new URLs, not on the same afternoon you switch DNS.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the most common reason Ghana businesses leave Wix?",
        answer:
          "Payments and ownership. A payment link is not a checkout that reconciles Mobile Money, and a mature Wix site is awkward to export into another builder.",
      },
      {
        question: "How much does the move cost in the first year?",
        answer:
          "A five-page replacement is GHS 6,948 in year one: GHS 6,000 to build, GHS 120 for a .com, and GHS 828 of Launch hosting if you pay monthly. A store with reconciled payments starts at GHS 14,500 for the build.",
      },
      {
        question: "Can I still edit pages after a custom build?",
        answer:
          "Professional, from GHS 14,500, includes a CMS or light admin. On Startup we place the copy you send.",
      },
    ],
    related: [
      { href: "/compare/wix-vs-custom-website-ghana", label: "Wix vs a custom website" },
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
      { href: "/guides/accept-mobile-money-paystack", label: "Accept Mobile Money" },
    ],
    cta: {
      title: "Plan the move off Wix",
      body: "Share the current Wix URL. We will list what should be rebuilt, redirected, and left behind.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "alternative",
    slug: "squarespace-ghana",
    title: "Squarespace alternatives for businesses in Ghana",
    description:
      "Squarespace alternatives in Ghana: when to keep the template, what a move costs in cedis, and how to keep the URLs that already bring enquiries.",
    eyebrow: "Alternatives",
    image: "/images/articles/squarespace-ghana.png",
    imageAlt: "A dark Accra desk with a printed template magazine and a small plant",
    intro:
      "Keep Squarespace when the template still fits and the site is not how you take payment. Move when you need Paystack or MoMo that finance can match, or pages written for searches in Accra. A five-page replacement is GHS 6,948 in the first year if you pay hosting each month.",
    sections: [
      {
        heading: "Stay on Squarespace",
        paragraphs: [
          "Stay when you are comfortable in the editor, the pages are few, and customers are not paying through a checkout your finance team must match. If the template still does the job, pay the subscription and spend the year on the business.",
        ],
      },
      {
        heading: "Which alternative fits",
        paragraphs: [
          "Squarespace and Wix are the same kind of product. Moving from one to the other changes the editor. It does not give you a Ghana checkout you control.",
        ],
        table: {
          caption: "Squarespace alternatives",
          columns: ["Alternative", "Choose it when", "First cost to plan"],
          rows: [
            ["Wix", "You only want a different hosted editor", "Another monthly builder fee"],
            ["WordPress", "You will publish often and patch plugins", "Hosting from GHS 69 a month"],
            ["Custom site", "The site must take Mobile Money properly or match a brand", "Build from GHS 6,000, year one GHS 6,948 for a five-page site"],
          ],
        },
        links: [{ href: "/alternatives/wix-ghana", label: "Wix alternatives, including the redirect steps" }],
      },
      {
        heading: "What you are buying if you leave",
        paragraphs: [
          "GHS 6,000 replaces a simple Squarespace site: up to five pages, a form, and basic search setup. Add GHS 120 for a .com and GHS 69 a month for hosting. Paid monthly, hosting is GHS 828 for the year, so year one is GHS 6,948.",
          "GHS 14,500 is where the site gets a design drawn for you, a way for your team to edit, and Paystack or MoMo that finance can match. Squarespace handles that by sending people to a payment link.",
        ],
        example: {
          title: "A site a template has to stretch to copy",
          paragraphs: [
            "Fitch Advisory has programmes, a client login, file sharing, and booking. The live site is fitchadvisory.com. Putting that inside a template means dropping the client login or adding tools the template does not match to your books. The portfolio shows what was built. The cost page shows the public prices. The contract price stays private.",
          ],
          link: { href: "/portfolio/fitch-advisory", label: "Fitch Advisory project" },
        },
      },
      {
        heading: "How to move the address",
        paragraphs: [
          "The domain is what people already know. The Squarespace pages are what you either rebuild or send to the new site.",
        ],
        steps: [
          "Export the page list and note which addresses appear on your Google Business Profile, WhatsApp, and email signature.",
          "Build those pages on the new site before you change DNS.",
          "Add a redirect for every old path you will not recreate one-for-one.",
          "Send a test form, and a test payment if you sell, on the new host.",
          "Then point the domain. Cancel Squarespace after the new site answers the old URLs.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can Squarespace take MTN Mobile Money?",
        answer:
          "You can send customers to a payment link. A store that must confirm the webhook, avoid double fulfilment, and match Paystack needs a checkout built for that flow. That checkout is in Professional, from GHS 14,500.",
      },
      {
        question: "Will my Squarespace pages keep their Google positions?",
        answer:
          "They keep their place when the new site uses the same paths or redirects each one. Launch the replacement before you cancel Squarespace. Leave your Google Business Profile on the domain homepage, and link the important inner pages from that homepage.",
      },
      {
        question: "Is WordPress cheaper than a custom site?",
        answer:
          "The monthly line can be. Launch hosting starts at GHS 69. You then maintain plugins and security. A custom Startup build is GHS 6,000 once, plus that same hosting, with the launch work included.",
      },
    ],
    related: [
      { href: "/alternatives/wix-ghana", label: "Wix alternatives" },
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
      { href: "/services/web-design-in-ghana", label: "Web design in Ghana" },
    ],
    cta: {
      title: "Replace Squarespace with a scoped site",
      body: "Send the live URL and the pages that bring enquiries. We will quote the replacement against a package.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "alternative",
    slug: "shopify-ghana",
    title: "Shopify alternatives for stores in Ghana",
    description:
      "Shopify alternatives for Ghana stores: when to stay, what WooCommerce and a custom Paystack build cost, and how to move the catalog without dropping URLs.",
    eyebrow: "Alternatives",
    image: "/images/articles/shopify-alternatives-ghana.png",
    imageAlt: "A Ghana shop packing table with garments, a box, and a tablet",
    intro:
      "Stay on Shopify when the products, discounts, and Paystack app already match how you sell. Move when the apps and the admin cost more than a shop built around how you deliver in Ghana. A custom shop with payments finance can match starts at GHS 14,500.",
    sections: [
      {
        heading: "Stay on Shopify",
        paragraphs: [
          "Stay when the products and delivery rules fit Shopify and the Paystack app covers cards and MoMo. Add the Shopify plan, each paid app, and Paystack’s percentage before you assume a rebuild is cheaper. Copying a shop that Shopify already runs well is a delay.",
        ],
      },
      {
        heading: "Which alternative fits",
        paragraphs: [
          "The other option has to fix a real Shopify limit: hosting you do not control, payments finance cannot match, or delivery rules a theme cannot do.",
        ],
        table: {
          caption: "Shopify alternatives for Ghana",
          columns: ["Alternative", "Choose it when", "Budget anchor"],
          rows: [
            ["Stay on Shopify", "The catalog and Paystack app already work", "Plan plus apps plus Paystack’s fee"],
            ["WooCommerce", "You want WordPress and will patch it", "Grow hosting from GHS 129 a month, plus the build"],
            ["Custom store", "Roles, branches, or reconciliation do not fit the theme", "Professional from GHS 14,500, 6–10 weeks"],
          ],
        },
        links: [{ href: "/compare/shopify-woocommerce-custom-ghana", label: "Full Shopify, WooCommerce, and custom comparison" }],
      },
      {
        heading: "What a custom Ghana store includes",
        paragraphs: [
          "GHS 14,500 covers a design, a product list, Paystack or MoMo that finance can match, and 90 days of support, usually in 6 to 10 weeks. Hosting for that shop is GHS 129 a month, not the GHS 69 plan used for a simple site.",
          "GHS 30,000 is for more than one shop front: staff roles, more than one way to take payment, or a security review. The week-by-week plan is on the timeline page.",
        ],
        example: {
          title: "ThinQ Shopping is this kind of shop",
          paragraphs: [
            "ThinQ Shopping is built for the phone, with products, Paystack, MoMo, and an order desk the shop uses. That is the other path from a theme plus a pile of apps. The project page shows the shop. It does not show the private fee. GHS 14,500 is the public starting price for a shop of this size.",
          ],
          link: { href: "/portfolio/thinq-shopping", label: "ThinQ Shopping project" },
        },
        links: [
          { href: "/guides/ecommerce-website-timeline-ghana", label: "Week-by-week store timeline" },
          { href: "/guides/accept-mobile-money-paystack", label: "How the GHS charge is confirmed" },
        ],
      },
      {
        heading: "How to move the catalog",
        paragraphs: [
          "People and Google should land on the product they already know. Export first. Launch second. Cancel Shopify last.",
        ],
        steps: [
          "Export products, customers, and the URLs that already rank or appear in ads.",
          "Load the catalog on a staging shop and check variants, prices, and photos.",
          "Map each old product URL to the new one, or redirect it.",
          "Run a live Mobile Money test and match it to the Paystack settlement.",
          "Point the domain, then watch orders for a week before you close the Shopify plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can we keep our Shopify products and customers?",
        answer:
          "Yes. Export the catalog and customer records, then map the URLs that already rank before the new store goes live.",
      },
      {
        question: "Which alternative is fastest?",
        answer:
          "WooCommerce is usually faster when the catalog is a standard list of products. A custom Professional store takes 6–10 weeks because checkout, webhooks, and the admin are built for your delivery rules.",
      },
      {
        question: "Will a rebuild cost less than Shopify every month?",
        answer:
          "Only if the Shopify plan plus apps is the pain. The custom build is GHS 14,500 up front, then Grow hosting at GHS 129 a month. Paystack’s fee still applies on both paths, because that fee is the payment rail, not the shop software.",
      },
    ],
    related: [
      { href: "/compare/shopify-woocommerce-custom-ghana", label: "Full platform comparison" },
      { href: "/guides/accept-mobile-money-paystack", label: "Mobile Money and Paystack" },
      { href: "/guides/dwumapos-for-ghana-shops", label: "DwumaPOS for Ghana shops" },
    ],
    cta: {
      title: "Bring the product list",
      body: "Tell us how many products you have, which wallets you take, and what Shopify cannot do today.",
      href: "/get-started",
      label: "Get started",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-for-ghana-shops",
    title: "DwumaPOS for shops in Ghana",
    description:
      "DwumaPOS sells the same products at the counter and on your website. Setting up is free. A 30-day trial starts when you open the shop. Starter is then GHS 149 a month.",
    eyebrow: "POS guide",
    image: "/images/articles/dwumapos-shop-ghana.png",
    imageAlt: "A POS screen, a receipt printer, and a phone on an Accra shop counter",
    intro:
      "DwumaPOS is point-of-sale software for shops in Ghana. Follow one product through the day. You enter it once. At lunch the cashier takes MoMo and cash on that same receipt. Later a customer orders it on your website for pickup, and the stock count goes down once. You do not keep a second price list in WhatsApp. Sign up at dwumapos.com. Support is on that site, on WhatsApp at 054 308 0918, or by email at support@dwumapos.com. A custom website or app from OceanCyber is a separate service.",
    sections: [
      {
        heading: "Start with what you can pack this week",
        paragraphs: [
          "You choose which products appear on the website. Start with the items that leave the shelf every week. Leave complicated sizes, and anything a staff member must explain in person, off the site until the shop is comfortable. Ten honest items are better than two hundred that are already gone.",
          "Use the name customers already ask for, plus the size or colour on the pack. A photo from your own shelf is clearer than a supplier picture of a different pack.",
          "Just Fit Wear GH, a shoe shop in East Legon, keeps each size on that one list. If the pair is not in the shop, it is not for sale online. Lifestyles By Glo, a beauty shop in Accra, uses WhatsApp for advice. The bottles for sale stay on the POS and the website.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/case-study-just-fit-wear-gh",
            label: "Just Fit Wear GH, East Legon",
          },
          {
            href: "https://www.dwumapos.com/resources/case-study-lifestyles-by-glo",
            label: "Lifestyles By Glo, Accra",
          },
          {
            href: "https://www.dwumapos.com/resources/storefront-plus-till-one-catalog",
            label: "Same stock for POS and website",
          },
        ],
      },
      {
        heading: "Sell at the counter",
        paragraphs: [
          "The customer is on the POS, on a phone, a laptop, or a Windows PC, not in a side chat. Add the items, then take MoMo on that sale. One receipt can take cash, card, and MoMo together, so a customer can pay part of the bill with MoMo and the rest in cash. Customers pay with MTN MoMo, Telecel Cash, or AT Money. Telecel Cash is the wallet people still call Vodafone Cash. Connect Paystack or Hubtel under Settings, then Payments. The money stays in your account. DwumaPOS does not hold it.",
          "If a live prompt is slow, do not mark the sale paid a second time. Write three steps on a card by the counter: retry the prompt, cancel the stuck sale, or take cash.",
          "The stock list lives on the POS. Starter is one branch, with unlimited products and three staff accounts. Business covers up to three branches and ten staff. Scale covers up to 50 branches and 200 staff. Each branch can see what is left, and the POS can warn you when an item is running low. Business and Scale include transfers between branches. Cashiers, supervisors, and managers do not all have the same access.",
        ],
        bullets: [
          "Use the phone, laptop, printer, or USB scanner you already have. DwumaPOS does not sell you a POS machine.",
          "A live MoMo prompt needs the internet. Cash, a recorded card payment, a bank transfer, and MoMo you type in by hand can continue on POS Desktop when the network drops.",
        ],
        links: [
          { href: "https://www.dwumapos.com/", label: "DwumaPOS home" },
          {
            href: "https://www.dwumapos.com/solutions/shop-pos-ghana",
            label: "Shop POS details",
          },
          { href: "https://www.dwumapos.com/pricing", label: "DwumaPOS pricing (GHS)" },
        ],
      },
      {
        heading: "The website sells the same stock",
        paragraphs: [
          "You do not build a second stock list for the website. A customer opens your shop link, orders, and chooses pickup or delivery. That order appears in the same list as counter sales, and the stock count goes down once. Train one person to pack website orders at that POS, so close of day is not a second app.",
          "Choose the shop type that matches how you sell. DwumaPOS has setups for restaurants, pharmacies, salons, fashion, grocery, hotels, and more. The shop type changes the tools on the POS and the look of the website. The stock list is still one list. You still choose which of those items the website shows.",
        ],
        links: [
          { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS guide" },
          { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS guide" },
          { href: "https://www.dwumapos.com/solutions", label: "All DwumaPOS solutions" },
        ],
      },
      {
        heading: "Pickup and delivery",
        paragraphs: [
          "At checkout the customer chooses pickup or delivery from the areas you publish. Staff see packing, out for delivery, and ready for pickup on that same order. Your own riders sign in, accept the job, collect it at the shop, and record proof: a photo, the customer’s name, and any cash they collected. Cash on delivery is only for your own riders. When the order is fulfilled, that cash sits on the original sale. It is not a chat total you add at close.",
          "When your riders are busy, you can turn on Dwuma network riders. For those jobs the customer pays by MoMo or card before the rider collects the order. The customer follows a track-order link and sees the rider’s name, phone number, vehicle, and a map. You can also connect a courier, such as Terminal Africa, on your own account. You are not buying bikes from DwumaPOS.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/delivery",
            label: "Shop delivery on DwumaPOS",
          },
          {
            href: "https://www.dwumapos.com/resources/shop-riders-and-dwuma-delivery",
            label: "Riders, Dwuma network, and couriers",
          },
          {
            href: "https://www.dwumapos.com/resources/storefront-plus-till-one-catalog",
            label: "Same stock for POS and website",
          },
        ],
      },
      {
        heading: "When the network drops",
        paragraphs: [
          dwumaOfflineSummary,
          "When the connection returns, open the sales list and confirm the waiting sales uploaded. Check one product that sold during the cut before you trust the website count. A receipt printer you already own, and a lamp or UPS on the PC, matter more than a new machine. Print one test receipt on a quiet afternoon so the night shift is not learning it in the dark.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/offline-pos-desktop",
            label: "What still sells when the network is down",
          },
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you go live",
          },
        ],
      },
      {
        heading: "Close the shift",
        paragraphs: [
          "Close of day is one POS report: cash in the drawer, MoMo that went through on those sales, and card on those sales. A MoMo total on a phone that was never entered on the POS is a second record.",
          "If a live prompt has not succeeded, the sale is not paid. Do not hand the item over, and do not take it off the open list, until your payment rule says it is paid. Pickup orders follow the same rule. The sales report itself needs the internet.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/shift-close-on-the-counter-pos",
            label: "How to close the shift",
          },
        ],
      },
      {
        heading: "What the plans cost",
        paragraphs: [
          dwumaPlanSummary,
          dwumaWebsiteNote,
        ],
        table: dwumaPlanTable,
        links: [{ href: "https://www.dwumapos.com/pricing", label: "DwumaPOS pricing (GHS)" }],
      },
      {
        heading: "Before you open the shop",
        paragraphs: [
          "Create the shop first. The trial does not start until you open it for sales.",
        ],
        steps: [
          "Add the products you can pack this week, with the name customers already use and a photo from the shelf.",
          "Connect Paystack or Hubtel under Settings, then Payments, if you want a live MoMo prompt. You can start with cash and MoMo entered by hand.",
          "Take one MoMo test under GHS 2 at the counter and one website order for the same product.",
          "Put a card by the counter: retry a failed prompt, cancel a stuck sale, or take cash. Do not charge the customer twice.",
          "At close, match the POS report to the drawer, the MoMo that went through, and card. If MoMo is still pending, that sale is not paid yet.",
        ],
        links: [{ href: "https://www.dwumapos.com/start", label: "Start free on DwumaPOS" }],
      },
    ],
    faqs: [
      {
        question: "Is the POS the same thing as the website?",
        answer:
          "No. The POS is the counter. The website is where a customer orders for pickup or delivery. They share one stock list, so a sale in either place reduces the same count.",
      },
      {
        question: "Do I get a website with the POS?",
        answer:
          "Yes. Starter includes the website on yourshop.dwumapos.com. There is no second fee for that site. Business and Scale add your own domain, such as yourshop.com. Pickup and delivery are on every plan.",
      },
      {
        question: "How much is DwumaPOS?",
        answer:
          "Setting up is free. The 30-day trial starts when you open the shop for sales. After that, Starter is GHS 149 a month, Business is GHS 249 a month, and Scale is GHS 399 a month. You can pay monthly or prepay for one to five years. The full grid is on dwumapos.com/pricing, or call 054 308 0918.",
      },
      {
        question: "Does DwumaPOS hold my customers’ MoMo?",
        answer:
          "No. MoMo and card payments go into the Paystack or Hubtel account you connect. The amount you pay DwumaPOS for the software is a separate bill in cedis.",
      },
      {
        question: "Do I need to buy a POS machine?",
        answer:
          "No. Use the phone, laptop, printer, or USB scanner you already have. Install POS Desktop on a Windows PC if you need to keep selling when the network drops.",
      },
      {
        question: "What if the MoMo prompt is slow?",
        answer:
          "Leave the sale open. Retry the prompt, cancel it, or take cash. Do not mark it paid twice, and do not hand the item over while the prompt is still pending.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS (DwumaPOS)" },
      { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS (DwumaPOS)" },
      {
        href: "https://www.dwumapos.com/solutions/delivery",
        label: "Delivery on DwumaPOS",
      },
    ],
    cta: {
      title: "Talk to DwumaPOS",
      body: "WhatsApp 054 308 0918 or email support@dwumapos.com. Open DwumaPOS for the product, or Pricing for the 30-day trial and the GHS plans.",
      href: "https://www.dwumapos.com/",
      label: "Open DwumaPOS",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-restaurant-pos-ghana",
    title: "Restaurant POS on DwumaPOS",
    description:
      "Restaurant POS for cafés, chop bars, and takeaway in Ghana. The kitchen sees the same order the waiter takes, and the website menu uses those dishes. From GHS 149 a month after a 30-day trial.",
    eyebrow: "Restaurant POS",
    image: "/images/articles/dwumapos-restaurant-ghana.png",
    imageAlt: "A restaurant table with a POS tablet, and the kitchen counter where the plates come out",
    intro:
      "DwumaPOS is for chop bars, cafés, and takeaway kitchens in Ghana. Follow one table through service. The waiter names it the way the floor already says it, confirms the order, and the kitchen ticket leaves then, not when the guest asks for the bill. The ticket carries the dish and any change the customer asked for. MoMo, cash, or card closes that same table. A pickup order uses those same dishes, so a finished item does not stay on sale in WhatsApp. Sign up at dwumapos.com. Support is on that site, on WhatsApp at 054 308 0918, or by email at support@dwumapos.com. OceanCyber builds custom restaurant websites and apps separately.",
    sections: [
      {
        heading: "From the table to the kitchen",
        paragraphs: [
          "Each open table is one sale. Name the tables the way floor staff already say them, such as T3 or balcony 2, not a number that only exists on a napkin. If the items live on different notes, the kitchen misses the change the customer asked for.",
          "Send the kitchen ticket when the waiter confirms the order, not when the guest asks for the bill. The ticket shows those items and any change, so the pass is not guessing from a shout.",
          "At the end of the meal, MoMo, cash, or card closes that same ticket. Split the bill on the POS. A second handwritten bill puts the food and the money in two places.",
        ],
        steps: [
          "The waiter opens the table on the POS and confirms the order.",
          "The kitchen ticket goes out then, with the dish and any change.",
          "The customer pays MoMo, cash, or card on that same ticket.",
          "Pickup and rider orders for the same dishes appear on the POS.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/restaurant-pos-ghana",
            label: "Restaurant POS on DwumaPOS",
          },
          {
            href: "https://www.dwumapos.com/resources/restaurant-kot-and-tables",
            label: "Tables and kitchen tickets guide",
          },
        ],
      },
      {
        heading: "One menu for the counter and the website",
        paragraphs: [
          "Many kitchens sell on the POS and still keep a second menu in WhatsApp. When a dish runs out, it can still appear on the phone, so you accept an order you cannot cook. On DwumaPOS the website menu is the same product list as the POS. A pickup or rider order appears on the POS, and the stock count goes down once.",
          "This guide is for food: tables, kitchen tickets, and takeaway. If you also sell rooms, use the hotels and guesthouses setup. That setup puts the room bill and the restaurant on one POS.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/hotel-pos-ghana",
            label: "Hotel POS (rooms + restaurant)",
          },
        ],
      },
      {
        heading: "When the network drops at dinner",
        paragraphs: [
          dwumaOfflineSummary,
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you go live",
          },
        ],
      },
      {
        heading: "Pickup and delivery",
        paragraphs: [
          "Pickup and rider orders use the dishes the kitchen already cooks. Your own riders collect the order, hand it over, and record a photo, the customer’s name, and any cash. Cash on delivery is only for your own riders, and that cash sits on the original ticket when the order is fulfilled. When they are busy, you can turn on Dwuma network riders. For those jobs the customer pays by MoMo or card before the rider collects the food, then follows a track-order link with the rider’s name, phone number, and a map.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/delivery",
            label: "Shop delivery on DwumaPOS",
          },
          {
            href: "https://www.dwumapos.com/pricing",
            label: "DwumaPOS pricing",
          },
        ],
      },
      {
        heading: "Close of night",
        paragraphs: [
          "One report should show the covers, the voids, the comps, and what riders collected. If those numbers still live in three notebooks, the kitchen tickets are not finished yet. A live MoMo prompt that has not succeeded is not paid. Do not mark the food as paid, and do not clear the table’s sale, until your payment rule says it is paid.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/shift-close-on-the-counter-pos",
            label: "How to close the shift",
          },
        ],
      },
      {
        heading: "What a restaurant pays",
        paragraphs: [
          "Restaurants use the same plans as other shops. " + dwumaPlanSummary,
          dwumaWebsiteNote,
        ],
        table: dwumaPlanTable,
        links: [
          { href: "/guides/dwumapos-for-ghana-shops", label: "Full shop guide" },
          { href: "https://www.dwumapos.com/pricing", label: "DwumaPOS pricing (GHS)" },
        ],
      },
      {
        heading: "Before the first service",
        paragraphs: [
          "Create the shop first. The trial does not start until you open it for sales.",
        ],
        steps: [
          "Add the dishes once, with prices, and name the tables the way the floor already says them.",
          "Send one test order to the kitchen as soon as you confirm it. Close it with a MoMo test under GHS 2.",
          "Place one website order for the same dish and confirm it appears on the POS.",
          "At close of night, match covers, voids, MoMo that went through, cash, and rider cash. If MoMo is still pending, do not mark the food as paid.",
        ],
        links: [{ href: "https://www.dwumapos.com/start", label: "Start free on DwumaPOS" }],
      },
    ],
    faqs: [
      {
        question: "Can the customer order without WhatsApp?",
        answer:
          "Yes. The website menu uses the same dishes as the POS. The customer chooses pickup or a rider, and that order appears on the POS.",
      },
      {
        question: "Does this POS also sell hotel rooms?",
        answer:
          "No. This guide is tables, kitchen tickets, and takeaway. Rooms, and a guest bill that includes food, use the hotel POS setup.",
      },
      {
        question: "How much is the restaurant POS?",
        answer:
          "The plans are the same as for other shops. Setting up is free. A 30-day trial starts when you open the shop for sales. Then Starter is GHS 149 a month, Business is GHS 249 a month, and Scale is GHS 399 a month.",
      },
      {
        question: "Who do I call about the POS?",
        answer: "Call DwumaPOS on 054 308 0918, or email support@dwumapos.com.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-for-ghana-shops", label: "POS for Ghana shops" },
      { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS" },
    ],
    cta: {
      title: "See the restaurant POS",
      body: "Tables, kitchen tickets, and MoMo on one sale. WhatsApp 054 308 0918 or email support@dwumapos.com.",
      href: "https://www.dwumapos.com/solutions/restaurant-pos-ghana",
      label: "Open restaurant POS",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-pharmacy-pos-ghana",
    title: "Pharmacy POS on DwumaPOS",
    description:
      "Pharmacy POS for pharmacies and chemical shops in Ghana. Record the batch and expiry, sell the earliest expiry first, and take MoMo on that sale. From GHS 149 a month after a 30-day trial.",
    eyebrow: "Pharmacy POS",
    image: "/images/articles/dwumapos-pharmacy-ghana.png",
    imageAlt: "A calm pharmacy counter with plain boxes, a scanner, and a POS screen",
    intro:
      "DwumaPOS is for pharmacies and chemical shops in Ghana. Follow one carton through the shop. It arrives in the morning, and you write the batch and the expiry date before the packs reach the shelf. At the counter, the sale offers the batch that expires first. Staff can choose another batch. An expired batch stays off the sale. You check what is close to expiry on the batches list, not from a popup when you scan. Everyday medicines can be ordered on the website from that same stock. A prescription item needs an approved prescription on the order. Sign up at dwumapos.com. Support is on that site, on WhatsApp at 054 308 0918, or by email at support@dwumapos.com. For custom healthcare software from OceanCyber, see the healthcare industry page.",
    sections: [
      {
        heading: "Record the batch when stock arrives",
        paragraphs: [
          "Write the batch and the expiry date when the stock arrives, before it hits the shelf. Skipping that step makes a later recall a search through the shop. The batches list then shows expired stock, and stock expiring within 30, 60, or 90 days. Those windows are expiry dates, not the software trial. The POS does not pop up a warning when you scan.",
          "When a product has batches, the sale starts with the one that expires first. Staff confirm the batch, and they can pick another. Expired batches stay off the sale. That block is on by default.",
          "Everyday medicines can sit on your website from the same stock. A prescription item needs an approved prescription on the order. The pharmacist still handles that approval. When the order is fulfilled, the sale uses the batch that expires first, the same way as the counter. One box cannot sell at the counter and again on WhatsApp.",
        ],
        steps: [
          "Receive the stock and record the batch and expiry before it reaches the shelf.",
          "Sell at the counter. Confirm the batch that expires first, or pick another that has not expired.",
          "Review the batches list for items expiring in 30, 60, or 90 days. Do not wait for a warning on the scan.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/pharmacy-pos-ghana",
            label: "Pharmacy POS on DwumaPOS",
          },
          {
            href: "https://www.dwumapos.com/resources/pharmacy-batch-expiry-basics",
            label: "Batch and expiry basics",
          },
          {
            href: "/industries/healthcare",
            label: "Healthcare software from OceanCyber",
          },
        ],
      },
      {
        heading: "MoMo, cash, and the rider on one sale",
        paragraphs: [
          "Customers can pay by MoMo, cash, or card on the POS. That money goes into the Paystack or Hubtel account you connect. DwumaPOS does not hold it.",
          "If a rider delivers an everyday medicine, the cash they collect is written on the delivery proof. When that order is fulfilled, the payment is on the original sale, and the medicine still comes from the recorded batch.",
          "GRA e-VAT can go out when a completed sale includes the buyer’s TIN, after that sale has uploaded. A walk-in receipt with no buyer TIN is not sent. DwumaPOS does not register you with GRA. Ask your pharmacist or accountant whether you need it. This page is not tax advice.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you go live",
          },
          {
            href: "https://www.dwumapos.com/resources/pharmacy-expiry-at-the-counter-pos",
            label: "Batch expiry at the counter",
          },
          {
            href: "https://www.dwumapos.com/resources/gra-evat-on-the-pos",
            label: "GRA e-VAT on the POS",
          },
        ],
      },
      {
        heading: "Website orders and delivery",
        paragraphs: [
          "Everyday medicines can be ordered on your DwumaPOS website. Your rider delivers that order. Cash they collect is recorded on the delivery proof, then on the original sale when the order is fulfilled. The medicine comes from the same batch stock, and the fulfilled order takes the batch that expires first.",
          "Your own riders can take cash on delivery. Dwuma network riders are for when your riders are busy, and those customers pay by MoMo or card before collection. The customer follows a track-order link and sees the rider’s name, phone number, and a map.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/delivery",
            label: "Shop delivery on DwumaPOS",
          },
          {
            href: "https://www.dwumapos.com/pricing",
            label: "DwumaPOS pricing",
          },
        ],
      },
      {
        heading: "When the network drops",
        paragraphs: [dwumaOfflineSummary],
        links: [
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you go live",
          },
        ],
      },
      {
        heading: "What a pharmacy pays",
        paragraphs: [
          "Pharmacies use the same plans as other shops. " + dwumaPlanSummary,
          dwumaWebsiteNote,
        ],
        table: dwumaPlanTable,
        links: [
          { href: "/guides/dwumapos-for-ghana-shops", label: "Full shop guide" },
          { href: "https://www.dwumapos.com/pricing", label: "DwumaPOS pricing (GHS)" },
        ],
      },
      {
        heading: "Before you offer delivery",
        paragraphs: [
          "Create the shop first. The trial does not start until you open it for sales.",
        ],
        steps: [
          "Record a batch and an expiry date for one item, then sell it at the counter and confirm the earliest batch.",
          "Take one MoMo test under GHS 2 on the POS and one website order for the same everyday medicine.",
          "If a rider collects cash, confirm it is on the original sale when the order is fulfilled, before you close the day.",
          "If MoMo is still pending, that sale is not paid yet. Do not hand the pack over.",
        ],
        links: [{ href: "https://www.dwumapos.com/start", label: "Start free on DwumaPOS" }],
      },
    ],
    faqs: [
      {
        question: "Can a prescription go on the website?",
        answer:
          "Everyday medicines can. A prescription item needs an approved prescription on the order. The pharmacist still handles that approval. When the order is fulfilled, the sale uses the batch that expires first, the same way as the counter.",
      },
      {
        question: "What if the rider takes cash?",
        answer:
          "The rider records the cash on the delivery proof. When the order is fulfilled, that payment is on the original sale. The medicine still comes from the recorded batch, and an expired batch stays off the sale.",
      },
      {
        question: "How much is the pharmacy POS?",
        answer:
          "The plans are the same as for other shops. Setting up is free. A 30-day trial starts when you open the shop for sales. Then Starter is GHS 149 a month, Business is GHS 249 a month, and Scale is GHS 399 a month.",
      },
      {
        question: "Who do I call about the POS?",
        answer: "Call DwumaPOS on 054 308 0918, or email support@dwumapos.com.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-for-ghana-shops", label: "POS for Ghana shops" },
      { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS" },
    ],
    cta: {
      title: "See the pharmacy POS",
      body: "Batch, expiry, and MoMo on the same sale. WhatsApp 054 308 0918 or email support@dwumapos.com.",
      href: "https://www.dwumapos.com/solutions/pharmacy-pos-ghana",
      label: "Open pharmacy POS",
    },
  },
  {
    kind: "guide",
    slug: "domain-prices-in-ghana",
    title: "Domain prices in Ghana (GHS list)",
    description:
      "What a domain costs in Ghana in 2026: .com from GHS 120/yr, .africa from GHS 100/yr, and other TLD list prices in cedis. Search and pay with Paystack.",
    eyebrow: "Domain guide",
    image: "/images/articles/website-cost-ghana.png",
    imageAlt: "Domain name pricing notes next to cedis on an Accra desk",
    intro:
      "Domain list prices on OceanCyber are in Ghana cedis. A .com is GHS 120 a year. .africa is GHS 100 a year. .org is GHS 99 a year. Live availability and the final checkout total are confirmed when you search.",
    sections: [
      {
        heading: "Popular extensions, per year",
        paragraphs: [
          "These are marketing list prices. The search tool and cart show the live total before you pay with Paystack.",
        ],
        table: {
          caption: "OceanCyber domain list prices (GHS / year)",
          columns: ["Extension", "From (GHS / year)", "Notes"],
          rows: [
            [".com", "120", "Default for most Ghana businesses"],
            [".africa", "100", "Regional brand option"],
            [".org", "99", "Non-profits and associations"],
            [".net", "140", "Network and tech brands"],
            [".info", "45", "Low-cost alternative TLD"],
            [".io", "450", "Product and startup brands"],
          ],
        },
        links: [{ href: "/domains", label: "Search a domain" }],
      },
      {
        heading: "What is not in the domain price",
        paragraphs: [
          "The yearly domain fee is only registration (and renewal). Hosting, email, and a commercial SSL certificate are separate lines.",
          "On OceanCyber hosting, Let’s Encrypt SSL is included free. PositiveSSL starts at GHS 45 a year when you want a named commercial cert.",
        ],
        links: [
          { href: "/hosting", label: "Hosting from GHS 69/mo" },
          { href: "/ssl", label: "SSL certificates" },
          { href: "/guides/web-hosting-cost-in-ghana", label: "Hosting cost guide" },
        ],
      },
      {
        heading: "First-year stack example",
        paragraphs: [
          "A common SME launch is a .com (GHS 120), Launch hosting (GHS 69 a month), and free Let’s Encrypt. Paid monthly, that is about GHS 948 in the first year before the website build.",
          "Add PositiveSSL (GHS 45) only if you need a commercial certificate instead of Let’s Encrypt.",
        ],
        links: [{ href: "/domains", label: "Start with a domain search" }],
      },
    ],
    faqs: [
      {
        question: "Do you bill domains in cedis?",
        answer:
          "Yes. List prices and Paystack checkout are in Ghana cedis.",
      },
      {
        question: "Is privacy included?",
        answer:
          "Domain privacy is included as a required cart line at GHS 0 on standard registrations.",
      },
      {
        question: "Can Accra support help with DNS?",
        answer:
          "Yes. After registration we help point DNS to OceanCyber hosting or your existing host.",
      },
    ],
    related: [
      { href: "/domains", label: "Buy a domain" },
      { href: "/guides/web-hosting-cost-in-ghana", label: "Hosting cost in Ghana" },
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
    ],
    cta: {
      title: "Search your name",
      body: "Check availability, then add hosting or SSL before checkout.",
      href: "/domains",
      label: "Open domain search",
    },
  },
  {
    kind: "guide",
    slug: "web-hosting-cost-in-ghana",
    title: "Web hosting cost in Ghana (GHS)",
    description:
      "What web hosting costs in Ghana in 2026: Launch GHS 69/mo, Grow GHS 129/mo, Scale GHS 249/mo. First-year totals, SSL, and Accra support.",
    eyebrow: "Hosting guide",
    image: "/images/articles/website-cost-ghana.png",
    imageAlt: "Hosting plan notes and cedis beside a laptop in Accra",
    intro:
      "OceanCyber cPanel hosting starts at GHS 69 a month for Launch. Grow is GHS 129 a month. Scale is GHS 249 a month. Annual billing takes 15%, 18%, or 20% off. Let’s Encrypt SSL is free on every plan.",
    sections: [
      {
        heading: "The three plans",
        paragraphs: [
          "Prices are in Ghana cedis. Paystack accepts card and Mobile Money.",
        ],
        table: {
          caption: "Hosting list prices (GHS)",
          columns: ["Plan", "Monthly", "Annual discount", "Best for"],
          rows: [
            ["Launch", "69", "15%", "One business site"],
            ["Grow", "129", "18%", "Shop or several sites"],
            ["Scale", "249", "20%", "Agencies and larger pools"],
          ],
        },
        links: [{ href: "/hosting", label: "Compare hosting packages" }],
      },
      {
        heading: "What each Launch month includes",
        paragraphs: [
          "One isolated cPanel account, 25 GB SSD, unmetered bandwidth on fair use, free Let’s Encrypt SSL, 15 mailboxes, Softaculous, and weekly backups with restore support.",
        ],
        bullets: [
          "Grow raises storage and account count for shops and multi-site owners",
          "Scale is for agencies and organisations that need a larger WHM pool",
          "Commercial PositiveSSL is optional from GHS 45/yr if you do not want Let’s Encrypt alone",
        ],
        links: [{ href: "/ssl", label: "SSL certificate options" }],
      },
      {
        heading: "First-year hosting totals",
        paragraphs: [
          "Launch paid monthly is GHS 828 in the first year. With the 15% annual discount it is about GHS 704 when you pay the year up front.",
          "Add a .com at GHS 120 if you also register the domain with us. Website build packages are separate — see the website cost guide.",
        ],
        links: [
          { href: "/guides/domain-prices-in-ghana", label: "Domain prices in Ghana" },
          { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
        ],
      },
    ],
    faqs: [
      {
        question: "Is SSL included?",
        answer:
          "Yes. Let’s Encrypt is free on Launch, Grow, and Scale. Buy PositiveSSL or EV only when you need a named commercial certificate.",
      },
      {
        question: "Do you support from Accra?",
        answer:
          "Yes. Provisioning and DNS help run from the Accra office at 47 Nii Kwashiefio Avenue.",
      },
      {
        question: "Can I move an existing site?",
        answer:
          "Grow and Scale include migration help. Launch migrations are quoted if the site is large or on a non-standard stack.",
      },
    ],
    related: [
      { href: "/hosting", label: "Buy hosting" },
      { href: "/guides/domain-prices-in-ghana", label: "Domain prices in Ghana" },
      { href: "/ssl", label: "SSL certificates" },
    ],
    cta: {
      title: "Pick a hosting plan",
      body: "Compare Launch, Grow, and Scale, then add a domain if you still need one.",
      href: "/hosting",
      label: "Open hosting",
    },
  },
];

export function intentPagesByKind(kind: IntentKind): IntentPage[] {
  return intentPages.filter((page) => page.kind === kind);
}

export function getIntentPage(kind: IntentKind, slug: string): IntentPage | undefined {
  return intentPages.find((page) => page.kind === kind && page.slug === slug);
}

export function intentArticleMetadata(kind: IntentKind, slug: string): Metadata {
  const page = getIntentPage(kind, slug);
  if (!page) return { title: "Page not found" };
  const path = intentPagePath(page);
  return withCanonical(
    {
      title: page.title,
      description: page.description,
      openGraph: {
        title: page.title,
        description: page.description,
        type: "article",
        url: path,
        images: [{ url: page.image, alt: page.imageAlt }],
      },
    },
    path,
  );
}

export function searchIntentPages(query: string): IntentLink[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  return intentPages
    .filter((page) => {
      const haystack = `${page.title} ${page.description} ${page.intro}`.toLowerCase();
      return haystack.includes(needle);
    })
    .slice(0, 4)
    .map((page) => ({ href: intentPagePath(page), label: page.title }));
}

export function intentSitemapPaths(): string[] {
  const hubs = (Object.keys(intentKindMeta) as IntentKind[]).map(
    (kind) => intentKindMeta[kind].path,
  );
  return [...hubs, ...intentPages.map((page) => intentPagePath(page))];
}
