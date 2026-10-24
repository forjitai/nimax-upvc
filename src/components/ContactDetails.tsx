import { MapPin, Navigation, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Both phone numbers with Call + WhatsApp, and the address with directions. */
export function ContactDetails() {
  return (
    <div className="grid gap-4">
      {business.phones.map((p) => (
        <div key={p.e164} className="rounded-brand-lg border border-line bg-bg p-5">
          <p className="nx-eyebrow text-muted">{p.label}</p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums text-heading">
            <a href={telHref(p)} className="hover:text-primary">{p.display}</a>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href={telHref(p)} variant="primary" size="sm" icon={<Phone aria-hidden size={16} />}
              aria-label={`Call ${p.display}`}>Call</ButtonLink>
            <ButtonLink href={whatsappHref(p)} variant="whatsapp" size="sm" icon={<WhatsAppIcon size={16} />}
              aria-label={`WhatsApp ${p.display}`}>WhatsApp</ButtonLink>
          </div>
        </div>
      ))}
      <div className="rounded-brand-lg border border-line bg-bg p-5">
        <p className="nx-eyebrow text-muted">Address</p>
        <address className="mt-2 flex gap-2.5 not-italic text-heading">
          <MapPin aria-hidden size={18} className="mt-1 shrink-0 text-accent" />
          <span>
            {business.name}<br />
            {business.address.street},<br />
            {business.address.locality}, {business.address.city},<br />
            {business.address.region} {business.address.postalCode}, {business.address.country}
          </span>
        </address>
        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink href={business.directionsUrl} variant="outline" size="sm" icon={<Navigation aria-hidden size={16} />}>
            Get directions
          </ButtonLink>
          <ButtonLink href={business.mapsUrl} variant="ghost" size="sm">Open in Google Maps</ButtonLink>
        </div>
      </div>
    </div>
  );
}
