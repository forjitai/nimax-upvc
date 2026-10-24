import type { Metadata } from "next";
import Link from "next/link";
import { Check, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { categories, categoryHref, installation } from "@/config/products";
import { benefits } from "@/config/benefits";
import { PageHeader } from "@/components/PageHeader";
import { ProductIllustration } from "@/components/ProductIllustration";
import { ButtonLink } from "@/components/Button";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `About ${business.name} | UPVC Windows & Profiles`,
  description: `${business.name} supplies UPVC profiles and supplies and installs UPVC windows, from Kittanahalli on Kadabagere Road, ${business.address.city}.`,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${business.name}`, url: "/about" },
};

const [windows, profiles] = categories;

/*
 * Only verified facts. Do not add a founding year, founder name, staff numbers,
 * turnover, client names, certifications or future plans until the owner supplies them.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "About Us", href: "/about" }]} eyebrow="About us" title={`About ${business.name}`}
        lead={`UPVC profiles for fabricators, and UPVC windows supplied and installed in ${business.address.city}.`} />

      {/* 1. Identity */}
      <section aria-labelledby="identity-title" className="nx-container grid gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="min-w-0">
          <p className="nx-eyebrow mb-4">The {business.name} identity</p>
          <h2 id="identity-title" className="nx-split">Profiles and windows, <em>under one roof</em></h2>
          <div className="mt-6 max-w-[60ch] space-y-4 text-[1.05rem]">
            <p>
              {business.name} is based at Kittanahalli on Kadabagere Road, Byandahalli, in {business.address.city}. We supply
              UPVC profiles, the frame, sash, mullion and bead sections that windows are made from, and we supply and install
              finished UPVC windows.
            </p>
            <p>
              Fabricators come to us for profiles. Homeowners and offices come to us for windows measured to their
              openings and installed by our team.
            </p>
          </div>
        </div>
        <ul className="grid content-start gap-3">
          {[
            [`${profiles.products.length} UPVC profiles`, categoryHref(profiles.slug)],
            [`${windows.products.length} UPVC window styles`, categoryHref(windows.slug)],
            [installation.name, `/services/${installation.slug}`],
            ["Bulk supply for fabricators", "/contact"],
          ].map(([label, href]) => (
            <li key={label}>
              <Link href={href} className="flex items-center gap-3 rounded-brand-lg border border-line bg-bg px-5 py-4 font-semibold text-heading hover:border-primary hover:text-primary">
                <Check aria-hidden size={18} className="shrink-0 text-accent" /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 2. Visual break */}
      <div aria-hidden className="nx-container">
        <div className="grid grid-cols-3 gap-4 rounded-brand-lg bg-bg-dark p-8 sm:grid-cols-6 sm:p-10">
          {(["profile-frames", "profile-sashes", "profile-mullions", "sliding", "casement", "combination"] as const).map((t) => (
            <div key={t} className="rounded-brand bg-on-dark/95 p-3"><ProductIllustration type={t} className="aspect-square w-full" /></div>
          ))}
        </div>
      </div>

      {/* 3. How we work */}
      <section aria-labelledby="work-title" className="nx-container py-16 md:py-20">
        <p className="nx-eyebrow mb-4">How we work</p>
        <h2 id="work-title" className="nx-split max-w-3xl">From <em>profile</em> to <em>fitted window</em></h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { t: "Profiles", d: `Frames, tracks, sashes, mullions, couplers, glazing beads and mesh profiles, supplied to fabricators in the quantities they need.` },
            { t: "Windows", d: `Sliding, casement, tilt and turn, fixed and other window types, made to the size of each opening.` },
            { t: "Installation", d: "Measurement at site, fixing, sealing and finishing, so the window works the way it should." },
          ].map((x, i) => (
            <li key={x.t} className="border-t-[3px] border-accent pt-5">
              <p className="font-display text-sm font-bold tabular-nums text-muted">0{i + 1}</p>
              <h3 className="nx-h3 mt-1">{x.t}</h3>
              <p className="mt-2">{x.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Why choose UPVC */}
      <section aria-labelledby="why-title" className="border-t border-line bg-bg-alt py-16 md:py-20">
        <div className="nx-container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="nx-eyebrow mb-4">Why choose {business.name}</p>
            <h2 id="why-title" className="nx-split">Why choose <em>UPVC windows and profiles</em></h2>
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
        </div>
      </section>

      {/* 5. Company details */}
      <section aria-labelledby="facts-title" className="nx-container py-16">
        <h2 id="facts-title" className="nx-h2 mb-6">Company details</h2>
        <dl className="grid overflow-hidden rounded-brand-lg border border-line text-[0.95rem] sm:grid-cols-2">
          {[
            ["Business name", business.name],
            ["Products", "UPVC profiles, UPVC windows"],
            ["Services", "Window supply and installation, bulk profile supply"],
            ["Area served", business.areaServed.join(", ")],
            ["Address", business.addressOneLine],
            ["Phone / WhatsApp", business.phones.map((p) => p.display).join(" · ")],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-line p-5 sm:[&:nth-child(odd)]:border-r">
              <dt className="text-muted">{k}</dt>
              <dd className="mt-1 font-semibold text-heading">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6. CTA */}
      <section aria-labelledby="cta-about" className="bg-primary text-white">
        <div className="nx-container flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Let&rsquo;s build better spaces</p>
            <h2 id="cta-about" className="nx-split mt-3 !text-white">Your next project <em className="!text-accent">starts here</em>.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="accent" size="lg">Request a quote</ButtonLink>
            <ButtonLink href={telHref(business.primaryPhone)} variant="outline-light" size="lg" icon={<Phone aria-hidden size={18} />}>{business.primaryPhone.display}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
