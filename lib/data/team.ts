export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  accent: string;
  bio: string;
  imageUrl?: string;
};

export const teamHeadshotFilenameGuide: Record<string, string> = {
  "Marcus Owusu": "/images/team/marcus-owusu.webp",
  "Sarah Mensah": "/images/team/sarah-mensah.webp",
  "Kwame Nkrumah": "/images/team/kwame-nkrumah.webp",
  "Ama Serwaa": "/images/team/ama-serwaa.webp",
};

export const teamMembers: TeamMember[] = [
  {
    name: "Marcus Owusu",
    initials: "MO",
    role: "Founder & CEO",
    accent: "from-lime-300/30 to-emerald-500/20",
    bio: "Leads strategy, product direction, and delivery standards across multidisciplinary teams.",
  },
  {
    name: "Sarah Mensah",
    initials: "SM",
    role: "CTO & Lead Architect",
    accent: "from-cyan-300/30 to-blue-500/20",
    bio: "Designs resilient platform architecture with strong quality gates and release discipline.",
  },
  {
    name: "Kwame Nkrumah",
    initials: "KN",
    role: "Head of Security",
    accent: "from-fuchsia-300/30 to-violet-500/20",
    bio: "Owns security posture, assessments, hardening, and incident-readiness execution.",
  },
  {
    name: "Ama Serwaa",
    initials: "AS",
    role: "Creative Director",
    accent: "from-amber-300/30 to-orange-500/20",
    bio: "Shapes visual systems, content storytelling, and conversion-aware interface design.",
  },
];
