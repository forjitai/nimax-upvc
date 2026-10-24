"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export type Slide = { key: string; visual: ReactNode; label: string; title: string; text: string };

/**
 * Auto-rotating slideshow with pause, previous/next and dot controls.
 * Rotation is off for visitors who prefer reduced motion, and pauses on hover or focus.
 */
export function Slideshow({ slides, interval = 5500 }: { slides: Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // No auto-rotation for visitors who prefer reduced motion; arrows and dots still work.
    if (paused || hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, hover, interval, slides.length]);

  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Product highlights"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)} onBlur={() => setHover(false)}
      className="relative overflow-hidden rounded-brand-lg bg-bg-dark text-on-dark">
      <div className="grid">
        {slides.map((s, n) => (
          <div key={s.key} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}: ${s.title}`}
            aria-hidden={n !== i}
            className={`col-start-1 row-start-1 grid items-center gap-8 p-8 transition-opacity duration-700 sm:p-12 md:grid-cols-[1fr_1.1fr] ${n === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            <div className="mx-auto w-full max-w-[300px]">{s.visual}</div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{s.label}</p>
              <h3 className="nx-split mt-3 !text-on-dark">{s.title}</h3>
              <p className="mt-3 max-w-[48ch] text-on-dark-muted">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-on-dark/15 px-6 py-4 sm:px-12">
        <div className="flex gap-2" role="group" aria-label="Choose slide">
          {slides.map((s, n) => (
            <button key={s.key} type="button" onClick={() => setI(n)} aria-label={`Show slide ${n + 1}`} aria-current={n === i}
              className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-accent" : "w-2 bg-on-dark/40 hover:bg-on-dark/70"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} className="inline-flex size-10 items-center justify-center rounded-full bg-on-dark/10 hover:bg-on-dark/20">
            <ChevronLeft aria-hidden size={18} /><span className="sr-only">Previous slide</span>
          </button>
          <button type="button" onClick={() => setPaused((p) => !p)} className="inline-flex size-10 items-center justify-center rounded-full bg-on-dark/10 hover:bg-on-dark/20">
            {paused ? <Play aria-hidden size={16} /> : <Pause aria-hidden size={16} />}
            <span className="sr-only">{paused ? "Play slideshow" : "Pause slideshow"}</span>
          </button>
          <button type="button" onClick={() => go(1)} className="inline-flex size-10 items-center justify-center rounded-full bg-on-dark/10 hover:bg-on-dark/20">
            <ChevronRight aria-hidden size={18} /><span className="sr-only">Next slide</span>
          </button>
        </div>
      </div>
    </div>
  );
}
