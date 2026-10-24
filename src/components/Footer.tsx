import Link from "next/link";
import { MapPin, Navigation, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { footerNav, productMenu } from "@/config/navigation";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-footer text-footer-text">
      <div className="nx-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="min-w-0">
          <Logo variant="white" height={48} />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-footer-hover">Profiles · Windows · Installation</p>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed">
            UPVC windows supplied and installed in {business.areaServed.join(", ")}, and UPVC profiles for window fabrication.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-footer-heading">Explore</h2>
          <ul className="space-y-2 text-sm">
            {footerNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-footer-hover">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-footer-heading">Our range</h2>
          <ul className="space-y-2 text-sm">
            {productMenu.map((g) => (
              <li key={g.href}><Link href={g.href} className="hover:text-footer-hover">{g.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-footer-heading">Let&rsquo;s connect</h2>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex gap-2.5">
              <MapPin aria-hidden size={16} className="mt-0.5 shrink-0 text-footer-hover" />
              <span>{business.addressOneLine}</span>
            </p>
            {business.phones.map((p) => (
              <p key={p.e164} className="flex items-center gap-2.5">
                <Phone aria-hidden size={16} className="shrink-0 text-footer-hover" />
                <a href={telHref(p)} className="font-semibold tabular-nums text-footer-heading hover:text-footer-hover">{p.display}</a>
                <a href={whatsappHref(p)} target="_blank" rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-1 text-xs hover:text-footer-hover"
                  aria-label={`WhatsApp ${p.display}`}>
                  <WhatsAppIcon size={14} /> WhatsApp
                </a>
              </p>
            ))}
            <p>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-footer-heading hover:text-footer-hover">
                <Navigation aria-hidden size={15} /> Get directions
              </a>
            </p>
            <p className="pt-2">
              <Link href="/contact" className="inline-flex rounded-brand bg-btn-accent px-4 py-2.5 text-sm font-semibold text-btn-accent-text hover:bg-btn-accent-hover">Send an enquiry</Link>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-footer-line">
        <div className="nx-container flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {business.name}. All rights reserved.</p>
          <p>{business.address.city}, {business.address.region}</p>
        </div>
      </div>
    </footer>
  );
}
