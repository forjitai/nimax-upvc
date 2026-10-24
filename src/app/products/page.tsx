import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { categories, categoryHref, productHref, installation } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { CategoryCard } from "@/components/Cards";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `UPVC Windows & UPVC Profiles in ${business.address.city}`,
  description: `All products from ${business.name}: UPVC windows in eleven opening styles, UPVC profiles, and window installation in ${business.address.city}.`,
  alternates: { canonical: "/products" },
  openGraph: { title: `Products | ${business.name}`, url: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Products", href: "/products" }]} eyebrow="Products & services"
        title="Products and services"
        lead={`UPVC windows in every common opening style, supplied and installed by ${business.name}, and the UPVC profiles they are made from.`} />

      <section aria-labelledby="cats-title" className="nx-container py-14">
        <h2 id="cats-title" className="nx-h2 mb-8">Browse by category</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </section>

      <section aria-labelledby="all-title" className="border-t border-line bg-bg-alt py-14">
        <div className="nx-container">
          <h2 id="all-title" className="nx-h2 mb-8">Every product</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {categories.map((c) => (
              <div key={c.slug} className="min-w-0">
                <h3 className="nx-h3 mb-3 border-b border-line pb-2">
                  <Link href={categoryHref(c.slug)} className="hover:text-primary">{c.name}</Link>
                </h3>
                <ul className="space-y-1.5">
                  {c.products.map((p) => (
                    <li key={p.slug}>
                      <Link href={productHref(c.slug, p.slug)} className="text-[0.95rem] text-body hover:text-primary hover:underline underline-offset-4">{p.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[0.95rem]">
            Also: <Link href={`/services/${installation.slug}`} className="font-semibold text-primary hover:underline underline-offset-4">{installation.name}</Link>
          </p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
