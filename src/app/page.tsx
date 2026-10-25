import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { benefits } from "@/config/benefits";
import { business, siteUrl, telHref, whatsappHref } from "@/config/business";
import { categories, categoryHref } from "@/config/products";
import { ButtonLink } from "@/components/Button";
import { ProductCard } from "@/components/Cards";
import { HeroWindow } from "@/components/HeroWindow";
import { JsonLd } from "@/components/JsonLd";
import { ProductIllustration } from "@/components/ProductIllustration";
import { FeatureBlock, VisualPanel } from "@/components/FeatureBlock";
import { Slideshow, type Slide } from "@/components/Slideshow";
import { Faq, type FaqItem } from "@/components/Faq";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: { absolute: `UPVC Windows & Profiles in ${business.address.city} | ${business.name}` },
  description: `UPVC sliding, casement, tilt and turn and other UPVC windows, plus UPVC profiles, supplied and installed in ${business.address.city}. Call ${business.primaryPhone.display}.`,
  alternates: { canonical: "/" },
  openGraph: { ...ogDefaults,
    title: `UPVC Windows & Profiles in ${business.address.city} | ${business.name}`,
    description: `UPVC windows in every common opening style and UPVC profiles in ${business.address.city}.`,
    url: "/",
  },
};

const [windows, profiles] = categories;
const featuredProfiles = ["55mm-sliding", "57mm-sliding-sash", "90mm-2-track", "60mm-casement", "88mm-sash-mullion", "5mm-sliding-bead", "52mm-mesh-sliding", "t-mullion"]
  .map((s) => profiles.products.find((p) => p.slug === s)!).filter(Boolean);
const w = (slug: string) => windows.products.find((p) => p.slug === slug)!;

const slides: Slide[] = [
  { key: "sliding", label: "Profiles · Windows · Installation", title: "Sliding windows", text: w("sliding-windows").details.split(". ")[0] + ".",
    visual: <ProductIllustration type="sliding" className="w-full" /> },
  { key: "casement", label: "Profiles · Windows · Installation", title: "Casement windows", text: w("casement-windows").summary,
    visual: <ProductIllustration type="casement" className="w-full" /> },
  { key: "tilt", label: "Profiles · Windows · Installation", title: "Tilt and turn windows", text: w("tilt-and-turn-windows").summary,
    visual: <ProductIllustration type="tilt-turn" className="w-full" /> },
  { key: "profile", label: "Profiles · Windows · Installation", title: "UPVC profiles", text: `${profiles.products.length} profiles: frames, tracks, sashes, mullions, couplers, glazing beads and mesh.`,
    visual: <ProductIllustration type="profile" className="w-full" /> },
];

const offer = ["UPVC window profiles", "UPVC windows in 11 styles", "Window installation", "Mesh and ventilator windows"];

/** What working with NIMAX means. Only things that follow from confirmed facts. */
const values = [
  { title: "Profiles and windows in one place", text: "Buy UPVC profiles for fabrication, or finished windows, from the same supplier." },
  { title: "Measured for your openings", text: "Windows are made to the size of each opening, not picked off a shelf." },
  { title: "Supply and installation", text: "One team from the first measurement to the sealed, finished window." },
  { title: "Easy to reach", text: `Two phone numbers, both on WhatsApp, and a base on Kadabagere Road, ${business.address.city}.` },
];


