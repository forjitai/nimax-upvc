import { Scene } from "./Scene";

/** Hero visual: 3D illustration of a sliding window fitted in a wall. Replace with a real project photo when supplied. */
export function HeroWindow() {
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      <Scene name="hero-sliding" priority sizes="(min-width:1024px) 560px, 90vw" />
      <figcaption className="-mt-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-muted">UPVC sliding window · 3D illustration</figcaption>
    </figure>
  );
}
