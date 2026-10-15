import { googleBusinessProfile } from "@/lib/startup-agency/google-business";

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  accent: string;
  bio: string;
  imageUrl?: string;
};

export const teamHeadshotFilenameGuide: Record<string, string> = {
  "Sarah Mensah": "/images/team/sarah-mensah.webp",
  "Kwame Asante": "/images/team/kwame-asante.webp",
  "Ama Serwaa": "/images/team/ama-serwaa.webp",
};

export const teamMembers: TeamMember[] = [
  {
    name: googleBusinessProfile.founderName,
    initials: "GA",
    role: googleBusinessProfile.founderRole,
    accent: "from-lime-300/30 to-emerald-500/20",
    bio: "Leads client work and the Accra team that designs, builds, and secures products for Ghana businesses.",
  },
  {
    name: "Sarah Mensah",
    initials: "SM",
    role: "CTO & Lead Architect",
    accent: "from-cyan-300/30 to-blue-500/20",
    bio: "Owns platform architecture, release quality, and the engineering standards the Accra team ships with.",
  },
  {
    name: "Kwame Asante",
    initials: "KA",
    role: "Head of Security",
    accent: "from-fuchsia-300/30 to-violet-500/20",
    bio: "Runs assessments, hardening, and incident readiness for sites and apps we build or review.",
  },
  {
    name: "Ama Serwaa",
    initials: "AS",
    role: "Creative Director",
    accent: "from-amber-300/30 to-orange-500/20",
    bio: "Leads brand systems and interface design so products look clear on Ghana mobile screens.",
  },
];
