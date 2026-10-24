"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { NavGroup, NavLink } from "@/config/navigation";

type Props = { items: (NavLink & { mega?: boolean })[]; productMenu: NavGroup[] };

/** Desktop navigation with a products mega menu. Opens on hover, click or keyboard; Escape closes. */
export function DesktopNav({ items, productMenu }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) =>
          item.mega ? (
            <li key={item.href} ref={wrap} className="relative"
              onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <div className="flex items-center">
                <Link href={item.href} className="rounded-brand py-2 pl-3 pr-1 text-[0.95rem] font-semibold text-nav hover:text-nav-hover">
                  {item.label}
                </Link>
                <button ref={btn} type="button" aria-expanded={open} aria-controls="products-menu"
                  aria-label="Show product categories" onClick={() => setOpen((v) => !v)}
                  className="rounded-brand p-1.5 text-nav hover:text-nav-hover">
                  <ChevronDown aria-hidden size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
              </div>
              <div id="products-menu" hidden={!open}
                className="absolute left-1/2 top-full z-50 w-[min(920px,calc(100vw-3rem))] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-4 gap-6 rounded-brand-lg border border-line bg-bg p-6 shadow-[0_24px_48px_-24px_rgba(15,34,48,0.35)]">
                  {productMenu.map((g) => (
                    <div key={g.href} className="min-w-0">
                      <Link href={g.href} onClick={() => setOpen(false)}
                        className="mb-2 block border-b border-line pb-2 font-display text-[0.95rem] font-bold text-heading hover:text-primary">
                        {g.label}
                      </Link>
                      <ul className="space-y-1">
                        {g.items.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} onClick={() => setOpen(false)}
                              className="block rounded py-1 text-sm text-body hover:text-primary hover:underline underline-offset-4">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ) : (
            <li key={item.href}>
              <Link href={item.href} className="rounded-brand px-3 py-2 text-[0.95rem] font-semibold text-nav hover:text-nav-hover">
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