const faqs: FaqItem[] = [
  { q: `What does ${business.name} supply?`, a: "UPVC windows in eleven opening styles (sliding, casement, tilt and turn, fixed, top hung, French, combination, folding, bay, ventilator and mesh windows) and UPVC profiles for window fabrication. We also install the windows we supply." },
  { q: "Which UPVC window type should I choose?", a: "Sliding windows save space and suit balconies and bedrooms. Casement and French windows open fully for the most airflow. Tilt and turn windows add secure ventilation. Fixed windows bring in light where no opening is needed. Tell us about the room and we will suggest options." },
  { q: "Can you make windows to custom sizes?", a: "Yes. Each window is made to the size of its opening, so every opening is measured before fabrication." },
  { q: "How much do UPVC windows cost?", a: "The price depends on the window type, size, glass and the number of windows. Call or WhatsApp us with your requirement and we will give you a quotation." },
  { q: "What details should I send for a quotation?", a: "The window types you want, the number of windows, approximate sizes if you know them, whether it is a new building or a replacement, and your area. Photos of the openings on WhatsApp help too." },
  { q: "Do you supply UPVC profiles in bulk to fabricators?", a: "Yes, we supply UPVC profiles. Contact us with the profile types and quantities you need." },
  { q: "Which areas do you serve?", a: `We are based at Kittanahalli, Kadabagere Road, ${business.address.city}, and serve customers in ${business.areaServed.join(", ")}.` },
  { q: "Do you also replace old wooden or aluminium windows?", a: "Yes. The old frame is removed, the opening is prepared, and the new UPVC window is fixed, sealed and finished." },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-bg-dark text-on-dark">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(var(--nx-on-dark) 1px, transparent 1px), linear-gradient(90deg, var(--nx-on-dark) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="nx-container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-light">{business.tagline}</p>
            <h1 id="hero-title" className="font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.02em] !text-on-dark">
              UPVC windows,<br /><em className="font-medium italic text-accent">built around</em> your home.
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-on-dark-muted">
              {business.name} supplies UPVC profiles and supplies and installs UPVC windows in every common opening style, made to the size of each opening in {business.address.city}.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products" variant="accent" size="lg">Explore products</ButtonLink>
              <ButtonLink href="/contact" variant="outline-light" size="lg">Get a quote</ButtonLink>
            </div>
          </div>
          <HeroWindow />
        </div>
      </section>

      {/* 2–4. Feature blocks */}
      <FeatureBlock id="f-windows" eyebrow="UPVC windows"
        title={<>Windows for <em>every room</em></>}
        visual={<VisualPanel><ProductIllustration type="combination" title="UPVC combination window" className="w-full" /></VisualPanel>}
        actions={<>
          <ButtonLink href={categoryHref(windows.slug)}>Explore windows</ButtonLink>
          <ButtonLink href={whatsappHref(business.primaryPhone, `Hello ${business.name}, I would like to discuss UPVC windows for my project.`)} variant="outline">Discuss your project</ButtonLink>
        </>}>
        <p>Sliding, casement, fixed and tilt and turn windows, plus top hung, French, combination, folding, bay, ventilator and mesh windows.</p>
        <p>Each one is made to the size of its opening, for new buildings and replacements.</p>
      </FeatureBlock>

      <FeatureBlock id="f-profiles" eyebrow="For fabricators" reverse tone="alt"
        title={<>UPVC profiles, <em>ready to fabricate</em></>}
        visual={<VisualPanel><ProductIllustration type="profile" title="Cross-section of a UPVC profile" className="w-full" /></VisualPanel>}
        actions={<>
          <ButtonLink href={categoryHref(profiles.slug)}>View UPVC profiles</ButtonLink>
          <ButtonLink href={whatsappHref(business.primaryPhone, `Hello ${business.name}, I have a bulk enquiry for UPVC profiles.`)} variant="outline">Bulk enquiry</ButtonLink>
        </>}>
        <p>{profiles.products.length} profiles for window fabrication: frames and tracks, sliding and out-swing sashes, mullions and couplers, glazing beads and mesh profiles.</p>
      </FeatureBlock>

      <FeatureBlock id="f-plan" eyebrow="New build or renovation"
        title={<>Planning a project? <em>Start with a call.</em></>}
        visual={<VisualPanel><ProductIllustration type="installation" title="Window measurement and installation" className="w-full" /></VisualPanel>}
        actions={<>
          <ButtonLink href="/contact">Request a quotation</ButtonLink>
          <ButtonLink href="/about" variant="outline">About {business.name}</ButtonLink>
        </>}>
        <p>Tell us how many windows you need and where your site is. We measure each opening, help you choose the styles, quote, and install.</p>
      </FeatureBlock>

      {/* 5. Slideshow */}
      <section aria-label="Highlights" className="nx-container py-16 md:py-20">
        <Slideshow slides={slides} />
      </section>

      {/* 6–7. Intro + about with checklist */}
      <section aria-labelledby="about-title" className="bg-bg-alt py-16 md:py-24">
        <div className="nx-container grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="nx-eyebrow mb-4">Quality &amp; design</p>
            <h2 id="about-title" className="nx-split">Windows that <em>fit</em>, profiles that <em>last</em></h2>
          </div>
          <div>
            <p className="text-[1.05rem]">
              {business.name} is based at Kittanahalli on Kadabagere Road, {business.address.city}. We supply UPVC profiles and
              supply and install UPVC windows for homes and offices.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {offer.map((o) => (
                <li key={o} className="flex items-center gap-3 rounded-brand border border-line bg-bg px-4 py-3 font-semibold text-heading">
                  <Check aria-hidden size={18} className="shrink-0 text-accent" /> {o}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about">More about {business.name}</ButtonLink>
              <ButtonLink href="/products" variant="outline">Explore our products</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Product showcase */}
      <section aria-labelledby="range-title" className="nx-container py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="nx-eyebrow mb-4">Our range</p>
            <h2 id="range-title" className="nx-split">Our <em>UPVC windows</em></h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
            View all products <ArrowRight aria-hidden size={16} />
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

      {/* 8b. Profile showcase (Fenstas "Our uPVC Profiles") */}
      <section aria-labelledby="profiles-range-title" className="border-t border-line bg-bg-alt py-16 md:py-24">
        <div className="nx-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="nx-eyebrow mb-4">For fabricators</p>
              <h2 id="profiles-range-title" className="nx-split">Our <em>UPVC profiles</em></h2>
            </div>
            <Link href={categoryHref(profiles.slug)} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline underline-offset-4">
              All {profiles.products.length} profiles <ArrowRight aria-hidden size={16} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProfiles.map((p, i) => (
              <div key={p.slug} className={`grid ${i >= 4 ? "max-sm:hidden" : ""}`}>
                <ProductCard product={p} categorySlug={profiles.slug} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9–10. Why NIMAX */}
      <section aria-labelledby="why-title" className="bg-bg-dark py-16 text-on-dark md:py-24">
        <div className="nx-container grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-accent-light">Why {business.name}</p>
            <h2 id="why-title" className="nx-split !text-on-dark [&_em]:!text-accent">Profiles and windows, <em>from one team</em></h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2">
            {values.map((v, n) => (
              <li key={v.title} className="border-t border-on-dark/20 pt-5">
                <p className="font-display text-sm font-bold tabular-nums text-accent">0{n + 1}</p>
                <h3 className="nx-h3 mt-2 !text-on-dark">{v.title}</h3>
                <p className="mt-2 text-on-dark-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12. Benefits grid */}
      <section aria-labelledby="benefits-title" className="nx-container py-16 md:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="nx-eyebrow mb-4">Why UPVC</p>
          <h2 id="benefits-title" className="nx-split">Built for <em>Bengaluru weather</em></h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-brand-lg border border-line bg-bg p-7">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-primary"><Icon aria-hidden size={22} /></span>
              <h3 className="nx-h3 mt-5">{title}</h3>
              <p className="mt-2 text-[0.96rem]">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 13. FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line bg-bg-alt py-16 md:py-24">
        <div className="nx-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="nx-eyebrow mb-4">FAQ</p>
            <h2 id="faq-title" className="nx-split">Questions, <em>answered</em></h2>
            <div className="mt-8 rounded-brand-lg bg-bg-dark p-6 text-on-dark">
              <p className="font-display text-lg font-bold">Planning a project?</p>
              <p className="mt-2 text-sm text-on-dark-muted">Call or WhatsApp us with your requirement.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonLink href={telHref(business.primaryPhone)} variant="accent" size="sm" icon={<Phone aria-hidden size={15} />}>Call</ButtonLink>
                <ButtonLink href={whatsappHref(business.primaryPhone)} variant="whatsapp" size="sm" icon={<WhatsAppIcon size={15} />}>WhatsApp</ButtonLink>
              </div>
            </div>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* 14. Closing CTA */}
      <section aria-labelledby="close-title" className="bg-primary text-white">
        <div className="nx-container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 id="close-title" className="nx-split !text-white">Let&rsquo;s build <em className="!text-accent">better spaces</em>.</h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="accent" size="lg">Request a quote</ButtonLink>
            <ButtonLink href={telHref(business.primaryPhone)} variant="outline-light" size="lg" icon={<Phone aria-hidden size={18} />}>{business.primaryPhone.display}</ButtonLink>
          </div>
        </div>
      </section>

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
