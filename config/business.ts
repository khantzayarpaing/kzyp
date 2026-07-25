export const business = {
  name: "BrightPath Consulting",
  description:
    "BrightPath Consulting helps small and medium-sized businesses improve their operations, organize their internal processes, and adopt practical digital tools.",
  targetCustomers:
    "Small business owners, startup founders, and growing companies that need help improving their business operations.",
  customerProblem:
    "Many business owners spend too much time managing repetitive tasks, disconnected tools, and unclear internal processes.",
  headline: "Run Your Business More Efficiently",
  supportingMessage:
    "We help growing businesses simplify their operations, improve productivity, and choose the right digital tools.",
  cta: "Book a Free Consultation",
  contact: {
    email: "hello@brightpath.example",
    phone: "02-000-0000",
    address: "Bangkok, Thailand",
  },
  design: {
    primaryColor: "blue",
    style: "Professional, modern, trustworthy, clean, and minimal.",
  },
} as const;

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
] as const;

export const customerProblem = {
  heading: "Running a Business Should Not Feel This Complicated",
  paragraphs: [
    "Many business owners spend too much time managing repetitive tasks, disconnected tools, and unclear internal processes.",
    "This makes it difficult to focus on customers, growth, and important business decisions.",
    "BrightPath Consulting helps identify these problems and provides practical solutions that are simple to understand and implement.",
  ],
} as const;

export const benefits = {
  heading: "How We Help Your Business",
  items: [
    {
      title: "Simplify Operations",
      description:
        "Identify inefficient processes and replace them with clearer, more manageable workflows.",
    },
    {
      title: "Save Time",
      description:
        "Reduce repetitive work by introducing practical tools and automation where they create real value.",
    },
    {
      title: "Support Business Growth",
      description:
        "Create scalable processes that continue to work as your team and customer base grow.",
    },
  ],
} as const;

export const services = {
  heading: "Our Services",
  items: [
    {
      title: "Business Process Review",
      description:
        "We review your current workflows, identify bottlenecks, and recommend practical improvements.",
    },
    {
      title: "Digital Tool Consultation",
      description:
        "We help you choose suitable tools for communication, project management, customer management, and automation.",
    },
    {
      title: "Implementation Support",
      description:
        "We support your team while introducing new processes and digital tools into daily operations.",
    },
  ],
} as const;

export const howItWorks = {
  heading: "A Simple Way to Improve Your Business",
  steps: [
    {
      title: "Tell Us About Your Business",
      description:
        "Share your current challenges, business goals, and the areas you want to improve.",
    },
    {
      title: "Receive a Practical Plan",
      description:
        "We review your situation and prepare clear recommendations based on your business needs.",
    },
    {
      title: "Improve and Grow",
      description:
        "We help you implement the plan and measure the improvements over time.",
    },
  ],
} as const;

export const enquiry = {
  heading: "Book a Free Consultation",
  supportingMessage:
    "Tell us about your business and the challenges you are currently facing. We will contact you to discuss how we may be able to help.",
  submitButton: "Submit Enquiry",
  successMessage: "Thank you for your enquiry. We will contact you shortly.",
} as const;

export const footer = {
  tagline:
    "Helping growing businesses improve their operations and adopt practical digital tools.",
} as const;

export const leadStatuses = ["new", "contacted", "qualified", "closed"] as const;
export type LeadStatus = (typeof leadStatuses)[number];
