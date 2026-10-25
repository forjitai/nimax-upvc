import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { categories, allProducts } from "@/config/products";
import { Logo } from "@/components/Logo";
import { Button, ButtonLink } from "@/components/Button";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard, ProductCard } from "@/components/Cards";
import { ProductIllustration } from "@/components/ProductIllustration";
import { ImageGallery } from "@/components/ImageGallery";
import { ContactDetails } from "@/components/ContactDetails";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaSection, SectionHeading } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Design System",
  description: "Internal reference for NIMAX UPVC colours, type and components.",
  robots: { index: false, follow: false },
};

const swatches = [
  ["Primary", "--nx-primary"], ["Primary hover", "--nx-primary-hover"], ["Secondary", "--nx-secondary"],
  ["Accent", "--nx-accent"], ["Background", "--nx-bg"], ["Background alt", "--nx-bg-alt"],
  ["Dark band", "--nx-bg-dark"], ["Heading", "--nx-heading"], ["Body text", "--nx-body"],
  ["Muted text", "--nx-muted"], ["Border", "--nx-border"], ["WhatsApp", "--nx-whatsapp"],
  ["Footer", "--nx-footer-bg"], ["Error", "--nx-error"],
];

const samples = [1, 2, 3, 4, 5, 6].map((i) => ({
  src: `/images/samples/sample-${i}.jpg`, width: 1200, height: 900,
  alt: `Sample placeholder ${i}`, caption: `Sample ${i}`, category: i % 2 ? "Sliding" : "Casement",
}));

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-12">
      <h2 id={id} className="nx-h2 mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <div className="nx-container py-10">
        <Breadcrumbs items={[{ label: "Design System", href: "/design-system" }]} />
        <p className="nx-eyebrow mt-8">Internal · not indexed</p>
        <h1 className="nx-display mt-2">NIMAX UPVC design system</h1>
        <p className="nx-lead mt-4">
          Colours live in <code>src/config/theme.css</code>, business details in <code>src/config/business.ts</code>,
          and products in <code>src/config/products.ts</code>. Change them there and every page follows.
        </p>

        <Block id="logo" title="Logo">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-center rounded-brand-lg border border-line p-8"><Logo height={56} link={false} /></div>
            <div className="flex items-center justify-center rounded-brand-lg bg-footer p-8"><Logo variant="white" height={56} link={false} /></div>
            <div className="flex items-end justify-center gap-4 rounded-brand-lg border border-line p-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-192.png" alt="Logo mark" width={64} height={64} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-192.png" alt="" width={32} height={32} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-192.png" alt="" width={16} height={16} />
            </div>
          </div>
          <p className="nx-caption mt-3">The mark is a window frame whose glazing bars form an N; the brass diagonal echoes window hardware.</p>
        </Block>

        <Block id="colours" title="Colours">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {swatches.map(([name, v]) => (
              <li key={v} className="overflow-hidden rounded-brand border border-line">
                <div className="h-16" style={{ background: `var(${v})` }} />
                <div className="p-2.5">
                  <p className="text-sm font-semibold text-heading">{name}</p>
                  <p className="font-mono text-[0.7rem] text-muted">{v}</p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="type" title="Typography">
          <div className="space-y-5">
            <div><p className="nx-caption">Display · Archivo Expanded 800</p><p className="nx-display">UPVC windows, made to measure</p></div>
            <div><p className="nx-caption">Section heading · Archivo 750</p><p className="nx-h2">Sliding, casement and tilt and turn</p></div>
            <div><p className="nx-caption">Product name · Archivo 700</p><p className="nx-h3">UPVC Casement Windows</p></div>
            <div><p className="nx-caption">Eyebrow</p><p className="nx-eyebrow">Products & services</p></div>
            <div><p className="nx-caption">Lead · Manrope</p><p className="nx-lead">Every window is fabricated to the size of the opening at your site.</p></div>
            <div><p className="nx-caption">Body · Manrope 400</p><p className="max-w-[68ch]">UPVC frames do not need painting and do not rust or rot. A sliding window opens without taking up room inside or outside, which suits balconies and rooms where a swinging sash would get in the way.</p></div>
          </div>
        </Block>

        <Block id="buttons" title="Buttons">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Get a Quote</ButtonLink>
            <ButtonLink href={telHref(business.primaryPhone)} variant="accent" icon={<Phone aria-hidden size={18} />}>Call now</ButtonLink>
            <ButtonLink href={whatsappHref(business.primaryPhone)} variant="whatsapp" icon={<WhatsAppIcon size={18} />}>WhatsApp</ButtonLink>
            <ButtonLink href="/products" variant="outline">Explore products</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 rounded-brand-lg bg-bg-dark p-5">
            <ButtonLink href="/contact" variant="accent">On dark</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">Outline light</ButtonLink>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="sm">Small</ButtonLink>
            <ButtonLink href="/contact" size="md">Medium</ButtonLink>
            <ButtonLink href="/contact" size="lg">Large</ButtonLink>
          </div>
        </Block>

        <Block id="illustrations" title={`Product drawings (${allProducts.length + 1})`}>
          <p className="mb-5 max-w-[68ch]">Stand-ins until real photos arrive. Dashed triangles point to the hinge side; arrows show sliding direction.</p>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {allProducts.map((p) => (
              <li key={p.slug} className="rounded-brand border border-line bg-bg-alt p-2">
                <ProductIllustration type={p.illustration} title={p.name} className="aspect-square w-full" />
                <p className="mt-1 text-center text-[0.7rem] leading-tight text-body">{p.name.replace(/^UPVC /, "")}</p>
              </li>
            ))}
            <li className="rounded-brand border border-line bg-bg-alt p-2">
              <ProductIllustration type="installation" title="Installation" className="aspect-square w-full" />
              <p className="mt-1 text-center text-[0.7rem] leading-tight text-body">Installation</p>
            </li>
          </ul>
        </Block>

        <Block id="category-cards" title="Category cards">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </Block>

        <Block id="product-cards" title="Product cards">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories[0].products.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} categorySlug={categories[0].slug} />)}
          </div>
        </Block>

        <Block id="section-heading" title="Section heading">
          <SectionHeading eyebrow="Our products" title="UPVC windows for every opening"
            lead="Choose the opening style that suits the room. We make each frame to the size of your opening." />
        </Block>

        <Block id="gallery" title="Image gallery">
          <p className="mb-5 max-w-[68ch]">Grid with category filter and a lightbox (arrow keys and Escape work). These are labelled sample images, not project photos.</p>
          <ImageGallery images={samples} />
        </Block>

        <Block id="contact" title="Contact details and enquiry form">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <ContactDetails />
            <EnquiryForm />
          </div>
        </Block>
      </div>
      <CtaSection />
    </>
  );
}
