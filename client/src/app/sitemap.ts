import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Public, static routes only. /employer is private; /jobs/[jobId] is API-driven.
const PUBLIC_PATHS = ["", "/jobs"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
