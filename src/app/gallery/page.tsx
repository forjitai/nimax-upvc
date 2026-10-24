import type { Metadata } from "next";
import { business, whatsappHref } from "@/config/business";
import { galleryImages } from "@/config/gallery";
import { categories } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ImageGallery } from "@/components/ImageGallery";
import { CategoryCard } from "@/components/Cards";
import { ButtonLink } from "@/components/Button";
import { CtaSection } from "@/components/Sections";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const ensureStatic = "navigation";

const hasPhotos = galleryImages.length > 0;

export const metadata: Metadata = {
  title: `Our Work: UPVC Windows Gallery`,
  description: `Photos of UPVC windows supplied and installed by ${business.name} in ${business.address.city}.`,
  alternates: { canonical: "/gallery" },
  // Keep an empty gallery out of search results until real photos are added.
  robots: hasPhotos ? undefined : { index: false, follow: true },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Gallery", href: "/gallery" }]} eyebrow="Gallery" title="Our work"
        lead={hasPhotos ? `UPVC windows supplied and installed by ${business.name}.` : undefined} />
      <section aria-label="Photos" className="nx-container py-14">
        {hasPhotos ? (
          <ImageGallery images={galleryImages} />
        ) : (
          <div className="rounded-brand-lg border border-dashed border-line-strong bg-bg-alt p-8 text-center sm:p-12">
            <h2 className="nx-h2">Project photos coming soon</h2>
            <p className="mx-auto mt-3 max-w-[56ch]">
              We are adding photos of recent installations. To see examples of our work now, message us on WhatsApp and we will share photos.
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink href={whatsappHref(business.primaryPhone, `Hello ${business.name}, please share photos of your recent work.`)}
                variant="whatsapp" icon={<WhatsAppIcon size={18} />}>Ask for photos on WhatsApp</ButtonLink>
            </div>
          </div>
        )}
      </section>
      {!hasPhotos && (
        <section aria-labelledby="browse-title" className="border-t border-line py-14">
          <div className="nx-container">
            <h2 id="browse-title" className="nx-h2 mb-8">Browse our products</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
            </div>
          </div>
        </section>
      )}
      <CtaSection />
    </>
  );
}
