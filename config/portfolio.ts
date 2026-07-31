/**
 * Single source of truth for every piece of editable content on the site.
 * Nothing here may be invented: all facts come from Khant's résumé.
 */

import type { ToolLogoId } from "@/components/ui/icons/tool-logos";

export interface Stat {
  value: string;
  label: string;
}

export interface ContactInfo {
  location: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface PersonalInfo {
  name: string;
  monogram: string;
  title: string;
  heroTagline: string;
  heroSupportingMessage: string;
  aboutParagraphs: string[];
  stats: Stat[];
  contact: ContactInfo;
  headshot: string;
  headshotAlt: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
}

/**
 * A tool in the MarTech grid. `logo` names one of the inlined marks in
 * components/ui/icons/tool-logos.ts; tools without a mark fall back to a
 * neutral monogram tile so the grid stays consistent.
 */
export interface MartechTool {
  name: string;
  logo?: ToolLogoId;
}

/**
 * A client or organization in the "worked with" marquee. `logo` is a path
 * under /public — left undefined until a licensed logo file is supplied, in
 * which case the brand renders as a text chip.
 */
export interface Brand {
  name: string;
  logo?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
}

export const projectCategories = [
  "Paid Media",
  "Social & Content",
  "Social Impact",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectItem {
  id: string;
  title: string;
  brand: string;
  role: string;
  period: string;
  categories: ProjectCategory[];
  link?: string;
}

export interface AwardItem {
  result: string;
  category: string;
  organization: string;
  year: string;
}

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

/** Rendered only when real quotes exist — never fabricate these. */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ContactCopy {
  heading: string;
  supportingMessage: string;
  submitButton: string;
  successMessage: string;
}

export interface DesignTokens {
  background: string;
  backgroundAlt: string;
  backgroundDark: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  hairline: string;
  maxContentWidth: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  navigation: NavItem[];
  primaryCta: string;
  secondaryCta: string;
  brands: { heading: string; items: Brand[] };
  about: { heading: string };
  services: { heading: string; items: Service[] };
  skills: {
    heading: string;
    items: Skill[];
    stackHeading: string;
    stack: MartechTool[];
  };
  experience: { heading: string; items: ExperienceItem[] };
  work: { heading: string; items: ProjectItem[] };
  awards: { heading: string; items: AwardItem[] };
  education: {
    heading: string;
    educationHeading: string;
    items: EducationItem[];
    certificationsHeading: string;
    certifications: CertificationItem[];
  };
  testimonials: { heading: string; items: Testimonial[] };
  contact: ContactCopy;
  closingCta: { heading: string; supportingMessage: string };
  footer: { tagline: string };
  design: DesignTokens;
}

export const messageStatuses = ["new", "read", "replied", "archived"] as const;
export type MessageStatus = (typeof messageStatuses)[number];
export const defaultMessageStatus: MessageStatus = "new";

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Khant Zayar Paing",
    monogram: "KZP",
    title: "Digital Media Buying & Planning Manager",
    heroTagline: "Turning media budgets into measurable growth.",
    heroSupportingMessage:
      "Award-winning digital media buyer and planner with 4+ years across hospitality and multinational brands — from paid media strategy to execution, analytics, and revenue decisions.",
    aboutParagraphs: [
      "I'm Khant Zayar Paing, a digital media buying and planning manager based in Bangkok, open to remote work and relocation. Over the past 4+ years I've planned and executed paid media for hospitality and multinational brands — including hands-on work for Hyatt, InterContinental, and Samsung.",
      "My expertise spans paid media (Google Ads, Meta, TikTok), SEO/SEM, email, and social — from campaign strategy through execution, A/B testing, and performance analysis. I've managed monthly media budgets of THB 2M+, led cross-functional teams, and turned performance data into revenue decisions. My work has been recognized with multiple Campaign Asia-Pacific and SABRE Awards Asia-Pacific honors.",
      "I care about work that performs and work that matters — I've led paid campaigns that dominated smartphone share of voice, and social-impact initiatives with UNICEF and UNFPA.",
    ],
    stats: [
      { value: "4+", label: "Years of experience" },
      { value: "THB 2M+", label: "Monthly ad spend managed" },
      { value: "30+", label: "Hospitality clients served" },
      { value: "5", label: "Campaign Asia-Pacific & SABRE honors" },
    ],
    contact: {
      location: "Bangkok, Thailand — open to remote & relocation",
      email: "khantzayarpaing@gmail.com",
      phone: "+66 63 168 2021",
      linkedin: "https://www.linkedin.com/in/khantzayarpaing/",
    },
    headshot: "/khant.jpg",
    headshotAlt: "Khant Zayar Paing, Digital Media Buying & Planning Manager",
  },

