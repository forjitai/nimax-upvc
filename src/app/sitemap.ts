import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/business";
import { categories, categoryHref, productHref, installation } from "@/config/products";
import { galleryImages } from "@/config/gallery";
import { posts } from "@/content/blog";

/**
 * XML sitemap: only canonical, indexable pages.
 * Excluded: /design-system (noindex), /gallery while it has no photos (noindex), 404.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-24");
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${siteUrl}${path === "/" ? "" : path}`, lastModified, priority,
  });
  return [
    page("/", 1),
    page("/products", 0.9),
    ...categories.map((c) => page(categoryHref(c.slug), 0.8)),
    ...categories.flatMap((c) => c.products.map((p) => page(productHref(c.slug, p.slug), 0.7))),
    page(`/services/${installation.slug}`, 0.8),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/blog", 0.6),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.5)),
    ...(galleryImages.length > 0 ? [page("/gallery", 0.5)] : []),
    page("/privacy", 0.2),
  ];
}
