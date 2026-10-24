import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { business, telHref, whatsappHref } from "@/config/business";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Eyebrow + H2 + optional lead paragraph */
export function SectionHeading({ eyebrow, title, lead, align = "left", id }: {
  eyebrow?: string; title: string; lead?: ReactNode; align?: "left" | "center"; id?: string;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="nx-eyebrow mb-3">{eyebrow}</p>}
      <h2 id={id} className="nx-h2">{title}</h2>
      {lead && <p className={`nx-lead mt-4 ${align === "center" ? "mx-auto" : ""}`}>{lead}</p>}
    </div>
  );
}

/** Dark call-to-action band with call, WhatsApp and quote actions */
export function CtaSection({ title = "Planning new UPVC windows?", text = "Tell us the number of openings and your location. We will arrange a site visit and give you a quotation." }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-bg-dark text-on-dark">
      <div className="nx-container grid items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 id="cta-title" className="nx-h2 !text-on-dark">{title}</h2>
          <p className="mt-3 max-w-[56ch] text-on-dark-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href={telHref(business.primaryPhone)} variant="accent" size="lg" icon={<Phone aria-hidden size={18} />}>
            Call {business.primaryPhone.display}
          </ButtonLink>
          <ButtonLink href={whatsappHref(business.primaryPhone)} variant="whatsapp" size="lg" icon={<WhatsAppIcon size={18} />}>
            WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light" size="lg">Request a quote</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export type Testimonial = { name: string; location?: string; text: string; product?: string };

/**
 * Customer testimonials. Renders nothing unless genuine testimonials are passed in.
 * Never add invented reviews.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <li key={t.name + t.text.slice(0, 12)} className="rounded-brand-lg border border-line bg-bg p-6">
          <blockquote className="text-body">“{t.text}”</blockquote>
          <p className="mt-4 text-sm font-semibold text-heading">{t.name}</p>
          {(t.location || t.product) && <p className="nx-caption">{[t.product, t.location].filter(Boolean).join(" · ")}</p>}
        </li>
      ))}
    </ul>
  );
}
