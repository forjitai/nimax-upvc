import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { categories, windowGroups } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/Cards";
import { ProductIllustration } from "@/components/ProductIllustration";
import { CtaSection } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { siteUrl } from "@/config/business";
import { ProfileCatalogue } from "@/components/ProfileCatalogue";
import { profileGroups } from "@/config/profiles";
import { ButtonLink } from "@/components/Button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappHref } from "@/config/business";

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
    description: (c.slug === "upvc-profiles" ? `${c.products.length} UPVC profiles from ${business.name}: frames, tracks, sashes, mullions, couplers, glazing beads and mesh profiles for fabrication.` : `${c.summary} ${c.products.length} styles from ${business.name}, ${business.address.city}.`).slice(0, 160),
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: { ...ogDefaults, title: `${c.name} | ${business.name}`, url: `/products/${c.slug}` },
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
        eyebrow={c.slug === "upvc-profiles" ? `${c.products.length} profiles` : `${c.products.length} ${c.products.length === 1 ? "style" : "styles"}`}
        title={c.name}
        lead={c.summary}
        aside={<ProductIllustration type={c.illustration} className="mx-auto hidden w-full max-w-[280px] md:block" />}
      />
      {c.slug === "upvc-profiles" ? (
        <>
          <section aria-label="Profile catalogue" className="nx-container py-14">
            <ProfileCatalogue groups={profileGroups.map((g) => ({ id: g.id, name: g.name }))}
              items={c.products.map((p) => ({ slug: p.slug, name: p.name, group: p.group!, card: <ProductCard product={p} categorySlug={c.slug} headingLevel={2} /> }))} />
          </section>
          <section aria-labelledby="types-title" className="border-t border-line bg-bg-alt py-14">
            <div className="nx-container">
              <h2 id="types-title" className="nx-h2 mb-8">Profile types explained</h2>
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {profileGroups.map((g) => (
                  <div key={g.id} className="rounded-brand-lg border border-line bg-bg p-6">
                    <dt className="nx-h3 text-[1.1rem]">{g.name}</dt>
                    <dd className="mt-2 text-[0.95rem]">{g.description}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-wrap items-center gap-4 rounded-brand-lg bg-bg-dark p-6 text-on-dark">
                <p className="min-w-0 flex-1 font-semibold">Fabricator? Send your profile list and quantities for a bulk quotation.</p>
                <ButtonLink href={whatsappHref(business.primaryPhone, `Hello ${business.name}, I have a bulk enquiry for UPVC profiles.`)} variant="whatsapp" icon={<WhatsAppIcon size={17} />}>Bulk enquiry</ButtonLink>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section aria-label={`${c.name} styles`} className="nx-container py-14">
          <ProfileCatalogue noun="windows" allLabel="All windows" placeholder="Search, e.g. sliding or mesh"
            groups={windowGroups}
            items={c.products.map((p) => ({ slug: p.slug, name: p.name, group: p.windowGroup ?? "fixed-special", card: <ProductCard product={p} categorySlug={c.slug} headingLevel={2} /> }))} />
        </section>
      )}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: c.name,
        numberOfItems: c.products.length,
        itemListElement: c.products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${siteUrl}/products/${c.slug}/${p.slug}` })),
      }} />
      <CtaSection title={c.slug === "upvc-profiles" ? "Need UPVC profiles?" : "Need help choosing a window style?"}
        text={c.slug === "upvc-profiles" ? "Call or WhatsApp us with your requirement." : "Tell us about the rooms and openings and we will suggest the styles that suit them."} />
    </>
  );
}
