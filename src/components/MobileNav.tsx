"use client";

import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { NavGroup, NavLink } from "@/config/navigation";
import { business, telHref, whatsappHref } from "@/config/business";

type Props = { items: (NavLink & { mega?: boolean })[]; productMenu: NavGroup[]; whatsappIcon: ReactNode };

/** Mobile and tablet menu: full-height drawer with product accordion and contact actions. */
export function MobileNav({ items, productMenu, whatsappIcon }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = openBtn.current;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); trigger?.focus(); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button ref={openBtn} type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu"
        className="inline-flex size-11 items-center justify-center rounded-brand border border-line text-heading">
        <Menu aria-hidden size={22} />
        <span className="sr-only">Open menu</span>
      </button>

      <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}
        className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-bg-dark/50" onClick={close} aria-hidden />
        <div className="absolute inset-y-0 right-0 flex w-[min(380px,100%)] flex-col bg-bg shadow-2xl"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <div className="flex h-[72px] items-center justify-between border-b border-line px-4">
            <span className="font-display text-lg font-bold text-heading">Menu</span>
            <button ref={closeBtn} type="button" onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-brand text-heading hover:bg-bg-alt">
              <X aria-hidden size={22} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
            <ul>
              {items.map((item) =>
                item.mega ? (
                  <li key={item.href}>
                    <div className="flex items-center">
                      <Link href={item.href} onClick={close} className="flex-1 rounded-brand px-3 py-3 text-base font-semibold text-heading">
                        {item.label}
                      </Link>
                    </div>
                    <ul className="mb-2 ml-3 border-l border-line">
                      {productMenu.map((g) => {
                        const isOpen = expanded === g.href;
                        return (
                          <li key={g.href}>
                            <button type="button" aria-expanded={isOpen} onClick={() => setExpanded(isOpen ? null : g.href)}
                              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[0.95rem] font-semibold text-body">
                              {g.label}
                              <ChevronDown aria-hidden size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                            {isOpen && (
                              <ul className="pb-2">
                                <li>
                                  <Link href={g.href} onClick={close} className="block px-6 py-2 text-sm font-semibold text-primary">
                                    All {g.label}
                                  </Link>
                                </li>
                                {g.items.map((l) => (
                                  <li key={l.href}>
                                    <Link href={l.href} onClick={close} className="block px-6 py-2 text-sm text-body">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} onClick={close} className="block rounded-brand px-3 py-3 text-base font-semibold text-heading">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="space-y-2 border-t border-line p-4">
            {business.phones.map((p) => (
              <a key={p.e164} href={telHref(p)}
                className="flex items-center justify-center gap-2 rounded-brand bg-primary px-4 py-3 font-semibold text-white tabular-nums">
                <Phone aria-hidden size={18} /> Call {p.display}
              </a>
            ))}
            <a href={whatsappHref(business.primaryPhone)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-brand bg-whatsapp px-4 py-3 font-semibold text-white">
              {whatsappIcon} WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
