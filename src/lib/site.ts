export const siteConfig = {
  name: "KaleidoSpark",
  legalName: "KaleidoSpark Ltd",
  tagline: "AI strategy and delivery for boards that cannot afford theatre.",
  description:
    "KaleidoSpark is a boutique AI consultancy helping enterprises design governance-ready strategy, ship copilots that work in production, and build the data foundations regulators expect.",
  url: "https://kaleidosparkhq.com",
  portalUrl: "https://app.kaleidosparkhq.com",
  email: "kaleidospark@icloud.com",
  phone: "+1 310 748 8911",
  location: "United Kingdom · serving global enterprises",
  locale: "en-GB",
} as const;

export const primaryNav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = {
  company: [
    { href: "/about", label: "About" },
    { href: "/case-studies", label: "Case studies" },
    { href: "/careers", label: "Careers" },
    { href: "/investors", label: "Investors" },
    { href: "/partners", label: "Partners" },
    { href: "/contact", label: "Contact" },
  ],
  expertise: [
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/solutions", label: "Solutions" },
    { href: "/products", label: "Products" },
    { href: "/assessment", label: "AI readiness" },
    { href: "/open-source", label: "Open source" },
  ],
  insights: [
    { href: "/insights", label: "Insights hub" },
    { href: "/blog", label: "Blog" },
    { href: "/research", label: "Research" },
    { href: "/newsroom", label: "Newsroom" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
  ],
} as const;
