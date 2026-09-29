import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { caseStudies } from "@/lib/data/case-studies";
import { solutions, products, careers, resources } from "@/lib/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/solutions",
    "/products",
    "/products/riskline",
    "/insights",
    "/blog",
    "/research",
    "/newsroom",
    "/events",
    "/case-studies",
    "/open-source",
    "/resources",
    "/investors",
    "/partners",
    "/careers",
    "/contact",
    "/assessment",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...products.filter((p) => p.slug !== "riskline").map((p) => `/products/${p.slug}`),
    ...careers.map((c) => `/careers/${c.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
    "/blog/governance-before-models",
    "/blog/eu-ai-act-practical-start",
    "/blog/copilot-evaluation-basics",
    "/research/state-of-enterprise-ai-governance",
    "/research/board-briefing-genai-risk",
    "/newsroom/kaleidospark-launches-marketing-platform",
    "/newsroom/riskline-early-access",
    "/events/responsible-ai-healthcare-briefing",
    "/events/retail-ai-strategy-workshop",
  ];

  const now = new Date();
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
