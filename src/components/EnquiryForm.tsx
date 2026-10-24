"use client";

import { useId, useState, type FormEvent } from "react";
import { business, whatsappHref } from "@/config/business";
import { allProducts, installation } from "@/config/products";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Errors = Partial<Record<"name" | "phone", string>>;

/**
 * Enquiry form.
 * Current delivery: hands the enquiry to WhatsApp (the visitor presses Send there).
 * The page never says the enquiry was "sent" — only that WhatsApp was opened.
 * Phase 6 adds a server endpoint with server-side validation and spam protection.
 */
export function EnquiryForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "idle" | "opened" | "error"; link?: string }>({ kind: "idle" });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("company_website") || "")) return; // honeypot: bots fill hidden fields
    const name = String(f.get("name") || "").trim();
    const phone = String(f.get("phone") || "").replace(/[\s-]/g, "");
    const product = String(f.get("product") || "");
    const location = String(f.get("location") || "").trim();
    const message = String(f.get("message") || "").trim();
    const to = business.phones[Number(f.get("to") || 0)] ?? business.primaryPhone;

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) next.phone = "Please enter a 10-digit Indian mobile number.";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.elements.namedItem(next.name ? "name" : "phone") as HTMLElement | null)?.focus();
      return;
    }

    const text = [
      `Hello ${business.name}, I would like a quotation.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      product && `Product: ${product}`,
      location && `Location: ${location}`,
      message && `Details: ${message}`,
    ].filter(Boolean).join("\n");
    const link = whatsappHref(to, text);
    const win = window.open(link, "_blank");
    if (win) win.opener = null;
    setStatus({ kind: win === null ? "error" : "opened", link });
  }

  const field = "w-full rounded-brand border border-line-strong bg-bg px-3.5 py-3 text-[0.98rem] text-heading placeholder:text-muted focus:border-primary focus:outline-none focus-visible:outline-3 focus-visible:outline-focus";
  const label = "mb-1.5 block text-sm font-semibold text-heading";

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 rounded-brand-lg border border-line bg-bg p-5 sm:grid-cols-2 sm:p-7"
      aria-describedby={`${uid}-note`}>
      <div className="min-w-0">
        <label htmlFor={`${uid}-name`} className={label}>Your name <span aria-hidden className="text-accent">*</span></label>
        <input id={`${uid}-name`} name="name" autoComplete="name" required className={field}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
        {errors.name && <p id={`${uid}-name-err`} className="mt-1.5 text-sm font-semibold text-error">{errors.name}</p>}
      </div>
      <div className="min-w-0">
        <label htmlFor={`${uid}-phone`} className={label}>Mobile number <span aria-hidden className="text-accent">*</span></label>
        <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="10-digit mobile"
          className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
        {errors.phone && <p id={`${uid}-phone-err`} className="mt-1.5 text-sm font-semibold text-error">{errors.phone}</p>}
      </div>
      <div className="min-w-0">
        <label htmlFor={`${uid}-product`} className={label}>Product or service</label>
        <select id={`${uid}-product`} name="product" defaultValue={defaultProduct} className={field}>
          <option value="">Not sure yet</option>
          {allProducts.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
          <option value={installation.name}>{installation.name}</option>
        </select>
      </div>
      <div className="min-w-0">
        <label htmlFor={`${uid}-location`} className={label}>Project location</label>
        <input id={`${uid}-location`} name="location" autoComplete="address-level2" placeholder="Area, Bengaluru" className={field} />
      </div>
      <div className="min-w-0 sm:col-span-2">
        <label htmlFor={`${uid}-message`} className={label}>Requirement</label>
        <textarea id={`${uid}-message`} name="message" rows={4} placeholder="Number of windows, approximate sizes, new building or replacement"
          className={field} />
      </div>
      <fieldset className="min-w-0 sm:col-span-2">
        <legend className={label}>Send to</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {business.phones.map((p, i) => (
            <label key={p.e164} className="inline-flex items-center gap-2 text-sm text-heading">
              <input type="radio" name="to" value={i} defaultChecked={i === 0} className="size-4 accent-[var(--nx-primary)]" />
              <span className="tabular-nums">{p.display}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-brand bg-whatsapp px-6 py-3.5 font-semibold text-white hover:bg-whatsapp-hover sm:w-auto">
          <WhatsAppIcon size={18} /> Continue on WhatsApp
        </button>
        <p id={`${uid}-note`} className="nx-caption mt-3">
          Your enquiry opens in WhatsApp with these details filled in. Press Send in WhatsApp to deliver it.
        </p>
        <div role="status" aria-live="polite" className="mt-3 text-sm">
          {status.kind === "opened" && (
            <p className="rounded-brand bg-secondary px-4 py-3 text-heading">
              WhatsApp has opened in a new tab. Your message is not delivered until you press <strong>Send</strong> there.
            </p>
          )}
          {status.kind === "error" && (
            <p className="rounded-brand bg-secondary px-4 py-3 text-heading">
              Your browser blocked the new tab. <a href={status.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">Open WhatsApp</a> to send your enquiry.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
