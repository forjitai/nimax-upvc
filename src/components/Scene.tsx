import Image from "next/image";

/**
 * 3D illustrations (public/images/3d-scenes/, made with tools/renders/). Window scenes show the window in a
 * room wall (square, opaque); the profile group has a transparent background. Replace with real project photos when available.
 */
export const scenes = {
  "hero-sliding": "White UPVC three-sash sliding window in a room, garden view outside, 3D illustration",
  "installed-casement": "White UPVC casement window with one sash open, fitted in a wall, 3D illustration",
  combination: "White UPVC combination window with a fixed top light, 3D illustration",
  sliding: "White UPVC three-sash sliding window, 3D illustration",
  casement: "White UPVC casement window with one sash open, 3D illustration",
  "tilt-and-turn": "White UPVC tilt and turn window in the tilt position, 3D illustration",
  "profiles-group": "Group of UPVC profiles: track frame, sash, casement frame, mullion and glazing bead, 3D illustration",
} as const;
export type SceneName = keyof typeof scenes;

/** Scenes that are full pictures (not cut-outs). */
export const isRoomScene = (n: SceneName) => n !== "profiles-group";

export function Scene({ name, className = "", priority = false, sizes = "(min-width:1024px) 40vw, 90vw", decorative = false }: {
  name: SceneName; className?: string; priority?: boolean; sizes?: string; decorative?: boolean;
}) {
  return (
    <Image src={`/images/3d-scenes/${name}.webp`} alt={decorative ? "" : scenes[name]} width={1000} height={1000}
      priority={priority} sizes={sizes} className={`h-auto w-full ${isRoomScene(name) ? "rounded-brand-lg" : ""} ${className}`} />
  );
}
