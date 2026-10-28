import { productPhotos, productRenders } from "./photos.generated";
import { profiles, profileGroup, type ProfileGroup, type ProfileItem } from "./profiles";

/**
 * NIMAX UPVC — product catalogue.
 *
 * Owner confirmed (24 Oct 2026): the business is UPVC profiles and UPVC windows only.
 * Doors, aluminium, glass partitions and skylights were removed.
 * Text here describes each product TYPE in general terms. It deliberately
 * contains no prices, sizes, glass thicknesses, brands, warranties or
 * performance figures. Add those to `specs` only when the owner supplies them.
 */

export type Illustration =
  | "sliding" | "casement" | "tilt-turn" | "fixed" | "top-hung" | "french"
  | "combination" | "folding" | "bay" | "ventilator" | "mesh-window"
  | "door-sliding" | "door-casement" | "door-french" | "door-folding"
  | "door-tilt-slide" | "door-patio" | "door-bathroom" | "door-mesh"
  | "alu-window" | "alu-door" | "partition" | "skylight" | "installation" | "profile"
  | "profile-frames" | "profile-sashes" | "profile-mullions" | "profile-beads" | "profile-mesh" | "profile-panels";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  /** One sentence for cards and meta descriptions */
  summary: string;
  /** How the sash or panel moves */
  howItOpens: string;
  /** Typical places this product type is used */
  suitedFor: string[];
  /** Two or three sentences of general product information for the product page */
  details: string;
  /** Styles grouped on one page (used by the aluminium pages) */
  variants?: string[];
  illustration: Illustration;
  /** Verified specifications only. Empty until supplied. */
  specs: Spec[];
  /** Photo files in /public/images/products/. Empty until supplied. */
  /** Real photos, or 3D illustrations (render: true) until real photos are added. */
  photos: { src: string; alt: string; width: number; height: number; render?: boolean }[];
  /** Profile catalogue only: which group the profile belongs to */
  group?: ProfileGroup;
  /** Windows only: how the window opens, used for the filter on the windows page */
  windowGroup?: WindowGroup;
  /** Windows only: slugs of catalogue profiles this window type is typically built from */
  madeWith?: string[];
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  illustration: Illustration;
  products: Product[];
};

export type WindowGroup = "sliding" | "hinged" | "fixed-special";
export const windowGroups: { id: WindowGroup; name: string }[] = [
  { id: "sliding", name: "Sliding" },
  { id: "hinged", name: "Hinged & tilting" },
  { id: "fixed-special", name: "Fixed & special" },
];

/** Window type → how it opens, and the catalogue profiles it is typically built from */
const windowMeta: Record<string, { g: WindowGroup; madeWith: string[] }> = {
  "sliding-windows": { g: "sliding", madeWith: ["90mm-2-track", "112mm-3-track", "57mm-sliding-sash", "88mm-sash-mullion", "5mm-sliding-bead", "52mm-mesh-sliding"] },
  "mesh-windows": { g: "sliding", madeWith: ["112mm-3-track", "52mm-mesh-sliding", "mesh-window-track", "mesh-add-track", "mesh-mullion"] },
  "casement-windows": { g: "hinged", madeWith: ["60mm-casement", "45mm-small-casement-frame", "72mm-out-swing-window-sash", "t-mullion", "5mm-casement-single-glazing-bead"] },
  "french-windows": { g: "hinged", madeWith: ["60mm-casement", "72mm-out-swing-window-sash", "5mm-casement-single-glazing-bead"] },
  "tilt-and-turn-windows": { g: "hinged", madeWith: ["60mm-casement", "5mm-casement-single-glazing-bead"] },
  "top-hung-windows": { g: "hinged", madeWith: ["45mm-small-casement-frame", "72mm-out-swing-window-sash", "5mm-casement-single-glazing-bead"] },
  "folding-windows": { g: "hinged", madeWith: ["60mm-casement", "5mm-casement-single-glazing-bead"] },
  "fixed-windows": { g: "fixed-special", madeWith: ["60mm-casement", "round-bead", "lower-glazing-bead-hole"] },
  "combination-windows": { g: "fixed-special", madeWith: ["60mm-casement", "t-mullion", "60mm-coupler", "88-60-coupler"] },
  "bay-windows": { g: "fixed-special", madeWith: ["60mm-bay-pole", "80-60mm-bay-corner", "60mm-coupler"] },
  "ventilator-windows": { g: "fixed-special", madeWith: ["45mm-small-casement-frame", "5mm-casement-single-glazing-bead"] },
};

