import { Plus } from "lucide-react";
import { JsonLd } from "./JsonLd";

export type FaqItem = { q: string; a: string };

/** Accessible FAQ list using native <details>, plus FAQPage structured data. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-heading [&::-webkit-details-marker]:hidden">
              <span className="text-[1.04rem]">{f.q}</span>
              <Plus aria-hidden size={20} className="shrink-0 text-primary transition-transform group-open:rotate-45" />
            </summary>
            <p className="max-w-[68ch] pb-5 text-[0.98rem]">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />
    </>
  );
}
