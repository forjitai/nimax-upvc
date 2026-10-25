import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { business, siteUrl } from "@/config/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ogDefaults, shareImage } from "@/lib/seo";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Analytics } from "@/components/Analytics";

// Self-hosted variable fonts (SIL Open Font License). No request to Google at runtime.
const archivo = localFont({
  src: [
    { path: "../fonts/archivo-variable.woff2", style: "normal" },
    { path: "../fonts/archivo-variable-italic.woff2", style: "italic" },
  ],
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const manrope = localFont({
  src: "../fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `UPVC Windows & Profiles in ${business.address.city} | ${business.name}`,
    template: `%s | ${business.name}`,
  },
  description: `${business.name} supplies and installs UPVC windows and supplies UPVC profiles in ${business.address.city}.`,
  applicationName: business.name,
  openGraph: ogDefaults,
  twitter: { card: "summary_large_image", images: [shareImage.url] },
  // Vercel preview deployments are never indexed; production is.
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
  // Google Search Console HTML-tag verification (set NEXT_PUBLIC_GSC_VERIFICATION in Vercel)
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#22247e",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a href="#main" className="sr-only z-[60] rounded-brand bg-primary px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics id={process.env.NEXT_PUBLIC_GA_ID} />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: business.name,
          url: siteUrl,
          logo: `${siteUrl}/icons/icon-512.png`,
          telephone: business.phones.map((p) => p.e164),
        }} />
      </body>
    </html>
  );
}