/** Real photos from public/images/products/, otherwise 3D illustrations from public/images/renders/ (see scripts/photos.mjs). */
const photosFor = (slug: string, name: string): Product["photos"] => {
  const real = productPhotos[slug];
  if (real?.length) return real.map((src, i) => ({ src, alt: i ? `${name}, photo ${i + 1}` : name, width: 1200, height: 1200 }));
  return (productRenders[slug] ?? []).map((src) => ({ src, alt: `${name}, 3D illustration`, width: 1000, height: 1000, render: true }));
};

const p = (x: Omit<Product, "specs" | "photos">): Product => ({
  ...x, specs: [], photos: photosFor(x.slug, x.name),
  ...(windowMeta[x.slug] ? { windowGroup: windowMeta[x.slug].g, madeWith: windowMeta[x.slug].madeWith } : {}),
});

/** Turn a catalogue profile into a product page entry. Specs only list values we have. */
const fromProfile = (x: ProfileItem): Product => {
  const g = profileGroup(x.group);
  const specs: Spec[] = [
    { label: "Material", value: "UPVC" },
    { label: "Profile type", value: x.type },
    ...(x.width ? [{ label: "Width / depth", value: x.width }] : []),
    ...(x.thickness ? [{ label: "Wall thickness", value: x.thickness }] : []),
    { label: "Colour", value: "White" },
  ];
  return {
    slug: x.slug, name: x.name, group: x.group,
    summary: [x.type, x.width, x.thickness && `${x.thickness} wall`].filter(Boolean).join(" · "),
    details: `${x.name} is a ${x.type.toLowerCase().replace(/ profile$/, "")} profile for ${x.usedFor.charAt(0).toLowerCase()}${x.usedFor.slice(1)}. ${g.description}`,
    howItOpens: g.use,
    suitedFor: [x.usedFor],
    illustration: `profile-${x.group}` as Illustration,
    specs, photos: photosFor(x.slug, x.name),
  };
};

