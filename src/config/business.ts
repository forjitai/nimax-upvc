/**
 * NIMAX UPVC — business details.
 *
 * This is the ONLY place business information is stored. Header, footer,
 * contact page, WhatsApp links, map links and structured data all read
 * from here. Edit a value once and it updates across the whole website.
 *
 * Rule: only verified details belong here. Do not add an email, GST number,
 * opening hours, founding year, certifications or coordinates until the
 * business owner supplies them.
 */

export type Phone = {
  /** How the number is shown on the page */
  display: string;
  /** E.164 format, used for tel: links and structured data */
  e164: string;
  /** Digits only with country code, used for wa.me links */
  whatsapp: string;
  label: string;
};

const address = {
  street: "Kittanahalli, Kadabagere Road",
  locality: "Byandahalli",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "562130",
  country: "India",
  countryCode: "IN",
} as const;

const phones: Phone[] = [
  { label: "Phone 1", display: "+91 91138 08442", e164: "+919113808442", whatsapp: "919113808442" },
  { label: "Phone 2", display: "+91 79751 77812", e164: "+917975177812", whatsapp: "917975177812" },
];

export type Location = {
  id: string;
  /** Short name shown on cards, e.g. "Kadabagere Road" */
  name: string;
  street: string;
  landmark?: string;
  locality: string;
  /** Town/city line shown to visitors */
  city: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
  /** Full address on one line, as the owner supplied it */
  oneLine: string;
  mapsUrl: string;
  directionsUrl: string;
  mapEmbedUrl: string;
};

const maps = (oneLine: string) => ({
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(oneLine)}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(oneLine)}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(oneLine)}&output=embed`,
});

/**
 * All NIMAX UPVC locations. The first one is the main address (header, Google business data).
 * Both use the same phone numbers. Add opening hours per location only when supplied.
 */
const dommasandraOneLine = "S.no 46/5, Dommasandra Village, Sarjapura Hobli, Anekal Taluk, near Dommasandra Eye Hospital, Dommasandra, Karnataka 562125, India";
const kittanahalliOneLine = `${address.street}, ${address.city}, ${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`;

const locations: Location[] = [
  { id: "kadabagere", name: "Kadabagere Road", ...address, oneLine: kittanahalliOneLine, ...maps(kittanahalliOneLine) },
  {
    id: "dommasandra", name: "Dommasandra",
    street: "S.no 46/5, Dommasandra Village, Sarjapura Hobli, Anekal Taluk",
    landmark: "Near Dommasandra Eye Hospital",
    locality: "Dommasandra", city: "Dommasandra", region: "Karnataka", postalCode: "562125",
    country: "India", countryCode: "IN",
    oneLine: dommasandraOneLine, ...maps(dommasandraOneLine),
  },
];

/** One line, as the owner supplied it */
const addressOneLine = `${address.street}, ${address.city}, ${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`;

export const business = {
  name: "NIMAX UPVC",
  shortName: "NIMAX",
  tagline: "High Quality UPVC Profile",
  /** Only the city of the business address. Add areas here once confirmed. */
  areaServed: ["Bengaluru"],
  address,
  addressOneLine,
  locations,
  phones,
  primaryPhone: phones[0],

  /** Not yet supplied. Leave empty until verified. */
  email: "",
  openingHours: [] as string[],

  /** Google Maps: search and directions by address (no invented coordinates) */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressOneLine)}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressOneLine)}`,
  /** Embedded map on the Contact page (address search, no API key, no invented coordinates) */
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressOneLine)}&output=embed`,

  /** Message pre-filled when a visitor taps a WhatsApp button */
  whatsappGreeting: "Hello NIMAX UPVC, I would like a quote for UPVC windows.",
} as const;

export function telHref(p: Phone) {
  return `tel:${p.e164}`;
}

export function whatsappHref(p: Phone, text: string = business.whatsappGreeting) {
  return `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Production URL. Set NEXT_PUBLIC_SITE_URL in Vercel when a domain is added;
 * until then the Vercel URL is used.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
