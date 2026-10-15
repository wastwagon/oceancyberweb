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
    proof: {
      title: "Accra-built platforms with privacy-aware patterns",
      subtitle:
        "Live Ghana deployments with access control and client portals — patterns we apply to clinics and health operators from our Accra office.",
      items: [
        {
          slug: "fitch-advisory",
          title: "Fitch Advisory",
          metric: "250%",
          metricLabel: "Client engagement",
          summary:
            "Secure document sharing and booking — applicable to patient intake and clinician collaboration portals.",
        },
        {
          slug: "fitch-attorneys",
          title: "Fitch Attorneys",
          metric: "180%",
          metricLabel: "Case efficiency",
          summary:
            "Role-based matter workspace patterns transferable to clinical case files and confidential records.",
        },
      ],
    },
    leadMagnet: {
      magnetId: "compliance_checklist",
      page: "industries/healthcare",
      description:
        "Eight controls for health data, clinician access, vendors, and breach response — mapped to Ghana's Data Protection Act and privacy-by-design delivery.",
    },
  },
  retail: {
    proof: {
      title: "Accra commerce platforms we have shipped",
      subtitle:
        "Live retail deployments with MoMo-ready checkout — built and supported from 47 Nii Kwashiefio Avenue.",
      items: [
        {
          slug: "thinq-shopping",
          title: "ThinQ Shopping",
          metric: "165%",
          metricLabel: "Mobile conversions",
          summary:
            "E-commerce and services app with Ghana payment rails, mobile-first discovery, and checkout flows built for real retail volume.",
        },
        {
          slug: "juelle-hair",
          title: "Juelle Hair",
          metric: "150%",
          metricLabel: "Sales growth",
          summary:
            "Storefront with inventory, accounts, and payments — Accra retail pattern for catalog-led brands.",
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
      title: "Accra hospitality and booking platforms",
      subtitle:
        "Live tour and destination work with availability, payments, and guest journeys — Accra engineering.",
      items: [
        {
          slug: "tour-world-tourism",
          title: "Tour World Tourism",
          metric: "300%",
          metricLabel: "Booking conversions",
          summary:
            "Operator booking platform with real-time availability and payment integration for Ghana tourism.",
        },
        {
          slug: "africa-trade-awards",
          title: "Africa Trade Awards",
          metric: "400%",
          metricLabel: "Nomination submissions",
          summary:
            "Event nomination and audience flows applicable to festivals, conferences, and destination campaigns.",
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
      title: "Accra content and audience platforms",
      subtitle:
        "Event, media, and programme publishing from live Ghana and continental work.",
      items: [
        {
          slug: "africa-trade-awards",
          title: "Africa Trade Awards",
          metric: "400%",
          metricLabel: "Nomination submissions",
          summary:
            "Nominations and audience journeys for awards and media properties.",
        },
        {
          slug: "africa-governance-centre",
          title: "Africa Governance Centre",
          metric: "220%",
          metricLabel: "Programme visibility",
          summary:
            "Research, media, and event publishing architecture for creators and cultural institutions.",
        },
      ],
    },
  },
};
