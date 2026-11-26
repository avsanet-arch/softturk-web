import type { MetadataRoute } from "next";
import { tam } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/yonetim", "/api/", "/reklam/"] }],
    sitemap: tam("/sitemap.xml"),
  };
}
