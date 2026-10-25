import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";

type Props = { variant?: "color" | "white"; height?: number; link?: boolean; priority?: boolean };

/**
 * The client's NIMAX logo ("High Quality UPVC Profile").
 * Files: /public/icons/logo-nimax.png (light backgrounds) and logo-nimax-white.png (dark backgrounds),
 * both 721 × 235 with a transparent background. Replace them, keeping the names, to update the logo everywhere.
 */
const W = 721;
const H = 235;

export function Logo({ variant = "color", height = 52, link = true, priority = false }: Props) {
  const src = variant === "white" ? "/icons/logo-nimax-white.png" : "/icons/logo-nimax.png";
  const width = Math.round((W / H) * height);
  const img = (
    <Image src={src} alt={`${business.name}, high quality UPVC profile`} width={width} height={height}
      priority={priority} sizes={`${width}px`} style={{ height, width: "auto" }} />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label={`${business.name} home`} className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
