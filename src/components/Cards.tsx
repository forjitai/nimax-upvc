import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category, Product } from "@/config/products";
import { categoryHref, productHref } from "@/config/products";
import { ProductIllustration } from "./ProductIllustration";
import { Scene } from "./Scene";

/** Product card: photo or labelled 3D illustration when available, otherwise the drawing. Whole card is one link. */
export function ProductCard({ product, categorySlug, headingLevel = 3 }: { product: Product; categorySlug: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const photo = product.photos[0];
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-brand-lg border border-line bg-bg transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(20,21,79,0.45)]">
      <div className="relative aspect-square bg-bg-alt">
        {photo ? (
          <>
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className={product.group ? "bg-white object-contain p-3" : "object-cover"} />
            {photo.render && <span className="absolute bottom-2 left-2 rounded-full bg-bg/90 px-2 py-0.5 text-[0.7rem] font-semibold text-muted ring-1 ring-line">3D illustration</span>}
          </>
        ) : (
          <ProductIllustration type={product.illustration} className="absolute inset-0 m-auto size-[78%]" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <H className="nx-h3 text-[1.1rem]">
          <Link href={productHref(categorySlug, product.slug)} className="after:absolute after:inset-0 group-hover:text-primary">
            {product.name}
          </Link>
        </H>
        <p className="text-[0.92rem] leading-relaxed text-body">{product.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
          View details <ArrowRight aria-hidden size={15} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

/** Category card: 3D illustration, name, summary and up to 4 product links. */
export function CategoryCard({ category }: { category: Category }) {
  const shown = category.products.slice(0, 4);
  const more = category.products.length - shown.length;
  return (
    <article className="flex min-w-0 flex-col rounded-brand-lg border border-line bg-bg">
      <Link href={categoryHref(category.slug)} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-brand-lg bg-bg-alt">
          <div className={`absolute inset-0 m-auto transition-transform ${category.slug === "upvc-profiles" ? "h-[92%] w-[92%]" : "h-full w-full"} duration-300 group-hover:scale-[1.03] [&_img]:h-full ${category.slug === "upvc-profiles" ? "[&_img]:object-contain" : ""}`}><Scene name={category.slug === "upvc-profiles" ? "profiles-group" : "combination"} decorative sizes="(min-width:768px) 45vw, 90vw" className={category.slug === "upvc-profiles" ? "" : "!rounded-none object-cover"} /></div>
        </div>
        <div className="px-5 pt-5">
          <h3 className="nx-h3 group-hover:text-primary">{category.name}</h3>
          <p className="mt-2 text-[0.92rem] text-body">{category.summary}</p>
        </div>
      </Link>
      <ul className="mt-3 flex flex-wrap gap-1.5 px-5 pb-5">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={productHref(category.slug, p.slug)}
              className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary hover:bg-secondary-hover">
              {p.name.replace(/^UPVC /, "")}
            </Link>
          </li>
        ))}
        {more > 0 && (
          <li>
            <Link href={categoryHref(category.slug)} className="inline-block px-2 py-1 text-xs font-semibold text-primary underline underline-offset-4">
              +{more} more
            </Link>
          </li>
        )}
      </ul>
    </article>
  );
}
