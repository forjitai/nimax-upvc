import { categories, categoryHref, productHref, installation } from "./products";

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href: string; items: NavLink[] };

/** Product menu, built from the catalogue so new products appear automatically */
export const productMenu: NavGroup[] = categories.map((c) => ({
  label: c.name,
  href: categoryHref(c.slug),
  items: c.products.map((p) => ({ label: p.name.replace(/^UPVC /, ""), href: productHref(c.slug, p.slug) })),
}));

export const mainNav: (NavLink & { mega?: boolean })[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products", mega: true },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Installation", href: `/services/${installation.slug}` },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];
