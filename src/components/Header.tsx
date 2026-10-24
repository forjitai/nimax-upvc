import { MapPin, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { mainNav, productMenu } from "@/config/navigation";
import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Site header: contact strip + sticky main bar. Server component; menus are small client islands. */
export function Header() {
  return (
    <>
      <div className="bg-topbar text-topbar-text text-[0.82rem]">
        <div className="nx-container flex items-center justify-between gap-4 py-2">
          <p className="hidden min-w-0 items-center gap-1.5 truncate md:flex">
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
          </ul>
        </div>
      </div>

      {/* Solid background on purpose: a backdrop-filter here would trap the fixed mobile drawer inside the header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <div className="nx-container flex h-[72px] items-center justify-between gap-4">
          <Logo height={44} priority />
          <DesktopNav items={mainNav} productMenu={productMenu} />
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ButtonLink href="/contact" variant="primary" size="sm">Get a Quote</ButtonLink>
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
