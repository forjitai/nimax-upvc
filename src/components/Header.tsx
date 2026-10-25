import { MapPin, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/config/business";
import { mainNav, productMenu } from "@/config/navigation";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Site header in the logo's colours: a blue contact strip, a white bar with the
 * NIMAX logo, and a thin gold rule underneath (echoing the rule in the logo's tagline).
 */
export function Header() {
  return (
    <>
      <div className="bg-topbar text-topbar-text text-[0.82rem]">
        <div className="nx-container flex items-center justify-between gap-4 py-2">
          <p className="hidden min-w-0 items-center gap-2 truncate md:flex">
            <span className="font-bold uppercase tracking-[0.14em] text-accent">{business.tagline}</span>
            <span aria-hidden className="h-3 w-px bg-topbar-text/40" />
            <MapPin aria-hidden size={14} className="shrink-0 text-accent" />
            <span className="truncate">{business.address.street}, {business.address.city} {business.address.postalCode}</span>
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {business.phones.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p)} className="inline-flex items-center gap-1.5 font-semibold tabular-nums hover:text-white">
                  <Phone aria-hidden size={13} className="text-accent" />
                  {p.display}
                </a>
              </li>
            ))}
            <li className="hidden sm:block">
              <a href={whatsappHref(business.primaryPhone)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold hover:text-white">
                <WhatsAppIcon size={14} className="text-accent" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Solid background on purpose: a backdrop-filter here would trap the fixed mobile drawer inside the header */}
      <header className="sticky top-0 z-40 border-b-[3px] border-accent bg-bg shadow-[0_6px_18px_-12px_rgba(20,21,79,0.35)]">
        <div className="nx-container flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <span className="lg:hidden"><Logo height={46} priority /></span>
          <span className="hidden lg:inline-flex"><Logo height={60} priority /></span>
          <DesktopNav items={mainNav} productMenu={productMenu} />
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ButtonLink href="/contact" variant="accent" size="md">Get a Quote</ButtonLink>
            </div>
            <a href={telHref(business.primaryPhone)} aria-label={`Call ${business.primaryPhone.display}`}
              className="inline-flex size-11 items-center justify-center rounded-brand bg-primary text-white lg:hidden">
              <Phone aria-hidden size={20} />
            </a>
            <MobileNav items={mainNav} productMenu={productMenu} whatsappIcon={<WhatsAppIcon size={18} />} />
          </div>
        </div>
      </header>
    </>
  );
}
