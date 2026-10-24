import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { categories } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/Cards";
import { ProductIllustration } from "@/components/ProductIllustration";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} in ${business.address.city}`,
    description: `${c.summary} ${c.products.length} styles from ${business.name}, ${business.address.city}.`.slice(0, 160),
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: { title: `${c.name} | ${business.name}`, url: `/products/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/products/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: c.name, href: `/products/${c.slug}` }]}
        eyebrow={`${c.products.length} ${c.products.length === 1 ? "style" : "styles"}`}
        title={c.name}
        lead={c.summary}
        aside={<ProductIllustration type={c.illustration} className="mx-auto hidden w-full max-w-[280px] md:block" />}
      />
      <section aria-label={`${c.name} styles`} className="nx-container py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.products.map((p) => <ProductCard key={p.slug} product={p} categorySlug={c.slug} headingLevel={2} />)}
        </div>
      </section>
      <CtaSection title={`Need help choosing ${c.shortName.toLowerCase() === "glass" ? "a glass system" : c.name}?`}
        text="Tell us about the rooms and openings and we will suggest the styles that suit them." />
    </>
  );
}
