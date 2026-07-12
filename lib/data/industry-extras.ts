import type { IndustryProofItem } from "@/components/industries/IndustryFeaturedProof";
import type { LeadMagnetId } from "@/lib/lead-magnets/presets";

export type IndustryExtrasConfig = {
  proof?: {
    title: string;
    subtitle: string;
    items: IndustryProofItem[];
  };
  leadMagnet?: {
    magnetId: LeadMagnetId;
    page: string;
    description?: string;
  };
};

export const industryExtras: Partial<Record<string, IndustryExtrasConfig>> = {
  healthcare: {
    leadMagnet: {
      magnetId: "compliance_checklist",
      page: "industries/healthcare",
      description:
        "Eight controls for health data, clinician access, vendors, and breach response — mapped to Ghana's Data Protection Act and privacy-by-design delivery.",
    },
  },
  retail: {
    proof: {
      title: "Commerce platforms we have shipped",
      subtitle:
        "Live retail and services deployments with MoMo-ready checkout and measurable conversion gains.",
      items: [
        {
          slug: "thinq-shopping",
          title: "ThinQ Shopping",
          metric: "165%",
          metricLabel: "Mobile conversions",
          summary:
            "E-commerce and services app with Ghana payment rails, mobile-first discovery, and checkout flows built for real retail volume.",
        },
      ],
    },
    leadMagnet: {
      magnetId: "momo_playbook",
      page: "industries/retail",
      description:
        "Seven practical steps for MoMo-ready checkout, reconciliation, and dispute handling — written for Ghana retail and commerce teams.",
    },
  },
  education: {
    proof: {
      title: "Institutional programme delivery",
      subtitle:
        "Patterns from live governance and advisory platforms applicable to schools, universities, and training operators.",
      items: [
        {
          slug: "africa-governance-centre",
          title: "Africa Governance Centre",
          metric: "220%",
          metricLabel: "Programme visibility",
          summary:
            "Structured programme content, events, and stakeholder engagement — applicable to institutional learning and certification platforms.",
        },
        {
          slug: "fitch-advisory",
          title: "Fitch Advisory",
          metric: "250%",
          metricLabel: "Stakeholder engagement",
          summary:
            "Research, insights, and service discovery patterns useful for executive education and professional training portals.",
        },
      ],
    },
    leadMagnet: {
      magnetId: "compliance_checklist",
      page: "industries/education",
      description:
        "Data inventory, access control, vendor oversight, and breach playbooks for student records, LMS platforms, and third-party edtech tools.",
    },
  },
  logistics: {
    proof: {
      title: "Operations-heavy commerce delivery",
      subtitle:
        "Client work where fulfilment, payments, and customer journeys had to stay reliable under volume.",
      items: [
        {
          slug: "thinq-shopping",
          title: "ThinQ Shopping",
          metric: "165%",
          metricLabel: "Mobile conversions",
          summary:
            "Commerce platform with order flows, service booking, and payment reconciliation patterns relevant to logistics operators.",
        },
      ],
    },
  },
  tourism: {
    proof: {
      title: "Events and destination platforms",
      subtitle:
        "Live work with programme discovery, event promotion, and international stakeholder credibility.",
      items: [
        {
          slug: "africa-governance-centre",
          title: "Africa Governance Centre",
          metric: "220%",
          metricLabel: "Programme visibility",
          summary:
            "Event and programme promotion patterns applicable to hospitality, conferences, and destination marketing sites.",
        },
      ],
    },
  },
  energy: {
    proof: {
      title: "Institutional and stakeholder platforms",
      subtitle:
        "Advisory-grade delivery patterns for regulated operators communicating with partners and the public.",
      items: [
        {
          slug: "fitch-advisory",
          title: "Fitch Advisory",
          metric: "250%",
          metricLabel: "Stakeholder engagement",
          summary:
            "Secure institutional site architecture applicable to energy advisory, investor relations, and programme communications.",
        },
      ],
    },
    leadMagnet: {
      magnetId: "compliance_checklist",
      page: "industries/energy",
    },
  },
  agriculture: {
    proof: {
      title: "Commerce and field-to-market patterns",
      subtitle:
        "Mobile-first buying journeys and payment flows relevant to agribusiness marketplaces and co-operative sales.",
      items: [
        {
          slug: "thinq-shopping",
          title: "ThinQ Shopping",
          metric: "165%",
          metricLabel: "Mobile conversions",
          summary:
            "Mobile commerce experience with local payment acceptance — applicable to farmer marketplaces and rural retail channels.",
        },
      ],
    },
  },
  "real-estate": {
    proof: {
      title: "Property and professional services delivery",
      subtitle:
        "Portal, lead capture, and content patterns from live institutional and professional services platforms.",
      items: [
        {
          slug: "fitch-advisory",
          title: "Fitch Advisory",
          metric: "250%",
          metricLabel: "Client engagement",
          summary:
            "Sector pages, lead routing, and credibility patterns applicable to property developers and brokerage brands.",
        },
      ],
    },
  },
  "media-entertainment": {
    proof: {
      title: "Content and audience platforms",
      subtitle:
        "Programme publishing, events, and audience engagement from live continental and institutional work.",
      items: [
        {
          slug: "africa-governance-centre",
          title: "Africa Governance Centre",
          metric: "220%",
          metricLabel: "Programme visibility",
          summary:
            "Research, media, and event publishing architecture applicable to broadcasters, creators, and cultural institutions.",
        },
      ],
    },
  },
};
