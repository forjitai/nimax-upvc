import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteUrl } from "@/config/business";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList structured data. Pass the trail without "Home". */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-muted">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="font-semibold text-heading">{c.label}</span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-primary hover:underline underline-offset-4">{c.label}</Link>
                    <ChevronRight aria-hidden size={14} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((c, i) => ({
          "@type": "ListItem", position: i + 1, name: c.label, item: `${siteUrl}${c.href === "/" ? "" : c.href}`,
        })),
      }} />
    </>
  );
}
