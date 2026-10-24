import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/business";

/** Production: crawl everything and point to the sitemap. Vercel previews: block crawling. */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
