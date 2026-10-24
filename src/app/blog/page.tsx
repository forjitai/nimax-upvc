import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { posts } from "@/content/blog";
import { PageHeader } from "@/components/PageHeader";
import { ProductIllustration } from "@/components/ProductIllustration";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Blog & Insights: UPVC Windows and Profiles",
  description: `Guides from ${business.name} on choosing UPVC windows, understanding UPVC profiles and preparing for a quotation.`,
  alternates: { canonical: "/blog" },
  openGraph: { title: `Blog & Insights | ${business.name}`, url: "/blog" },
};

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Blog & Insights", href: "/blog" }]} eyebrow="Blog & insights" title="Guides to UPVC windows and profiles"
        lead="Plain-language articles to help you choose, plan and get a quotation." />
      <section aria-label="Articles" className="nx-container py-14">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-brand-lg border border-line bg-bg">
                <div className="grid aspect-[16/10] place-items-center bg-secondary">
                  <ProductIllustration type={p.illustration} className="h-[70%] w-[70%]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="nx-caption"><time dateTime={p.date}>{fmt(p.date)}</time></p>
                  <h2 className="nx-h3 mt-2 text-[1.2rem]">
                    <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">{p.title}</Link>
                  </h2>
                  <p className="mt-2 text-[0.95rem]">{p.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                    Read article <ArrowRight aria-hidden size={15} />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
