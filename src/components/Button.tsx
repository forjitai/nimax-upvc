import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "outline-light" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-brand transition-colors duration-150 " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover",
  accent: "bg-btn-accent text-btn-accent-text hover:bg-btn-accent-hover",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  "outline-light": "border-2 border-on-dark/70 text-on-dark hover:bg-on-dark hover:text-heading",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-hover",
  ghost: "text-primary hover:bg-secondary",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3.5 py-2",
  md: "text-[0.95rem] px-5 py-3",
  lg: "text-base px-6 py-3.5",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  /** External links (tel:, wa.me, maps) render a plain <a> */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link that looks like a button. Internal paths use next/link. */
export function ButtonLink({ href, variant, size, icon, children, className = "", external, ...rest }: LinkButtonProps) {
  const cls = buttonClass(variant, size, className);
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

type ButtonProps = { variant?: Variant; size?: Size; icon?: ReactNode } & ComponentProps<"button">;

export function Button({ variant, size, icon, className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}
