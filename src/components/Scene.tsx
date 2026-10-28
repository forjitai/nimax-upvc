import Image from "next/image";

/**
 * 3D illustrations with transparent backgrounds (public/images/scenes/, made with tools/renders/).
 * They sit on dark or light panels. Replace with real project photos when available.
 */
export const scenes = {
  "hero-sliding": "UPVC sliding window fitted in a wall opening, 3D illustration",
  "installed-casement": "UPVC casement window fitted in a wall opening, 3D illustration",
  combination: "UPVC combination window with a fixed top light, 3D illustration",
  sliding: "UPVC sliding window, 3D illustration",
  casement: "UPVC casement window with one sash open, 3D illustration",
  "tilt-and-turn": "UPVC tilt and turn window in the tilt position, 3D illustration",
  "profiles-group": "Group of UPVC profiles: track frame, sash, casement frame, mullion and glazing bead, 3D illustration",
} as const;
export type SceneName = keyof typeof scenes;

export function Scene({ name, className = "", priority = false, sizes = "(min-width:1024px) 40vw, 90vw", decorative = false }: {
  name: SceneName; className?: string; priority?: boolean; sizes?: string; decorative?: boolean;
}) {
  return (
    <Image src={`/images/scenes/${name}.webp`} alt={decorative ? "" : scenes[name]} width={1000} height={1000}
      priority={priority} sizes={sizes} className={`h-auto w-full ${className}`} />
  );
}
