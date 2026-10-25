import { business } from "@/config/business";

/** Share image used on every page (WhatsApp, Facebook, LinkedIn, X previews). 1200 × 630. */
export const shareImage = {
  url: "/og/nimax-share.png",
  width: 1200,
  height: 630,
  alt: `${business.name}: UPVC profiles and UPVC windows, ${business.address.city}`,
};

/**
 * Spread into every page's `openGraph` so the site name, locale and share image are kept
 * (Next.js replaces the whole openGraph object when a page sets its own).
 */
export const ogDefaults = {
  siteName: business.name,
  locale: "en_IN",
  type: "website" as const,
  images: [shareImage],
};
