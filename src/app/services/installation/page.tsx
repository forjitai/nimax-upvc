import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/config/business";
import { categories, categoryHref, installation } from "@/config/products";
import { PageHeader } from "@/components/PageHeader";
import { ProductIllustration } from "@/components/ProductIllustration";
import { EnquiryForm } from "@/components/EnquiryForm";
import { CtaSection } from "@/components/Sections";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `UPVC Window & Door Installation in ${business.address.city}`,
  description: `${business.name} measures, fixes, seals and finishes UPVC windows and doors at your site in ${business.address.city}, for new buildings and replacements.`,
  alternates: { canonical: `/services/${installation.slug}` },
  openGraph: { title: `${installation.name} | ${business.name}`, url: `/services/${installation.slug}` },
};

const stages = [
  { title: "Measuring each opening", text: "Windows and doors are made to fit the opening, so every opening is measured individually." },
  { title: "Preparing the opening", text: "For a replacement, the old frame is removed and the opening is cleaned up before the new frame goes in." },
  { title: "Fixing the frame", text: "The frame is set level and square in the opening and fixed to the wall." },
  { title: "Fitting sashes and glass", text: "Sashes, panels, mesh shutters and hardware are fitted and adjusted so they open and close smoothly." },
  { title: "Sealing", text: "The gap between frame and wall is sealed to keep out water and dust." },
  { title: "Finishing", text: "The work area is cleaned and the operation of each window and door is shown to you." },
];

export default function InstallationPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Installation", href: `/services/${installation.slug}` }]} eyebrow="Service"
        title={installation.name} lead={`${installation.summary} For new buildings and for replacing old windows and doors.`}
        aside={<ProductIllustration type="installation" className="mx-auto hidden w-full max-w-[280px] md:block" />} />

      <section aria-labelledby="stages-title" className="nx-container py-14">
        <h2 id="stages-title" className="nx-h2 mb-8">What installation involves</h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => (
            <li key={s.title} className="border-t-[3px] border-accent pt-5">
              <p className="font-display text-sm font-bold tabular-nums text-muted">Stage {i + 1}</p>
              <h3 className="nx-h3 mt-1">{s.title}</h3>
              <p className="mt-2 text-[0.95rem]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="what-title" className="border-t border-line bg-bg-alt py-14">
        <div className="nx-container">
          <h2 id="what-title" className="nx-h2 mb-6">Products we install</h2>
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(c.slug)} className="inline-block rounded-full border border-line bg-bg px-4 py-2 text-sm font-semibold text-heading hover:border-primary hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="enq-title" className="nx-container py-14">
        <h2 id="enq-title" className="nx-h2 mb-6">Book an installation enquiry</h2>
        <div className="max-w-3xl"><EnquiryForm defaultProduct={installation.name} /></div>
      </section>
      <CtaSection />
    </>
  );
}
