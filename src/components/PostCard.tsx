import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogCategories, type Post } from "@/content/blog";
import { ProductIllustration } from "./ProductIllustration";

export const fmtDate = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

/** Blog card: drawing, category, date, reading time, title, summary. Whole card is one link. */
export function PostCard({ post, headingLevel = 2 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const cat = blogCategories.find((c) => c.id === post.category)?.name;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-brand-lg border border-line bg-bg transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(20,21,79,0.45)]">
      <div className="relative grid aspect-[16/10] place-items-center bg-secondary">
        <ProductIllustration type={post.illustration} className="h-[68%] w-[68%]" />
        <span className="absolute left-4 top-4 rounded-full bg-bg px-3 py-1 text-xs font-bold text-primary">{cat}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="nx-caption flex items-center gap-3">
          <time dateTime={post.date}>{fmtDate(post.date)}</time>
          <span className="inline-flex items-center gap-1"><Clock aria-hidden size={13} /> {post.minutes} min read</span>
        </p>
        <H className="nx-h3 mt-2 text-[1.2rem]">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-primary">{post.title}</Link>
        </H>
        <p className="mt-2 text-[0.95rem]">{post.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
          Read more <ArrowRight aria-hidden size={15} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
