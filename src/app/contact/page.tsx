import type { Metadata } from "next";
import { ogDefaults } from "@/lib/seo";
import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { PageHeader } from "@/components/PageHeader";
import { EnquiryForm } from "@/components/EnquiryForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: `Contact ${business.name} | Call, WhatsApp, Directions`,
  description: `Call or WhatsApp ${business.name} on ${business.phones.map((p) => p.display).join(" or ")}. ${business.address.street}, ${business.address.city} ${business.address.postalCode}.`,
  alternates: { canonical: "/contact" },
  openGraph: { ...ogDefaults, title: `Contact ${business.name}`, url: "/contact" },
};

const include = [
  "Which window types you need (for example sliding, casement or mesh windows), or the UPVC profiles and quantities",
  "How many windows, and rough sizes if you know them",
  "Whether it is a new building or a replacement",
  "Your area in Bengaluru",
  "Photos of the openings, if you have them (send on WhatsApp)",
];

const card = "flex min-w-0 flex-col gap-3 rounded-brand-lg border border-line bg-bg p-6";
const icon = "inline-flex size-11 items-center justify-center rounded-full bg-secondary text-primary";

export default function ContactPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Contact Us", href: "/contact" }]} eyebrow="Contact us" title={`Contact ${business.name}`}
        lead={`Call or WhatsApp either number, visit us at ${business.locations.map((l) => l.name).join(" or ")}, or send your requirement using the form.`} />

      {/* 1. Contact cards (Fenstas "Visit our store") */}
      <section aria-labelledby="visit-title" className="nx-container py-14">
        <h2 id="visit-title" className="nx-split mb-8">Visit <em>or call us</em></h2>
        <ul className="mb-5 grid gap-5 md:grid-cols-2">
          {business.locations.map((l) => (
            <li key={l.id} className={card}>
              <div className="flex items-center gap-3">
                <span className={icon}><MapPin aria-hidden size={20} /></span>
                <h3 className="nx-h3 text-[1.05rem]">{l.name}</h3>
              </div>
              <address className="not-italic text-[0.95rem]">
                {l.street},<br />
                {l.landmark && <>{l.landmark},<br /></>}
                {l.locality === l.city ? l.city : `${l.locality}, ${l.city}`}, {l.region} {l.postalCode}
              </address>
              <div className="mt-auto flex flex-wrap gap-4 text-sm font-semibold">
                <a href={l.directionsUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4">
                  <Navigation aria-hidden size={15} /> Get directions<span className="sr-only"> to {l.name}</span>
                </a>
                <a href={`#map-${l.id}`} className="text-primary hover:underline underline-offset-4">See map<span className="sr-only"> of {l.name}</span></a>
              </div>
            </li>
          ))}
        </ul>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {business.phones.map((p) => (
            <li key={p.e164} className={card}>
              <span className={icon}><Phone aria-hidden size={20} /></span>
              <h3 className="nx-h3 text-[1.05rem]">{p.label}</h3>
              <a href={telHref(p)} className="font-display text-xl font-bold tabular-nums text-heading hover:text-primary">{p.display}</a>
              <div className="mt-auto flex flex-wrap gap-3 text-sm font-semibold">
                <a href={telHref(p)} className="text-primary hover:underline underline-offset-4">Call</a>
                <a href={whatsappHref(p)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-whatsapp hover:underline underline-offset-4">
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
              </div>
            </li>
          ))}
          <li className={card}>
            <span className={icon}><MessageCircle aria-hidden size={20} /></span>
            <h3 className="nx-h3 text-[1.05rem]">Bulk & fabricator enquiries</h3>
            <p className="text-[0.95rem]">Send your profile list and quantities on WhatsApp for a bulk quotation.</p>
            <a href={whatsappHref(business.primaryPhone, `Hello ${business.name}, I have a bulk enquiry for UPVC profiles.`)} target="_blank" rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-whatsapp hover:underline underline-offset-4">
              <WhatsAppIcon size={15} /> Bulk enquiry
            </a>
          </li>
        </ul>
      </section>

      {/* 2. Maps */}
      <section aria-labelledby="map-title" className="border-t border-line bg-bg-alt py-14">
        <div className="nx-container">
          <h2 id="map-title" className="nx-split mb-8">Find <em>us</em></h2>
          <div className="grid gap-8 md:grid-cols-2">
            {business.locations.map((l) => (
              <div key={l.id} id={`map-${l.id}`} className="min-w-0 scroll-mt-28">
                <h3 className="nx-h3 mb-3 text-[1.05rem]">{l.name}</h3>
                <div className="overflow-hidden rounded-brand-lg border border-line bg-bg">
                  <iframe src={l.mapEmbedUrl} title={`Map showing ${business.name}, ${l.name}`}
                    loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block aspect-[4/3] w-full border-0" />
                </div>
                <a href={l.directionsUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4">
                  <Navigation aria-hidden size={15} /> Get directions to {l.name}
                </a>
              </div>
            ))}
          </div>
          <p className="nx-caption mt-4">The maps search for each address. Use Get directions for turn-by-turn navigation.</p>
        </div>
      </section>

      {/* 3. Form */}
      <section aria-labelledby="touch-title" className="py-14">
        <div className="nx-container grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <h2 id="touch-title" className="nx-split mb-6">Get <em>in touch</em></h2>
            <EnquiryForm />
          </div>
          <div className="min-w-0 lg:pt-20">
            <div className="rounded-brand-lg border border-line bg-bg-alt p-6">
              <h3 className="font-semibold text-heading">To get an accurate quotation, tell us:</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem]">
                {include.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
