import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, MoveHorizontal, Phone } from "lucide-react";
import Link from "next/link";
import { profileGroup } from "@/config/profiles";
import { business, telHref, whatsappHref } from "@/config/business";
import { categories, productHref } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/Cards";
import { ProductIllustration } from "@/components/ProductIllustration";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ButtonLink } from "@/components/Button";
import { CtaSection } from "@/components/Sections";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return categories.flatMap((c) => c.products.map((p) => ({ category: c.slug, product: p.slug })));
}

/** "UPVC Sliding Windows" -> "UPVC sliding windows" for use mid-sentence */
function lower(name: string) {
  return name.toLowerCase().replace(/upvc/g, "UPVC").replace(/(\d)mm/g, "$1mm");
}

function find(categorySlug: string, productSlug: string) {
  const category = categories.find((c) => c.slug === categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  return category && product ? { category, product } : null;
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await params;
  const hit = find(category, product);
  if (!hit) return {};
  const { product: p } = hit;
  const url = productHref(category, product);
  return {
    title: p.group ? p.name : `${p.name} in ${business.address.city}`,
    description: (p.group
      ? `${p.name}: ${p.summary}. For ${p.suitedFor[0].charAt(0).toLowerCase()}${p.suitedFor[0].slice(1)}. Supplied by ${business.name}, ${business.address.city}.`
      : `${p.summary} Supplied and installed by ${business.name}, ${business.address.city}.`).slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title: `${p.name} | ${business.name}`, description: p.summary, url },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[category]/[product]">) {
  const { category: cs, product: ps } = await params;
  const hit = find(cs, ps);
  if (!hit) notFound();
  const { category, product } = hit;
  const others = category.products.filter((p) => p.slug !== product.slug);
  const related = [...others.filter((p) => p.group && p.group === product.group), ...others.filter((p) => !p.group || p.group !== product.group)].slice(0, 4);
  const idx = category.products.findIndex((p) => p.slug === product.slug);
  const prev = category.products[(idx - 1 + category.products.length) % category.products.length];
  const next = category.products[(idx + 1) % category.products.length];
  const quoteText = `Hello ${business.name}, I would like a quotation for ${product.name}.`;
  const isProfile = category.slug === "upvc-profiles";

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Products", href: "/products" },
          { label: category.name, href: `/products/${category.slug}` },
          { label: product.name, href: productHref(category.slug, product.slug) },
        ]}
        eyebrow={product.group ? `${category.name} · ${profileGroup(product.group).name}` : category.name}
        title={product.name}
        lead={product.summary}
      />
      <nav aria-label="More products" className="border-b border-line">
        <div className="nx-container flex items-center justify-between gap-4 py-3 text-sm">
          <Link href={productHref(category.slug, prev.slug)} className="inline-flex min-w-0 items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
            <ChevronLeft aria-hidden size={16} className="shrink-0" /><span className="truncate">{prev.name}</span>
          </Link>
          <Link href={productHref(category.slug, next.slug)} className="inline-flex min-w-0 items-center gap-1.5 text-right font-semibold text-primary hover:underline underline-offset-4">
            <span className="truncate">{next.name}</span><ChevronRight aria-hidden size={16} className="shrink-0" />
          </Link>
        </div>
      </nav>

      <section aria-labelledby="overview-title" className="nx-container grid gap-10 py-14 lg:grid-cols-[1fr_1.1fr]">
        {/* Media: real photos when supplied, otherwise the opening-style drawing */}
        <div className="min-w-0">
          {product.photos.length > 0 ? (
            <div className="grid gap-3">
              {product.photos.map((ph, i) => (
                <div key={ph.src} className="relative aspect-square overflow-hidden rounded-brand-lg bg-bg-alt">
                  <Image src={ph.src} alt={ph.alt} fill priority={i === 0} sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <figure className="rounded-brand-lg border border-line bg-bg-alt p-6 sm:p-10">
              <ProductIllustration type={product.illustration} title={isProfile ? `Typical cross-section of a ${product.group ? profileGroup(product.group).name.toLowerCase() : "UPVC"} profile` : `Drawing of ${lower(product.name)} showing how it opens`} className="mx-auto aspect-square w-full max-w-[420px]" />
              <figcaption className="nx-caption mt-4 text-center">
                {isProfile ? "Drawing: typical cross-section for this profile type, for illustration only. Ask us for the exact profile drawing." : "Drawing: dashed lines point to the hinge side; arrows show the sliding direction."}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="min-w-0">
          {product.specs.length > 0 && (
            <>
              <h2 className="nx-h3">Specifications</h2>
              <dl className="mt-3 mb-10 divide-y divide-line rounded-brand border border-line">
                {product.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[40%_1fr] gap-3 px-4 py-2.5 text-sm">
                    <dt className="text-muted">{s.label}</dt><dd className="font-semibold text-heading">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <h2 id="overview-title" className="nx-h2">About {lower(product.name)}</h2>
          <p className="mt-4 max-w-[64ch] text-[1.04rem]">{product.details}</p>

          <h3 className="nx-h3 mt-8 flex items-center gap-2"><MoveHorizontal aria-hidden size={20} className="text-accent" /> {isProfile ? "How profiles are used" : "How it opens"}</h3>
          <p className="mt-2 max-w-[64ch]">{product.howItOpens}</p>

          {product.variants && (
            <>
              <h3 className="nx-h3 mt-8">Styles available</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <li key={v} className="rounded-full bg-secondary px-3.5 py-1.5 text-sm font-semibold text-primary">{v}</li>
                ))}
              </ul>
            </>
          )}

          <h3 className="nx-h3 mt-8">{isProfile ? "Used for" : "Where it suits"}</h3>
          <ul className="mt-3 space-y-2">
            {product.suitedFor.map((s) => (
              <li key={s} className="flex gap-2.5"><Check aria-hidden size={18} className="mt-1 shrink-0 text-primary" /> {s}</li>
            ))}
          </ul>


          <div className="mt-10 rounded-brand-lg border border-line bg-bg-alt p-5">
            <p className="font-semibold text-heading">Get a quotation for {lower(product.name)}</p>
            <p className="mt-1 text-sm">{isProfile ? "Tell us the window types and quantities you need." : "Sizes, glass and colour are discussed when we measure your openings."}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink href={telHref(business.primaryPhone)} variant="primary" icon={<Phone aria-hidden size={17} />}>Call {business.primaryPhone.display}</ButtonLink>
              <ButtonLink href={whatsappHref(business.primaryPhone, quoteText)} variant="whatsapp" icon={<WhatsAppIcon size={17} />}>WhatsApp</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-bg-alt py-14">
          <div className="nx-container">
            <h2 id="related-title" className="nx-h2 mb-8">Other {lower(category.name)}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} categorySlug={category.slug} />)}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="enquiry-title" className="nx-container py-14">
        <h2 id="enquiry-title" className="nx-h2 mb-6">Enquire about {lower(product.name)}</h2>
        <div className="max-w-3xl"><EnquiryForm defaultProduct={product.name} /></div>
      </section>
      <CtaSection />
    </>
  );
}
