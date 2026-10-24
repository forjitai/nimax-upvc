import { business, whatsappHref } from "@/config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** WhatsApp button fixed to the bottom-right corner of every page. */
export function FloatingWhatsApp() {
  return (
    <a href={whatsappHref(business.primaryPhone)} target="_blank" rel="noopener noreferrer"
      aria-label={`WhatsApp ${business.name} on ${business.primaryPhone.display}`}
      className="fixed z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-semibold text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 hover:bg-whatsapp-hover"
      style={{ right: "max(16px, env(safe-area-inset-right, 0px))", bottom: "max(16px, env(safe-area-inset-bottom, 0px))" }}>
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
