import { Scene } from "./Scene";

/** Hero visual: 3D illustration of a sliding window in a room. Replace with a real project photo when supplied. */
export function HeroWindow() {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      <Scene name="hero-sliding" priority sizes="(min-width:1024px) 560px, 90vw" className="shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] ring-1 ring-white/10" />
      <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-muted">UPVC sliding window · 3D illustration</figcaption>
    </figure>
  );
}
