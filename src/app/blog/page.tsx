import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import { business } from "@/config/business";
import { blogCategories, posts } from "@/content/blog";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { ProfileCatalogue } from "@/components/ProfileCatalogue";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: "Blog & Insights: UPVC Windows and Profiles",
  description: `Guides from ${business.name} on choosing UPVC windows, UPVC profiles for fabricators, mosquito mesh, and caring for your windows.`,
  alternates: { canonical: "/blog" },
  openGraph: { ...ogDefaults, title: `Blog & Insights | ${business.name}`, url: "/blog" },
};

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Blog & Insights", href: "/blog" }]} eyebrow="Blog & insights" title="Guides to UPVC windows and profiles"
        lead="Plain-language articles to help you choose, plan, fabricate and look after UPVC windows." />
      <section aria-label="Articles" className="nx-container py-14">
        <ProfileCatalogue noun="articles" allLabel="All articles" placeholder="Search articles"
          gridClass="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          groups={blogCategories}
          items={sorted.map((p) => ({ slug: p.slug, name: `${p.title} ${p.description}`, group: p.category, card: <PostCard post={p} /> }))} />
      </section>
      <CtaSection title="Have a question we haven't answered?" text="Call or WhatsApp us. We are happy to help you choose the right windows or profiles." />
    </>
  );
}