export const categories: Category[] = [
  {
    slug: "upvc-windows",
    name: "UPVC Windows",
    shortName: "Windows",
    summary: "Sliding, casement, tilt and turn, fixed and other UPVC window styles, made to the size of each opening.",
    illustration: "sliding",
    products: [
      p({ slug: "sliding-windows", details: "Sliding windows are the most common choice for Bengaluru homes because the sashes never swing into the room or out over a balcony. A 2-track frame holds two sashes; a 3-track frame adds a third track, often used for an insect mesh shutter. Because the sashes overlap, part of the opening always stays covered, which suits rooms where full ventilation is less important than space.", name: "UPVC Sliding Windows", illustration: "sliding",
        summary: "Sashes that glide sideways on tracks, so the window opens without taking up room inside or outside.",
        howItOpens: "One or more sashes slide horizontally past each other on a 2-track or 3-track frame.",
        suitedFor: ["Bedrooms and living rooms", "Balconies", "Rooms where an outward-opening sash would get in the way"] }),
      p({ slug: "casement-windows", details: "A casement window opens the whole sash, so nearly the full opening lets in air. When closed, the sash presses against the frame on all sides, which gives a tight seal. Casements can be single, double or combined with fixed panels, and suit rooms with space for the sash to swing.", name: "UPVC Casement Windows", illustration: "casement",
        summary: "Side-hinged sashes that swing open fully for the most ventilation from a window opening.",
        howItOpens: "Each sash is hinged on one side and swings outward or inward like a door.",
        suitedFor: ["Bedrooms", "Living rooms", "Rooms that need full-width airflow"] }),
      p({ slug: "tilt-and-turn-windows", details: "Tilt and turn windows give two ways of opening from one handle. In the tilt position the top of the sash leans in a few inches, letting air circulate while the window stays secure. Turned fully, the sash swings in so the outside of the glass can be cleaned from inside the room, which is useful on upper floors.", name: "UPVC Tilt and Turn Windows", illustration: "tilt-turn",
        summary: "One handle either tilts the sash in at the top for airflow or swings it fully open.",
        howItOpens: "Handle in one position tilts the sash inward from the top; in the next position the sash swings in on side hinges.",
        suitedFor: ["Upper floors", "Bedrooms", "Rooms where secure ventilation matters"] }),
      p({ slug: "fixed-windows", details: "Fixed windows have no moving sash, so the frame can be slimmer for the same opening and more of it is glass. They are often placed above or beside opening windows and doors, or in staircases and tall walls where an opening sash would be hard to reach.", name: "UPVC Fixed Windows", illustration: "fixed",
        summary: "Non-opening glazed panels for daylight and views where ventilation is not needed.",
        howItOpens: "Does not open. The glass is glazed directly into the frame.",
        suitedFor: ["Staircases", "Double-height walls", "Next to opening windows or doors"] }),
      p({ slug: "top-hung-windows", details: "Top hung windows open outward from the bottom edge, so the open sash acts like a small canopy that helps keep rain out. They are a common choice for bathrooms, kitchens and other rooms that need steady ventilation, and for high openings above other windows.", name: "UPVC Top Hung Windows", illustration: "top-hung",
        summary: "Sashes hinged at the top that open outward from the bottom, letting air in while shedding rain.",
        howItOpens: "Hinged along the top edge; the bottom of the sash pushes outward.",
        suitedFor: ["Bathrooms", "Kitchens", "High-level ventilation"] }),
      p({ slug: "french-windows", details: "French windows are a pair of casement sashes without a fixed centre post. When both sashes are open the full width of the opening is clear, which gives a wide, uninterrupted view and plenty of airflow.", name: "UPVC French Windows", illustration: "french",
        summary: "A pair of casement sashes that open from the centre with no fixed post between them.",
        howItOpens: "Two side-hinged sashes meet in the middle and open outward or inward together.",
        suitedFor: ["Living rooms", "Rooms that open onto a view", "Wide openings"] }),
      p({ slug: "combination-windows", details: "Combination windows bring several types together in one frame, for example a fixed glass band at the top with casement or sliding sashes below. They are planned around the size of the opening and how much of it needs to open, and suit large living-room and feature openings.", name: "UPVC Combination Windows", illustration: "combination",
        summary: "Fixed and opening sections combined in one frame for large openings.",
        howItOpens: "Mix of fixed panels with casement, sliding or top-hung sashes, arranged to suit the opening.",
        suitedFor: ["Large living-room openings", "Feature windows", "Openings that need both light and airflow"] }),
      p({ slug: "folding-windows", details: "Folding windows are made of several hinged panels that run on a track and fold back against each other. With all panels folded, almost the whole opening is clear, which makes them popular for kitchen serving counters and openings onto a balcony or garden.", name: "UPVC Folding Windows", illustration: "folding",
        summary: "Panels that fold back against each other so almost the whole opening clears.",
        howItOpens: "Hinged panels run on a track and stack to one or both sides like a concertina.",
        suitedFor: ["Kitchen serving counters", "Balconies", "Openings to a garden or terrace"] }),
      p({ slug: "bay-windows", details: "A bay window is made of three or more window sections set at angles so that they project outward from the wall. The projection adds a little floor space and lets in light from several directions. The sections can be fixed or opening, depending on the room.", name: "UPVC Bay Windows", illustration: "bay",
        summary: "Windows set at angles that project out from the wall to create an alcove.",
        howItOpens: "A central panel with angled side panels; sections can be fixed or opening.",
        suitedFor: ["Living rooms", "Reading nooks", "Rooms that need more daylight"] }),
      p({ slug: "ventilator-windows", details: "Ventilator windows are small windows for bathrooms, kitchens and utility areas. They are often glazed with frosted glass for privacy and can include louvres or an opening for an exhaust fan. Top-hung and fixed styles are common for these rooms.", name: "UPVC Ventilator and Kitchen Windows", illustration: "ventilator",
        summary: "Small windows for kitchens and bathrooms, often with frosted glass and an exhaust-fan cut-out.",
        howItOpens: "Usually top-hung, louvred or fixed, depending on the room.",
        suitedFor: ["Bathrooms", "Kitchens", "Utility areas"] }),
      p({ slug: "mesh-windows", details: "A mesh window adds an insect screen to a UPVC window so the glass can be left open without letting mosquitoes in. On sliding windows the mesh usually runs on its own track; on casement windows it can be hinged or fixed on the inside.", name: "UPVC Mesh Windows", illustration: "mesh-window",
        summary: "UPVC windows with an insect mesh shutter to keep mosquitoes out while the glass is open.",
        howItOpens: "A mesh shutter runs on its own track or hinge alongside the glass sash.",
        suitedFor: ["Bedrooms", "Ground-floor rooms", "Homes near greenery or water"] }),
    ],
  },
  {
    slug: "upvc-profiles",
    name: "UPVC Profiles",
    shortName: "Profiles",
    summary: "Frames, tracks, sashes, mullions, couplers, glazing beads and mesh profiles for UPVC window fabrication.",
    illustration: "profile",
    products: profiles.map(fromProfile),
  },
];

export const installation = {
  slug: "installation",
  name: "UPVC Window Installation",
  summary: "Measurement, fixing, sealing and finishing of UPVC windows at your site.",
  illustration: "installation" as Illustration,
};

export const allProducts = categories.flatMap((c) => c.products.map((pr) => ({ ...pr, category: c })));

export function productHref(categorySlug: string, productSlug: string) {
  return `/products/${categorySlug}/${productSlug}`;
}
export function categoryHref(categorySlug: string) {
  return `/products/${categorySlug}`;
}
