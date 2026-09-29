import type { Metadata } from "next";
import { withCanonical } from "@/lib/seo/canonical";

export type IntentKind = "guide" | "compare" | "alternative";

export const intentPagesUpdated = "2026-09-29";
export const intentPagesUpdatedLabel = "September 2026";

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
      "Practical answers on website cost, Mobile Money checkout, ecommerce timelines, the Ghana Data Protection Act, and DwumaPOS for Ghana shops.",
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
      { href: "/alternatives/shopify-ghana", label: "Shopify alternatives in Ghana" },
      { href: "/guides/ecommerce-website-timeline-ghana", label: "Ecommerce timelines" },
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
      { href: "/guides/website-cost-in-ghana", label: "Website cost in Ghana" },
      { href: "/compare/shopify-woocommerce-custom-ghana", label: "Shopify, WooCommerce, or custom" },
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
      { href: "/products/pos", label: "OceanCyber POS for in-person sales" },
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
      "DwumaPOS gives a Ghana shop three things together: the POS, the website, and delivery. The products are typed once.",
    eyebrow: "POS",
    image: "/images/articles/dwumapos-shop-ghana.png",
    imageAlt: "A POS screen, a receipt printer, and a phone on an Accra shop counter",
    intro:
      "DwumaPOS is the POS, the website, and delivery for the shop. The cashier sells on the POS. The customer orders those same products on the website. A rider delivers that order. You type the products once.",
    sections: [
      {
        heading: "What you do on the POS",
        paragraphs: [
          "Your cashier sells on a phone, a laptop, or a Windows computer. Cash, card, and MoMo can go on one sale, including a split payment. The money settles into your own MoMo, Paystack, or Hubtel account.",
          "Stock is on the POS. If you have more than one branch, each branch sees what is left, and the POS warns you when an item is low. The cashier, the supervisor, and the manager do not all have the same access.",
          "If the network drops, the POS on a Windows computer keeps selling. Those sales stay on that computer and upload when the connection is back. It prints on the thermal printer you already have, 58mm or 80mm, and it can use your USB scanner. You can start free. You do not need a card to open an account.",
        ],
        links: [
          { href: "https://www.dwumapos.com/", label: "DwumaPOS" },
          { href: "https://www.dwumapos.com/solutions", label: "POS pages for Ghana shops" },
        ],
      },
      {
        heading: "The website uses the POS products",
        paragraphs: [
          "The website is not a second list. A customer can open your shop link, order, and choose pickup or a rider. The order is the same sale the POS already knows. You are not copying prices into WhatsApp.",
          "DwumaPOS has POS pages for restaurants, pharmacies, supermarkets, salons, fashion, grocery, and hotels. The restaurant POS and the pharmacy POS are the two we explain below.",
        ],
        links: [
          { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS" },
          { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS" },
        ],
      },
      {
        heading: "Delivery is the same order",
        paragraphs: [
          "On the website the customer chooses pickup or delivery. Your own riders take the job: they accept it, collect the item at the shop, and take a photo when they hand it over. Cash on delivery stays with those riders.",
          "If your riders are busy, you can let Dwuma riders take the extra jobs. Those riders are paid by MoMo or card before they go. Cash on delivery stays with your own riders. The customer sees the rider’s name, phone, and a map on the order. You can also connect a courier you already use, such as Terminal Africa, with your own account.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/shop-riders-and-dwuma-delivery",
            label: "How DwumaPOS delivery works",
          },
          {
            href: "https://www.dwumapos.com/resources/storefront-plus-till-one-catalog",
            label: "One product list for the POS and the website",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Is the POS the same thing as the website?",
        answer:
          "On DwumaPOS, the POS and the website share one product list. The POS is where the cashier sells. The website is where a customer orders those same products.",
      },
      {
        question: "Do I get a website and delivery with the POS?",
        answer:
          "Yes. The POS, the website, and delivery are DwumaPOS. The customer orders on the website. Your rider, or a Dwuma rider, delivers that order.",
      },
      {
        question: "How much is DwumaPOS?",
        answer:
          "You can start free. Check the current plans on dwumapos.com. Call them on 054 308 0918.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS" },
      { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS" },
      {
        href: "https://www.dwumapos.com/resources/shop-riders-and-dwuma-delivery",
        label: "Delivery on DwumaPOS",
      },
    ],
    cta: {
      title: "Talk to DwumaPOS about the POS",
      body: "WhatsApp 054 308 0918. Email support@dwumapos.com.",
      href: "https://www.dwumapos.com/",
      label: "Open DwumaPOS",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-restaurant-pos-ghana",
    title: "Restaurant POS on DwumaPOS",
    description:
      "A restaurant POS for Ghana cafés, chop bars, and takeaway. Tables, kitchen tickets, MoMo and cash on one sale, and a menu online from the same products.",
    eyebrow: "Restaurant POS",
    image: "/images/articles/dwumapos-restaurant-ghana.png",
    imageAlt: "A restaurant table with a POS tablet and the kitchen pass behind it",
    intro:
      "In a restaurant, the POS is more than a receipt. The waiter takes the order on the POS, the kitchen sees that order, and the customer pays MoMo or cash on it. DwumaPOS does that for cafés, chop bars, hotel restaurants, and takeaway.",
    sections: [
      {
        heading: "The kitchen sees the POS order",
        paragraphs: [
          "You set up your tables on the POS. When the waiter confirms the order, the kitchen ticket prints with the same items, including the changes the customer asked for. You are not shouting the order across the room, and you are not hoping a paper slip arrived.",
          "At the end of the meal, MoMo, cash, or card is taken on that same order. Close of day is one report: what was served, what was cancelled, and what the riders collected.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/restaurant-pos-ghana",
            label: "Restaurant POS on DwumaPOS",
          },
        ],
      },
      {
        heading: "Takeaway stops living on WhatsApp",
        paragraphs: [
          "A lot of kitchens cook from the POS and also keep a second list in WhatsApp. The item that just finished in the kitchen is still on the phone, so you sell it again. On DwumaPOS the online menu is the POS product list. A pickup or rider order shows up on the POS. The customer can see who is bringing the food.",
          "If the building also sells rooms, that is a different DwumaPOS setup, hotels and guesthouses. This one is for the food.",
        ],
      },
      {
        heading: "When the network drops at dinner",
        paragraphs: [
          "Put the POS on a Windows computer if dinner has to continue when the fibre or the light goes. Sales stay on that computer and upload later. A POS that only works in the browser stops when the network stops.",
          "Before you open, take one small MoMo payment on the POS and one small order on the website for the same dish. At close, the MoMo payments should match the cash and card. If a MoMo payment is still pending, do not mark the food as paid. DwumaPOS wrote a short checklist for that.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you open",
          },
        ],
      },
      {
        heading: "Who brings the food",
        paragraphs: [
          "Your own riders collect the order and hand it to the customer. If they are busy, Dwuma riders can take the extra trips. Those riders are paid by MoMo or card. Cash on delivery stays with your own riders. The customer sees the rider’s name, phone, and a map.",
          "The POS, the menu website, and delivery are all DwumaPOS. Call them on 054 308 0918.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/shop-riders-and-dwuma-delivery",
            label: "Riders and delivery",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can the customer order without WhatsApp?",
        answer:
          "Yes. The menu on the website is the same products as the POS. They choose pickup or a rider, and that order is on the POS.",
      },
      {
        question: "Does this POS also sell hotel rooms?",
        answer:
          "Food and rooms are separate on DwumaPOS. This POS is tables, kitchen tickets, and takeaway. Rooms are the hotels and guesthouses setup.",
      },
      {
        question: "Who do I call about the POS?",
        answer: "DwumaPOS on 054 308 0918, or support@dwumapos.com.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-for-ghana-shops", label: "POS for Ghana shops" },
      { href: "/guides/dwumapos-pharmacy-pos-ghana", label: "Pharmacy POS" },
    ],
    cta: {
      title: "See the restaurant POS",
      body: "Tables, kitchen tickets, and MoMo on one sale.",
      href: "https://www.dwumapos.com/solutions/restaurant-pos-ghana",
      label: "Open the restaurant POS",
    },
  },
  {
    kind: "guide",
    slug: "dwumapos-pharmacy-pos-ghana",
    title: "Pharmacy POS on DwumaPOS",
    description:
      "A pharmacy POS for Ghana pharmacies and chemical shops. The POS records the batch and expiry, warns you before a medicine expires, and sells MoMo on that same sale.",
    eyebrow: "Pharmacy POS",
    image: "/images/articles/dwumapos-pharmacy-ghana.png",
    imageAlt: "A calm pharmacy counter with plain boxes, a scanner, and a POS screen",
    intro:
      "A pharmacy POS has to know which box you sold. DwumaPOS asks for the batch and the expiry date when the medicine arrives. At the POS, it warns you if that batch is close to expiry, and it sells the one that expires first.",
    sections: [
      {
        heading: "The POS knows the batch",
        paragraphs: [
          "When stock comes in, you enter the batch and the expiry before it goes on the shelf. When the cashier scans it, the POS tells them if it is near expiry. You are not walking the shelf at the end of the month to guess.",
          "Prescriptions stay with the pharmacist. Medicines people can buy without a prescription can also be on your website. The website uses the same stock as the POS, so the last box is not sold twice, once at the counter and once on WhatsApp.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/solutions/pharmacy-pos-ghana",
            label: "Pharmacy POS on DwumaPOS",
          },
        ],
      },
      {
        heading: "MoMo and the rider sit on the POS sale",
        paragraphs: [
          "The customer can pay MoMo, cash, or card on the POS. If a rider takes an over-the-counter order, the cash they collect is recorded on that sale. It is the same stock the POS already reduced.",
          "If you need a GRA e-VAT invoice, turn on the Ghana tax setting in the POS. Ask your pharmacist or your accountant whether you need it. This page is not tax advice.",
          "Before you tell customers you deliver, take one MoMo payment on the POS and one website order for the same item. If MoMo is still pending, the sale is not paid yet. DwumaPOS has a short checklist for that test.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/ghana-momo-pos-checklist",
            label: "MoMo checklist before you open",
          },
        ],
      },
      {
        heading: "The website and the rider",
        paragraphs: [
          "Medicines that do not need a prescription can be ordered on the DwumaPOS website. Your rider delivers that order, and any cash they collect is written on the POS sale. The batch comes off the same stock.",
          "The POS, the website, and delivery are DwumaPOS. Call them on 054 308 0918, or email support@dwumapos.com.",
        ],
        links: [
          {
            href: "https://www.dwumapos.com/resources/shop-riders-and-dwuma-delivery",
            label: "Riders and delivery",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can I sell a prescription on the website?",
        answer:
          "Prescriptions stay with the pharmacist. Medicines that do not need a prescription can be on the website, from the same stock as the POS.",
      },
      {
        question: "What if the rider takes cash?",
        answer: "Record that cash on the POS sale. The stock comes off the same batch.",
      },
      {
        question: "Who do I call about the POS?",
        answer: "DwumaPOS on 054 308 0918, or support@dwumapos.com.",
      },
    ],
    related: [
      { href: "/guides/dwumapos-for-ghana-shops", label: "POS for Ghana shops" },
      { href: "/guides/dwumapos-restaurant-pos-ghana", label: "Restaurant POS" },
    ],
    cta: {
      title: "See the pharmacy POS",
      body: "Batch, expiry, and MoMo on the sale. WhatsApp DwumaPOS on 054 308 0918.",
      href: "https://www.dwumapos.com/solutions/pharmacy-pos-ghana",
      label: "Open the pharmacy POS",
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
