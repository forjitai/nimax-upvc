import { Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { categories } from "@/config/products";
import { ButtonLink } from "@/components/Button";
import { CategoryCard } from "@/components/Cards";
import { CtaSection, SectionHeading } from "@/components/Sections";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ProductIllustration } from "@/components/ProductIllustration";

/** Phase 2 placeholder home. The full homepage is built in Phase 3. */
export default function Home() {
  return (
    <>
      <section className="bg-bg-alt">
        <div className="nx-container grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
          <div>
            <p className="nx-eyebrow mb-4">{business.name} · {business.address.city}</p>
            <h1 className="nx-display">UPVC windows and doors in {business.address.city}</h1>
            <p className="nx-lead mt-5">
              Sliding and casement windows, UPVC doors, aluminium systems, glass partitions and skylights, made to the size of each opening and installed at your site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={telHref(business.primaryPhone)} variant="primary" size="lg" icon={<Phone aria-hidden size={18} />}>Call now</ButtonLink>
              <ButtonLink href={whatsappHref(business.primaryPhone)} variant="whatsapp" size="lg" icon={<WhatsAppIcon size={18} />}>WhatsApp</ButtonLink>
              <ButtonLink href="/products" variant="outline" size="lg">Explore products</ButtonLink>
            </div>
          </div>
          <ProductIllustration type="sliding" title="UPVC sliding window" className="mx-auto w-full max-w-md" />
        </div>
      </section>
      <section className="nx-container py-16">
        <SectionHeading eyebrow="Products & services" title="What we make and install" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
