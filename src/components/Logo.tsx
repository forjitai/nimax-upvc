import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";

type Props = { variant?: "color" | "white"; height?: number; link?: boolean; priority?: boolean };

/** NIMAX UPVC logo. Files live in /public/icons; replace them to update the logo everywhere. */
export function Logo({ variant = "color", height = 48, link = true, priority = false }: Props) {
  const src = variant === "white" ? "/icons/logo-nimax-upvc-white.svg" : "/icons/logo-nimax-upvc.svg";
  const width = Math.round((284 / 64) * height);
  const img = (
    <Image src={src} alt={business.name} width={width} height={height} priority={priority} unoptimized
      style={{ height, width: "auto" }} />
  );
  if (!link) return img;
  return (
    <Link href="/" aria-label={`${business.name} home`} className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
