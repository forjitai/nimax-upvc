import type { Metadata } from "next";
import Link from "next/link";
import { categories, categoryHref } from "@/config/products";
import { ButtonLink } from "@/components/Button";
import { ProductIllustration } from "@/components/ProductIllustration";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="nx-container grid items-center gap-10 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
      <div>
        <p className="nx-eyebrow mb-3">Error 404</p>
        <h1 className="nx-display">This page does not exist</h1>
        <p className="nx-lead mt-4">The link may be old or mistyped. These pages might help:</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={categoryHref(c.slug)} className="inline-block rounded-full border border-line px-4 py-2 text-sm font-semibold text-heading hover:border-primary hover:text-primary">{c.name}</Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/contact" variant="outline">Contact us</ButtonLink>
        </div>
      </div>
      <ProductIllustration type="fixed" className="mx-auto hidden w-full max-w-xs md:block" />
    </section>
  );
}
