import type { Metadata } from "next";
import Link from "next/link";
import { business, telHref } from "@/config/business";
import { categories, categoryHref, installation } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductIllustration } from "@/components/ProductIllustration";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `About ${business.name} | UPVC Windows ${business.address.city}`,
  description: `${business.name} supplies and installs UPVC windows and doors, aluminium windows and doors, glass partitions and skylights from Kittanahalli, ${business.address.city}.`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${business.name}`, url: "/about" },
};

/*
 * Only verified facts. Do not add a founding year, staff numbers, turnover,
 * client names, certifications or awards until the owner supplies them.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "About Us", href: "/about" }]} eyebrow="About us" title={`About ${business.name}`}
        lead={`A ${business.address.city} business supplying and installing UPVC windows, UPVC doors and aluminium glass systems.`}
        aside={<ProductIllustration type="combination" className="mx-auto hidden w-full max-w-[280px] md:block" />} />

      <section aria-labelledby="who-title" className="nx-container grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="nx-prose min-w-0">
          <h2 id="who-title" className="nx-h2">Who we are</h2>
          <p className="mt-4 text-[1.04rem]">
            {business.name} is located at Kittanahalli on Kadabagere Road, Byandahalli, in {business.address.city}. We supply
            UPVC windows and UPVC doors in the common opening styles, together with aluminium windows and doors,
            aluminium glass partitions and glass skylights.
          </p>
          <p className="mt-4 text-[1.04rem]">
            We also install what we supply, so the same team handles your order from the first measurement to the
            finished, sealed window or door.
          </p>

          <h2 className="nx-h2 mt-12">What we offer</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug} className="rounded-brand-lg border border-line p-5">
                <h3 className="nx-h3 text-[1.08rem]"><Link href={categoryHref(c.slug)} className="hover:text-primary">{c.name}</Link></h3>
                <p className="mt-2 text-[0.93rem]">{c.summary}</p>
              </li>
            ))}
            <li className="rounded-brand-lg border border-line p-5 sm:col-span-2">
              <h3 className="nx-h3 text-[1.08rem]"><Link href={`/services/${installation.slug}`} className="hover:text-primary">{installation.name}</Link></h3>
              <p className="mt-2 text-[0.93rem]">{installation.summary}</p>
            </li>
          </ul>
        </div>

        <aside aria-labelledby="facts-title" className="min-w-0">
          <div className="rounded-brand-lg border border-line bg-bg-alt p-6 lg:sticky lg:top-24">
            <h2 id="facts-title" className="nx-h3">Company details</h2>
            <dl className="mt-4 text-sm">
              {[
                ["Business name", business.name],
                ["Nature of business", "Supply and installation"],
                ["Products", "UPVC windows & doors, aluminium windows & doors, glass partitions, skylights"],
                ["Area served", business.areaServed.join(", ")],
                ["Address", business.addressOneLine],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-line py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="mt-0.5 font-semibold text-heading">{v}</dd>
                </div>
              ))}
              <div className="py-3">
                <dt className="text-muted">Phone</dt>
                <dd className="mt-0.5 space-y-1">
                  {business.phones.map((p) => (
                    <a key={p.e164} href={telHref(p)} className="block font-semibold tabular-nums text-primary hover:underline">{p.display}</a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
      <CtaSection />
    </>
  );
}
