import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, siteUrl } from "@/config/business";
import { posts, getPost } from "@/content/blog";
import { PageHeader } from "@/components/PageHeader";
import { ProductIllustration } from "@/components/ProductIllustration";
import { JsonLd } from "@/components/JsonLd";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.description, url: `/blog/${p.slug}`, publishedTime: p.date },
  };
}

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  return (
    <>
      <PageHeader crumbs={[{ label: "Blog & Insights", href: "/blog" }, { label: p.title, href: `/blog/${p.slug}` }]}
        eyebrow={`${business.name} · ${fmt(p.date)}`} title={p.title} lead={p.description}
        aside={<ProductIllustration type={p.illustration} className="mx-auto hidden w-full max-w-[240px] md:block" />} />
      <article className="nx-container py-14">
        <div className="mx-auto max-w-[70ch] space-y-8 text-[1.06rem] leading-[1.75]">
          {p.sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="nx-h3 mb-3 text-[1.35rem]">{s.heading}</h2>}
              {s.paragraphs.map((t, j) => <p key={j} className={j ? "mt-4" : ""}>{t}</p>)}
              {s.list && (
                <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-accent">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
          <aside aria-label="Related" className="rounded-brand-lg border border-line bg-bg-alt p-6">
            <p className="font-semibold text-heading">Related</p>
            <ul className="mt-2 space-y-1">
              {p.related.map((r) => (
                <li key={r.href}><Link href={r.href} className="font-semibold text-primary hover:underline underline-offset-4">{r.label}</Link></li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
      <CtaSection />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        author: { "@type": "Organization", name: business.name, url: siteUrl },
        publisher: { "@type": "Organization", name: business.name, logo: { "@type": "ImageObject", url: `${siteUrl}/icons/icon-512.png` } },
        mainEntityOfPage: `${siteUrl}/blog/${p.slug}`,
      }} />
    </>
  );
}
