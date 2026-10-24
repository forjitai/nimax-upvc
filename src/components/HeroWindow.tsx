/**
 * Hero visual: a large two-track UPVC sliding window drawn in CSS.
 * On load the right sash glides open once (skipped for reduced-motion users).
 * Decorative only; it stands in until a real project photo is supplied.
 */
export function HeroWindow() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-[520px]">
      <div className="relative aspect-[5/4] rounded-[10px] bg-[var(--nx-primary)] p-[4.5%] shadow-[0_40px_80px_-40px_rgba(8,24,36,0.7)]">
        {/* outer frame bevel */}
        <div className="absolute inset-[2.2%] rounded-[6px] border-2 border-white/10" />
        {/* the view through the glass */}
        <div className="relative h-full overflow-hidden rounded-[3px] nx-hero-sky">
          <div className="nx-hero-hills absolute inset-x-0 bottom-0 h-[38%]" />
          {/* fixed (left) sash */}
          <div className="absolute inset-y-0 left-0 w-[52%] border-[6px] border-[var(--nx-primary)] bg-white/10">
            <div className="nx-hero-streak absolute inset-0" />
          </div>
          {/* sliding (right) sash */}
          <div className="nx-hero-sash absolute inset-y-0 right-0 w-[52%] border-[6px] border-[var(--nx-primary)] bg-white/[0.14] shadow-[-10px_0_24px_-12px_rgba(0,0,0,0.45)]">
            <div className="nx-hero-streak absolute inset-0" />
            <span className="absolute left-[6px] top-1/2 h-[18%] w-[7px] -translate-y-1/2 rounded-full bg-[var(--nx-accent)]" />
          </div>
        </div>
      </div>
      {/* sill */}
      <div className="mx-[-3%] h-[14px] rounded-b-[6px] bg-[var(--nx-primary-hover)]" />
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-muted">2-track UPVC sliding window</p>
    </div>
  );
}
