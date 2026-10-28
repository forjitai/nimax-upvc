import type { ReactNode } from "react";

/**
 * Alternating visual + text block (Fenstas-style). `visual` is a photo or drawing;
 * `reverse` puts the visual on the right. Title accepts JSX so a phrase can be
 * wrapped in <em> for the italic accent.
 */
export function FeatureBlock({ id, eyebrow, title, children, actions, visual, reverse = false, tone = "light" }: {
  id: string; eyebrow: string; title: ReactNode; children: ReactNode; actions: ReactNode; visual: ReactNode;
  reverse?: boolean; tone?: "light" | "alt";
}) {
  return (
    <section aria-labelledby={id} className={tone === "alt" ? "bg-bg-alt" : "bg-bg"}>
      <div className="nx-container grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div className={`min-w-0 ${reverse ? "md:order-2" : ""}`}>{visual}</div>
        <div className="min-w-0">
          <p className="nx-eyebrow mb-4">{eyebrow}</p>
          <h2 id={id} className="nx-split">{title}</h2>
          <div className="mt-5 max-w-[56ch] space-y-3 text-[1.04rem]">{children}</div>
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
      </div>
    </section>
  );
}

/** Framed panel for a drawing, sized like a photo would be. */
export function VisualPanel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-brand-lg ${dark ? "bg-bg-dark" : "bg-secondary"}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px", color: dark ? "var(--nx-on-dark)" : "var(--nx-primary)" }} />
      <div className="relative w-[86%] max-w-[440px]">{children}</div>
    </div>
  );
}