  navigation: [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  primaryCta: "Get in Touch",
  secondaryCta: "View My Work",

  brands: {
    heading: "Brands & organizations I've worked with",
    // Add `logo: "/brands/<file>.svg"` per brand once licensed logo files are
    // dropped into public/brands — the marquee swaps the text chip for the mark
    // automatically.
    items: [
      { name: "Hyatt" },
      { name: "InterContinental" },
      { name: "Samsung" },
      { name: "Banyan Group" },
      { name: "Abbott" },
      { name: "Chang" },
      { name: "Mega Lifesciences" },
      { name: "UNICEF" },
      { name: "UNFPA" },
    ],
  },

  about: { heading: "About" },

  services: {
    heading: "What I Do",
    items: [
      {
        id: "paid-media",
        title: "Paid Media Buying & Planning",
        description:
          "End-to-end paid campaigns across search, social, and marketplaces.",
        tools: ["Google Ads", "Meta Ads", "TikTok Ads"],
      },
      {
        id: "performance-analytics",
        title: "Performance Marketing & Analytics",
        description:
          "A/B testing, ROAS optimization, and dashboards that drive revenue decisions.",
        tools: ["GA4", "Looker Studio", "Supermetrics"],
      },
      {
        id: "seo-sem",
        title: "SEO / SEM",
        description: "Search visibility and paid-search efficiency.",
        tools: ["Ahrefs", "SEMrush", "Google Search Console"],
      },
      {
        id: "social-content",
        title: "Social & Content",
        description:
          "Social strategy, content, and storytelling that earns engagement.",
        tools: ["Meta", "TikTok", "LINE"],
      },
      {
        id: "automation-crm",
        title: "Marketing Automation & CRM",
        description: "Lifecycle, email, and retention workflows.",
        tools: ["HubSpot", "Salesforce", "ActiveCampaign", "Brevo"],
      },
      {
        id: "campaign-strategy",
        title: "Integrated Campaign Strategy",
        description:
          "Award-winning, cross-channel campaign planning and execution.",
        tools: ["GTM", "Cross-functional leadership"],
      },
    ],
  },

  skills: {
    heading: "Skills & Tools",
    items: [
      { name: "Integrated Campaign Planning", proficiency: 95 },
      { name: "Paid Media Advertising", proficiency: 95 },
      { name: "Analytics & Performance Measurement", proficiency: 90 },
      { name: "Social Media & Content", proficiency: 90 },
      { name: "SEO Optimization", proficiency: 85 },
      { name: "Cross-functional Team Leadership", proficiency: 90 },
    ],
    stackHeading: "MarTech stack",
    // Ahrefs and Semrush are listed separately so each carries its own mark.
    stack: [
      { name: "Google Ads", logo: "googleAds" },
      { name: "Meta Ads Manager", logo: "meta" },
      { name: "TikTok Ads Manager", logo: "tiktok" },
      { name: "GA4", logo: "ga4" },
      { name: "Google Tag Manager", logo: "gtm" },
      { name: "Looker Studio", logo: "looker" },
      { name: "Semrush", logo: "semrush" },
      { name: "Ahrefs" },
      { name: "Supermetrics" },
      { name: "HubSpot", logo: "hubspot" },
      { name: "Salesforce" },
      { name: "ActiveCampaign" },
      { name: "Brevo", logo: "brevo" },
      { name: "TableCheck", logo: "tablecheck" },
    ],
  },

  experience: {
    heading: "Experience",
    items: [
      {
        role: "Digital Media Buying & Planning Manager",
        company: "Hampton Marketing Solutions Co., Ltd.",
        location: "Bangkok",
        period: "Aug 2025 – Present",
        summary:
          "Paid media strategy and performance analytics for international hospitality brands.",
        achievements: [
          "Paid media strategy for 30+ hospitality clients incl. Hyatt & InterContinental; THB 2M+ monthly ad spend across Google Ads, Meta, TikTok",
          "Built GTM tagging + real-time Looker Studio dashboards; monthly analysis for clients' sales/revenue teams",
          "Increased direct bookings by 30% and lifted guest engagement across owned channels",
          "Secured exclusive annual media-buying retainers with Banyan Living Group, InterContinental, and Hyatt",
        ],
      },
      {
        role: "Media Buyer (Contract)",
        company: "GDT Marketing and Retail Co., Ltd",
        location: "Bangkok",
        period: "Apr 2025 – Jul 2025",
        summary:
          "Omnichannel e-commerce and retail growth campaigns across Southeast Asian marketplaces.",
        achievements: [
          "Omnichannel campaigns across Shopee, Lazada, LINE, TikTok, Meta; +15% conversion in peak sales",
          "Led ROI optimization for flash/double-day events (4.4, 5.5, 6.6, 7.7), exceeding revenue targets by 25%",
          "Improved ROAS from 1.3 to 2.5 via budget reallocation and creative testing",
        ],
      },
      {
        role: "Associate Manager",
        company: "Ruder Finn Era",
        location: "Yangon",
        period: "Feb 2022 – Mar 2025",
        summary:
          "Integrated digital marketing and media planning for global electronics, beverage, and healthcare brands.",
        achievements: [
          "Integrated digital marketing & media planning for Samsung, Chang, Abbott, Mega Lifesciences",
          "Won Campaign Asia-Pacific & SABRE Awards Asia-Pacific honors (incl. UNFPA work)",
          "Brand and content strategies across touchpoints; managed retainer client relationships",
        ],
      },
      {
        role: "Digital Engagement Project Lead (Volunteer)",
        company: "UNICEF",
        location: "Yangon",
        period: "Jan 2023 – Sep 2023",
        summary: "Youth engagement programs and social mobilization campaigns.",
        achievements: [
          "+20% poll participation via partnership programs and social/email campaigns",
          "+30% social engagement by leading training on social strategy and content best practices",
        ],
      },
    ],
  },

  work: {
    heading: "Selected Work",
    items: [
      {
        id: "galaxy-s25",
        title: "#GalaxyAI is here — Galaxy S25 Series",
        brand: "Samsung Myanmar",
        role: "Maintained #1 share of voice & engagement in the smartphone category.",
        period: "Jan – Mar 2025",
        categories: ["Paid Media", "Social & Content"],
        link: "https://www.linkedin.com/in/khantzayarpaing/",
      },
      {
        id: "galaxy-z6",
        title: "Make more of every moment — Galaxy Z Fold6 | Z Flip6",
        brand: "Samsung Myanmar",
        role: "Strategic media mix incl. first TV return since 2019, high KPIs under constraints.",
        period: "Jun – Oct 2024",
        categories: ["Paid Media", "Social & Content"],
        link: "https://www.linkedin.com/in/khantzayarpaing/",
      },
      {
        id: "jointheflipside",
        title: "#JoinTheFlipSide — Galaxy Z Flip5 | Z Fold5",
        brand: "Samsung Myanmar",
        role: "Nationwide Gen-Z social campaign; #1 foldable ad position in Myanmar 2023.",
        period: "Jul – Oct 2023",
        categories: ["Social & Content"],
        link: "https://www.linkedin.com/in/khantzayarpaing/",
      },
      {
        id: "responsible-market",
        title: "The Responsible Market",
        brand: "The Community",
        role: "Sustainability event with 7,000+ youth; recycling & circular-economy initiatives.",
        period: "Jul 2022 – Jul 2023",
        categories: ["Social Impact"],
        link: "https://www.linkedin.com/in/khantzayarpaing/",
      },
      {
        id: "hold-on-a-minute",
        title: "Hold On A Minute (Podcast)",
        brand: "UNFPA Asia-Pacific",
        role: "Multi-platform podcast on ageing & adolescent health across Meta, Spotify, Apple Podcasts, YouTube.",
        period: "May 2023 – Jan 2024",
        categories: ["Social Impact", "Social & Content"],
        link: "https://www.linkedin.com/in/khantzayarpaing/",
      },
    ],
  },

  awards: {
    heading: "Awards & Recognition",
    items: [
      {
        result: "Silver",
        category: "Health & Wellness",
        organization: "Campaign Asia-Pacific",
        year: "2024",
      },
      {
        result: "Bronze",
        category: "Public Affairs",
        organization: "Campaign Asia-Pacific",
        year: "2024",
      },
      {
        result: "Winner",
        category: "Podcast/Webinar/Webcast, Digital & Creative",
        organization: "SABRE Awards Asia-Pacific",
        year: "2024",
      },
      {
        result: "Certificate of Excellence",
        category: "Persuasive Content",
        organization: "SABRE Awards Asia-Pacific",
        year: "2024",
      },
      {
        result: "Certificate of Excellence",
        category: "Sponsored & Paid Media",
        organization: "SABRE Awards Asia-Pacific",
        year: "2024",
      },
    ],
  },

  education: {
    heading: "Education & Certifications",
    educationHeading: "Education",
    items: [
      {
        institution: "CIM — The Chartered Institute of Marketing",
        qualification: "Level 6 Diploma in Professional & Digital Marketing",
        period: "Jul 2025 – Oct 2026 (Expected)",
        details:
          "Focus: AI Marketing, Brand Proposition, Commercial Intelligence, Strategy & Planning.",
      },
      {
        institution: "Strategy First University",
        qualification:
          "ICM Single Subject Diploma in Marketing Management (Credit)",
        period: "Jul 2022 – Apr 2023",
      },
      {
        institution: "Yangon University of Economics",
        qualification: "Bachelor of Commerce",
        period: "",
        details: "Class Representative of the Year",
      },
    ],
    certificationsHeading: "Certifications",
    certifications: [
      { name: "Marketing with TikTok", issuer: "Aptly", year: "2024" },
      {
        name: "Google Digital Marketing & E-commerce",
        issuer: "Google",
        year: "2023",
      },
      {
        name: "Google Ads Display Certification",
        issuer: "Google",
        year: "2023",
      },
      {
        name: "Meta Social Media Marketing Professional Certificate",
        issuer: "Meta",
        year: "2021",
      },
    ],
  },

  // Intentionally empty: the Testimonials section stays hidden until real,
  // attributable quotes are supplied. Never fabricate quotes.
  testimonials: {
    heading: "What People Say",
    items: [],
  },

  contact: {
    heading: "Let's Work Together",
    supportingMessage:
      "Open to remote roles, relocation, and freelance projects. Tell me about the opportunity and I'll get back to you.",
    submitButton: "Send Message",
    successMessage: "Thanks — your message has been sent. I'll be in touch soon.",
  },

  closingCta: {
    heading: "Let's turn your media budget into measurable growth.",
    supportingMessage:
      "Available for full-time roles, relocation, and freelance paid media projects.",
  },

  footer: {
    tagline: "Turning media budgets into measurable growth.",
  },

  design: {
    background: "#ffffff",
    backgroundAlt: "#f5f5f7",
    backgroundDark: "#000000",
    text: "#1d1d1f",
    textSecondary: "#6e6e73",
    accent: "#0071e3",
    accentHover: "#0077ed",
    hairline: "#d2d2d7",
    maxContentWidth: "1024px",
  },
};
