export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Editorial body shown on the article page. */
  paragraphs: string[];
  image: string;
  category: string;
  date: string;
  readTime: string;
};

export const insightCategories = [
  "All",
  "Security",
  "Technology",
  "Finance",
  "Business",
  "Innovation",
  "Compliance",
] as const;

const VALID_FILTER_CATEGORIES = new Set<string>(
  insightCategories.filter(
    (c): c is Exclude<(typeof insightCategories)[number], "All"> => c !== "All",
  ),
);

export const insightPosts: InsightPost[] = [
  {
    slug: "future-cybersecurity-africa",
    title: "The Future of Cybersecurity in Africa",
    excerpt:
      "Exploring the evolving cybersecurity landscape across African nations and the unique challenges and opportunities that lie ahead.",
    paragraphs: [
      "Africa’s digital economies are expanding faster than many legacy security programs can absorb. That gap shows up as phishing-driven fraud, ransomware targeting SMEs, and inconsistent visibility into cloud and mobile-first stacks.",
      "National frameworks and sector regulators are maturing, but execution still varies by industry and company size. The teams that win treat security as a product discipline: measurable controls, incident playbooks, and executive-level accountability—not checkbox audits alone.",
      "For leaders shipping software or operating critical services, the practical sequence is risk prioritization, identity and endpoint hygiene, logging that supports investigation, and vendor oversight that matches how data actually flows.",
    ],
    image: "/images/EGP Ghana.webp",
    category: "Security",
    date: "March 15, 2024",
    readTime: "5 min read",
  },
  {
    slug: "digital-transformation-ghana",
    title: "Digital Transformation: A Ghanaian Perspective",
    excerpt:
      "How businesses in Ghana are embracing digital transformation to stay competitive in the global market.",
    paragraphs: [
      "Transformation in Ghana often begins with customer-facing channels—payments, ordering, and service delivery—while back-office systems catch up. That sequencing is sensible when revenue pressure is immediate, but it can create integration debt if core data models stay fragmented.",
      "High-performing teams align roadmaps around a few measurable outcomes: shorter fulfillment cycles, fewer manual reconciliations, and clearer ownership between business and engineering.",
      "Partnerships matter. Local regulatory context, telco and banking rails, and real-world connectivity constraints should inform architecture choices early—not after launch.",
    ],
    image: "/images/Fitch Advisory.webp",
    category: "Technology",
    date: "March 10, 2024",
    readTime: "7 min read",
  },
  {
    slug: "fintech-banking-unbanked",
    title: "Fintech Revolution: Banking the Unbanked",
    excerpt:
      "Examining how fintech solutions are bringing financial services to underserved communities across Africa.",
    paragraphs: [
      "Mobile money demonstrated that reliable rails plus simple UX can move inclusion faster than traditional branch expansion. The next wave layers credit, savings, and business tools on those same habits—often with stricter fraud expectations.",
      "Building for underserved users means designing for intermittent connectivity, shared devices, and support channels that do not assume desktop literacy. Interfaces must build trust step by step.",
      "Compliance and partnership governance are not overhead—they protect users and keep programs durable when volumes spike or regulation shifts.",
    ],
    image: "/images/Juelle Hair.webp",
    category: "Finance",
    date: "March 5, 2024",
    readTime: "6 min read",
  },
  {
    slug: "ecommerce-emerging-markets",
    title: "E-commerce Growth in Emerging Markets",
    excerpt:
      "Strategies for success in the rapidly growing e-commerce sector across emerging African economies.",
    paragraphs: [
      "Growth is rarely limited by storefront templates—it is constrained by logistics, returns, payments acceptance, and honest merchandising. Operators who map the full journey beat those who optimize ads alone.",
      "Checkout friction remains the silent killer: carrier-defined delivery expectations, cash versus digital incentives, and clear duty or fee disclosure matter more than marginal conversion tweaks.",
      "Inventory and supplier coordination systems become the bottleneck at scale. Investing early in operational visibility pays off when traffic spikes during campaigns.",
    ],
    image: "/images/Tour World Tourism.webp",
    category: "Business",
    date: "February 28, 2024",
    readTime: "8 min read",
  },
  {
    slug: "ai-ml-practical",
    title: "AI and Machine Learning: Practical Applications",
    excerpt:
      "Real-world applications of AI and ML technologies that are transforming industries today.",
    paragraphs: [
      "Useful ML deployments start with a decision pipeline: what input data exists, what decision it supports, and how errors show up to customers or staff. Without that clarity, models become demos.",
      "Document extraction, support triage, forecasting, and ranking are common early wins because evaluation is straightforward and humans remain in the loop during rollout.",
      "Responsible rollout includes monitoring drift, documenting limitations, and avoiding features that infer sensitive attributes without governance. Shipping fast still requires audit trails.",
    ],
    image: "/images/Africa Trade Chamber.webp",
    category: "Innovation",
    date: "February 20, 2024",
    readTime: "10 min read",
  },
  {
    slug: "data-privacy-compliance",
    title: "Data Privacy and Compliance in the Digital Age",
    excerpt:
      "Understanding data protection regulations and implementing effective privacy measures for your business.",
    paragraphs: [
      "Privacy expectations have converged globally even where statutes differ: collect less, explain clearly, secure storage and transfers, and respond to individuals without friction.",
      "Engineering teams implement privacy through data inventories, retention limits, access controls, and breach procedures—not through policy PDFs alone.",
      "For cross-border services, vendor contracts and subprocessors must match where data is processed and who can access it. Early mapping prevents emergency redesigns.",
    ],
    image: "/images/Fitch Attorney.webp",
    category: "Compliance",
    date: "February 15, 2024",
    readTime: "4 min read",
  },
];

export function getInsightPostBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function insightArticlePath(slug: string): string {
  return `/insights/${slug}`;
}

/** Normalizes `category` query value to a tab label (`All` or a known category). */
export function parseInsightCategoryParam(raw: string | null): string {
  if (!raw || raw === "All") return "All";
  return VALID_FILTER_CATEGORIES.has(raw) ? raw : "All";
}

/** Builds `/insights` URL with optional `q` and `category` (omit when All). */
export function buildInsightsHref(q: string, categoryLabel: string): string {
  const params = new URLSearchParams();
  const trimmed = q.trim();
  if (trimmed) params.set("q", trimmed);
  if (categoryLabel !== "All") params.set("category", categoryLabel);
  const qs = params.toString();
  return qs ? `/insights?${qs}` : "/insights";
}
