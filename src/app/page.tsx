import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { business, siteUrl, telHref, whatsappHref } from "@/config/business";
import { categories, categoryHref, installation, productHref } from "@/config/products";
import { ButtonLink } from "@/components/Button";
import { CategoryCard, ProductCard } from "@/components/Cards";
import { ContactDetails } from "@/components/ContactDetails";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeroWindow } from "@/components/HeroWindow";
import { JsonLd } from "@/components/JsonLd";
import { ProductIllustration } from "@/components/ProductIllustration";
import { CtaSection, SectionHeading } from "@/components/Sections";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: { absolute: `UPVC Windows & Doors in ${business.address.city} | ${business.name}` },
  description: `UPVC sliding and casement windows, UPVC doors, aluminium windows, glass partitions and skylights, supplied and installed in ${business.address.city}. Call ${business.primaryPhone.display}.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `UPVC Windows & Doors in ${business.address.city} | ${business.name}`,
    description: `UPVC windows, UPVC doors, aluminium systems, glass partitions and skylights in ${business.address.city}.`,
    url: "/",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: business.name }],
  },
};

const [windows, doors] = categories;

const quickLinks = [
  ["upvc-windows", "sliding-windows"], ["upvc-windows", "casement-windows"], ["upvc-windows", "tilt-and-turn-windows"],
  ["upvc-doors", "sliding-doors"], ["upvc-doors", "french-doors"], ["upvc-doors", "mesh-doors"],
  ["upvc-windows", "mesh-windows"], ["glass-systems", "glass-partitions"],
].map(([c, s]) => {
  const cat = categories.find((x) => x.slug === c)!;
  const p = cat.products.find((x) => x.slug === s)!;
  return { href: productHref(c, s), label: p.name };
});

/** General properties of UPVC as a material. No brand or performance figures. */
const benefits = [
  { title: "No painting, no rust", text: "UPVC frames do not rust, rot or attract termites, and never need repainting." },
  { title: "Easy to clean", text: "A wipe with water and mild soap keeps the frames looking new." },
  { title: "Sealed against weather", text: "Gaskets around each sash help keep out rain, wind and dust when the window is shut." },
  { title: "Quieter rooms", text: "Well-sealed UPVC windows can cut down noise from traffic and the street." },
  { title: "Stays cooler", text: "UPVC is a poor conductor of heat, which helps keep rooms comfortable." },
  { title: "Many opening styles", text: "Sliding, casement, tilt and turn, fixed, folding and more, to suit each room." },
];

const steps = [
  { title: "Call or WhatsApp", text: `Tell us how many windows or doors you need and where your site is.` },
  { title: "Site measurement", text: "Each opening is measured, and we talk through the styles that suit each room." },
  { title: "Quotation", text: "You receive a quotation for the products you choose." },
  { title: "Installation", text: "The windows and doors are fixed, sealed and finished at your site." },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-bg-dark text-on-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(var(--nx-on-dark) 1px, transparent 1px), linear-gradient(90deg, var(--nx-on-dark) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="nx-container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-on-dark/20 px-3 py-1 text-[0.8rem] font-semibold text-on-dark-muted">
              <MapPin aria-hidden size={14} className="text-accent" /> {business.address.locality}, {business.address.city}
            </p>
            <h1 id="hero-title" className="nx-display !text-on-dark lg:!text-[3.1rem] xl:!text-[3.4rem]">
              UPVC windows and doors for homes and offices in <span className="text-accent">{business.address.city}</span>
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-on-dark-muted">
              {business.name} supplies and installs UPVC sliding and casement windows, UPVC doors, aluminium windows and doors, glass partitions and skylights.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={telHref(business.primaryPhone)} variant="accent" size="lg" icon={<Phone aria-hidden size={18} />}>
                Call {business.primaryPhone.display}
              </ButtonLink>
              <ButtonLink href={whatsappHref(business.primaryPhone)} variant="whatsapp" size="lg" icon={<WhatsAppIcon size={18} />}>
                WhatsApp
              </ButtonLink>
              <ButtonLink href="/products" variant="outline-light" size="lg">Explore products</ButtonLink>
            </div>
          </div>
          <HeroWindow />
        </div>
      </section>

      {/* 2. Popular products strip */}
      <nav aria-label="Popular products" className="border-b border-line bg-bg">
        <div className="nx-container flex items-center gap-3 overflow-x-auto py-4 [scrollbar-width:none]">
          <span className="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-muted">Popular</span>
          {quickLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm font-semibold text-heading hover:border-primary hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* 3. Company introduction */}
      <section aria-labelledby="intro-title" className="nx-container grid gap-10 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="nx-eyebrow mb-3">Welcome to {business.name}</p>
          <h2 id="intro-title" className="nx-h2">Windows, doors and glass systems, from one team</h2>
          <div className="nx-prose mt-5 space-y-4 text-[1.04rem]">
            <p>
              {business.name} is based on Kadabagere Road at Kittanahalli, Bengaluru. We supply UPVC windows and doors in
              all the common opening styles, along with aluminium windows and doors, aluminium glass partitions and glass
              skylights, and we install them at your site.
            </p>
            <p>
              Whether it is one bathroom ventilator or every window in a new building, call or WhatsApp us with your
              requirement and we will take it from there.
            </p>
          </div>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
            About {business.name} <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
        <dl className="grid content-start gap-0 rounded-brand-lg border border-line bg-bg-alt p-6 text-sm">
          {[
            ["Business", business.name],
            ["Products", "UPVC windows & doors, aluminium windows & doors, glass partitions, skylights"],
            ["Service", "Supply and installation"],
            ["Area", business.areaServed.join(", ")],
            ["Address", business.addressOneLine],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[96px_1fr] gap-3 border-b border-line py-3 last:border-0">
              <dt className="font-semibold text-muted">{k}</dt>
              <dd className="text-heading">{v}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[96px_1fr] gap-3 pt-3">
            <dt className="font-semibold text-muted">Phone</dt>
            <dd className="space-y-1">
              {business.phones.map((p) => (
                <a key={p.e164} href={telHref(p)} className="block font-semibold tabular-nums text-primary hover:underline">{p.display}</a>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {/* 4. Product categories */}
      <section aria-labelledby="cats-title" className="bg-bg-alt py-16 md:py-20">
        <div className="nx-container">
          <SectionHeading id="cats-title" eyebrow="Products & services" title="What we supply and install"
            lead="Four product families, each in several opening styles. Open a category to see every option." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      {/* 5. UPVC windows */}
      <section aria-labelledby="windows-title" className="nx-container py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="windows-title" eyebrow="UPVC windows" title="A window style for every room" />
          <Link href={categoryHref(windows.slug)} className="mb-10 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
            All {windows.products.length} window types <ArrowRight aria-hidden size={16} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {windows.products.slice(0, 8).map((p, i) => (
            <div key={p.slug} className={`grid ${i >= 4 ? "max-sm:hidden" : ""}`}>
              <ProductCard product={p} categorySlug={windows.slug} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. UPVC doors */}
      <section aria-labelledby="doors-title" className="border-t border-line py-16 md:py-20">
        <div className="nx-container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="doors-title" eyebrow="UPVC doors" title="Doors for balconies, patios and bathrooms" />
            <Link href={categoryHref(doors.slug)} className="mb-10 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
              All {doors.products.length} door types <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doors.products.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} categorySlug={doors.slug} />)}
          </div>
        </div>
      </section>

      {/* 7. Benefits of UPVC */}
      <section aria-labelledby="benefits-title" className="bg-bg-alt py-16 md:py-20">
        <div className="nx-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="benefits-title" eyebrow="Why UPVC" title="Why homeowners choose UPVC"
              lead="UPVC (unplasticised polyvinyl chloride) is a rigid, long-lasting material used for window and door frames." />
            <ProductIllustration type="casement" className="hidden w-full max-w-xs lg:block" />
          </div>
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check aria-hidden size={18} />
                </span>
                <div>
                  <h3 className="nx-h3 text-[1.08rem]">{b.title}</h3>
                  <p className="mt-1.5 text-[0.95rem]">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. How to get started */}
      <section aria-labelledby="steps-title" className="nx-container py-16 md:py-20">
        <SectionHeading id="steps-title" eyebrow="How it works" title="From first call to fitted window" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-[3px] border-accent pt-5">
              <p className="font-display text-sm font-bold tabular-nums text-muted">Step {i + 1}</p>
              <h3 className="nx-h3 mt-1">{s.title}</h3>
              <p className="mt-2 text-[0.95rem]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-brand-lg border border-line p-5">
          <ProductIllustration type="installation" className="size-16 shrink-0" />
          <p className="min-w-0 flex-1 text-heading"><strong>{installation.name}.</strong> {installation.summary}</p>
          <ButtonLink href={`/services/${installation.slug}`} variant="outline" size="sm">About installation</ButtonLink>
        </div>
      </section>

      {/* 9. Contact + enquiry */}
      <section aria-labelledby="contact-title" className="border-t border-line bg-bg-alt py-16 md:py-20">
        <div className="nx-container">
          <SectionHeading id="contact-title" eyebrow="Contact us" title="Tell us what you are looking for"
            lead="Call, WhatsApp, or fill in the form and it opens in WhatsApp with your details ready to send." />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <ContactDetails />
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* 10. Closing CTA */}
      <CtaSection />

      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", name: business.name, url: siteUrl },
          {
            "@type": "HomeAndConstructionBusiness",
            name: business.name,
            url: siteUrl,
            image: `${siteUrl}/icons/icon-512.png`,
            telephone: business.phones.map((p) => p.e164),
            address: {
              "@type": "PostalAddress",
              streetAddress: business.address.street,
              addressLocality: business.address.city,
              addressRegion: business.address.region,
              postalCode: business.address.postalCode,
              addressCountry: business.address.countryCode,
            },
            areaServed: business.areaServed.map((a) => ({ "@type": "City", name: a })),
            hasMap: business.mapsUrl,
          },
        ],
      }} />
    </>
  );
}
