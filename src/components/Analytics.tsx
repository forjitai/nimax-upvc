"use client";

import Script from "next/script";
import { useEffect } from "react";

type Gtag = (...args: unknown[]) => void;

/**
 * Optional Google Analytics 4. Loads ONLY when NEXT_PUBLIC_GA_ID is set in Vercel
 * (e.g. G-XXXXXXXXXX). Without it, nothing is loaded and no cookies are set.
 * Tracks: click_call, click_whatsapp, click_directions (with the number or page as a label).
 */
export function Analytics({ id }: { id?: string }) {
  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!a || !gtag) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) gtag("event", "click_call", { phone: href.slice(4), page: location.pathname });
      else if (href.includes("wa.me/")) gtag("event", "click_whatsapp", { phone: href.split("wa.me/")[1]?.split("?")[0], page: location.pathname });
      else if (href.includes("google.com/maps")) gtag("event", "click_directions", { page: location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [id]);

  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
