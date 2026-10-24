/**
 * NIMAX UPVC — product catalogue.
 *
 * Every product the owner confirmed (24 Oct 2026: "All products").
 * Text here describes each product TYPE in general terms. It deliberately
 * contains no prices, sizes, glass thicknesses, brands, warranties or
 * performance figures. Add those to `specs` only when the owner supplies them.
 */

export type Illustration =
  | "sliding" | "casement" | "tilt-turn" | "fixed" | "top-hung" | "french"
  | "combination" | "folding" | "bay" | "ventilator" | "mesh-window"
  | "door-sliding" | "door-casement" | "door-french" | "door-folding"
  | "door-tilt-slide" | "door-patio" | "door-bathroom" | "door-mesh"
  | "alu-window" | "alu-door" | "partition" | "skylight" | "installation";

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
  illustration: Illustration;
  /** Verified specifications only. Empty until supplied. */
  specs: Spec[];
  /** Photo files in /public/images/products/. Empty until supplied. */
  photos: { src: string; alt: string; width: number; height: number }[];
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  illustration: Illustration;
  products: Product[];
};

const p = (x: Omit<Product, "specs" | "photos">): Product => ({ ...x, specs: [], photos: [] });

export const categories: Category[] = [
  {
    slug: "upvc-windows",
    name: "UPVC Windows",
    shortName: "Windows",
    summary: "Sliding, casement, tilt and turn, fixed and other UPVC window styles, made to the size of each opening.",
    illustration: "sliding",
    products: [
      p({ slug: "sliding-windows", name: "UPVC Sliding Windows", illustration: "sliding",
        summary: "Sashes that glide sideways on tracks, so the window opens without taking up room inside or outside.",
        howItOpens: "One or more sashes slide horizontally past each other on a 2-track or 3-track frame.",
        suitedFor: ["Bedrooms and living rooms", "Balconies", "Rooms where an outward-opening sash would get in the way"] }),
      p({ slug: "casement-windows", name: "UPVC Casement Windows", illustration: "casement",
        summary: "Side-hinged sashes that swing open fully for the most ventilation from a window opening.",
        howItOpens: "Each sash is hinged on one side and swings outward or inward like a door.",
        suitedFor: ["Bedrooms", "Living rooms", "Rooms that need full-width airflow"] }),
      p({ slug: "tilt-and-turn-windows", name: "UPVC Tilt and Turn Windows", illustration: "tilt-turn",
        summary: "One handle either tilts the sash in at the top for airflow or swings it fully open.",
        howItOpens: "Handle in one position tilts the sash inward from the top; in the next position the sash swings in on side hinges.",
        suitedFor: ["Upper floors", "Bedrooms", "Rooms where secure ventilation matters"] }),
      p({ slug: "fixed-windows", name: "UPVC Fixed Windows", illustration: "fixed",
        summary: "Non-opening glazed panels for daylight and views where ventilation is not needed.",
        howItOpens: "Does not open. The glass is glazed directly into the frame.",
        suitedFor: ["Staircases", "Double-height walls", "Next to opening windows or doors"] }),
      p({ slug: "top-hung-windows", name: "UPVC Top Hung Windows", illustration: "top-hung",
        summary: "Sashes hinged at the top that open outward from the bottom, letting air in while shedding rain.",
        howItOpens: "Hinged along the top edge; the bottom of the sash pushes outward.",
        suitedFor: ["Bathrooms", "Kitchens", "High-level ventilation"] }),
      p({ slug: "french-windows", name: "UPVC French Windows", illustration: "french",
        summary: "A pair of casement sashes that open from the centre with no fixed post between them.",
        howItOpens: "Two side-hinged sashes meet in the middle and open outward or inward together.",
        suitedFor: ["Living rooms", "Rooms that open onto a view", "Wide openings"] }),
      p({ slug: "combination-windows", name: "UPVC Combination Windows", illustration: "combination",
        summary: "Fixed and opening sections combined in one frame for large openings.",
        howItOpens: "Mix of fixed panels with casement, sliding or top-hung sashes, arranged to suit the opening.",
        suitedFor: ["Large living-room openings", "Feature windows", "Openings that need both light and airflow"] }),
      p({ slug: "folding-windows", name: "UPVC Folding Windows", illustration: "folding",
        summary: "Panels that fold back against each other so almost the whole opening clears.",
        howItOpens: "Hinged panels run on a track and stack to one or both sides like a concertina.",
        suitedFor: ["Kitchen serving counters", "Balconies", "Openings to a garden or terrace"] }),
      p({ slug: "bay-windows", name: "UPVC Bay Windows", illustration: "bay",
        summary: "Windows set at angles that project out from the wall to create an alcove.",
        howItOpens: "A central panel with angled side panels; sections can be fixed or opening.",
        suitedFor: ["Living rooms", "Reading nooks", "Rooms that need more daylight"] }),
      p({ slug: "ventilator-windows", name: "UPVC Ventilator and Kitchen Windows", illustration: "ventilator",
        summary: "Small windows for kitchens and bathrooms, often with frosted glass and an exhaust-fan cut-out.",
        howItOpens: "Usually top-hung, louvred or fixed, depending on the room.",
        suitedFor: ["Bathrooms", "Kitchens", "Utility areas"] }),
      p({ slug: "mesh-windows", name: "UPVC Mesh Windows", illustration: "mesh-window",
        summary: "UPVC windows with an insect mesh shutter to keep mosquitoes out while the glass is open.",
        howItOpens: "A mesh shutter runs on its own track or hinge alongside the glass sash.",
        suitedFor: ["Bedrooms", "Ground-floor rooms", "Homes near greenery or water"] }),
    ],
  },
  {
    slug: "upvc-doors",
    name: "UPVC Doors",
    shortName: "Doors",
    summary: "Sliding, casement, French, folding and other UPVC doors for balconies, patios, bathrooms and entrances.",
    illustration: "door-sliding",
    products: [
      p({ slug: "sliding-doors", name: "UPVC Sliding Doors", illustration: "door-sliding",
        summary: "Large glazed panels that slide sideways, opening a wide passage without a door swing.",
        howItOpens: "Panels slide horizontally on 2 or 3 tracks.",
        suitedFor: ["Balconies", "Patios", "Wide openings between rooms"] }),
      p({ slug: "casement-doors", name: "UPVC Casement and Hinged Doors", illustration: "door-casement",
        summary: "Side-hinged UPVC doors that swing open, in single or double leaf, including swing and fixed-panel layouts.",
        howItOpens: "Hinged on one side and swings inward or outward; may sit beside fixed glazed panels.",
        suitedFor: ["Balcony and terrace doors", "Utility doors", "Rear entrances"] }),
      p({ slug: "french-doors", name: "UPVC French Doors", illustration: "door-french",
        summary: "Double glazed doors that open from the centre to create a wide, bright entrance.",
        howItOpens: "Two hinged leaves meet at the centre and open together.",
        suitedFor: ["Living rooms opening to a garden or balcony", "Wide doorways"] }),
      p({ slug: "folding-doors", name: "UPVC Folding Doors", illustration: "door-folding",
        summary: "Bi-fold and slide-and-fold doors that stack to the side to open most of the wall.",
        howItOpens: "Hinged panels slide on a track and fold together at one or both ends.",
        suitedFor: ["Living rooms to terraces", "Large openings", "Indoor–outdoor spaces"] }),
      p({ slug: "tilt-and-slide-doors", name: "UPVC Tilt and Slide Doors", illustration: "door-tilt-slide",
        summary: "Doors that tilt in at the top for airflow or lift and slide open for passage.",
        howItOpens: "The handle tilts the panel inward from the top; in a second position the panel moves out and slides.",
        suitedFor: ["Balconies", "Patios", "Openings that need ventilation with the door closed"] }),
      p({ slug: "patio-doors", name: "UPVC Patio Doors", illustration: "door-patio",
        summary: "Large glazed doors that connect indoor rooms to a patio, garden or terrace.",
        howItOpens: "Sliding, hinged or folding, depending on the opening.",
        suitedFor: ["Gardens", "Terraces", "Ground-floor living rooms"] }),
      p({ slug: "bathroom-doors", name: "UPVC Bathroom Doors", illustration: "door-bathroom",
        summary: "UPVC doors for wet areas, where wooden doors tend to swell or rot.",
        howItOpens: "Usually hinged; sliding options for tight spaces.",
        suitedFor: ["Bathrooms", "Toilets", "Utility and wash areas"] }),
      p({ slug: "mesh-doors", name: "UPVC Mosquito Mesh Doors", illustration: "door-mesh",
        summary: "A mesh door added to a UPVC doorway so it can stay open without letting insects in.",
        howItOpens: "Hinged or sliding mesh panel beside or in front of the main door.",
        suitedFor: ["Main doors", "Balcony doors", "Kitchen and utility doors"] }),
    ],
  },
  {
    slug: "aluminium",
    name: "Aluminium Windows & Doors",
    shortName: "Aluminium",
    summary: "Slim aluminium windows and doors in sliding, casement and folding styles for homes and commercial spaces.",
    illustration: "alu-window",
    products: [
      p({ slug: "aluminium-windows", name: "Aluminium Windows", illustration: "alu-window",
        summary: "Aluminium sliding, casement, fixed, top-hung, French, tilt and turn and arched windows.",
        howItOpens: "Available in the same opening styles as UPVC windows.",
        suitedFor: ["Shops and offices", "Large openings", "Slim-frame designs"] }),
      p({ slug: "aluminium-doors", name: "Aluminium Doors", illustration: "alu-door",
        summary: "Aluminium casement, sliding, sliding-folding, French, mesh and bathroom doors.",
        howItOpens: "Hinged, sliding or folding, depending on the door type.",
        suitedFor: ["Commercial entrances", "Balconies", "Bathrooms"] }),
    ],
  },
  {
    slug: "glass-systems",
    name: "Glass Partitions & Skylights",
    shortName: "Glass",
    summary: "Aluminium-framed glass partitions for offices and glass skylights that bring daylight in from above.",
    illustration: "partition",
    products: [
      p({ slug: "glass-partitions", name: "Aluminium Glass Partitions", illustration: "partition",
        summary: "Glass walls in aluminium frames that divide a space while keeping it bright.",
        howItOpens: "Fixed panels, with hinged or sliding glass doors where needed.",
        suitedFor: ["Office cabins", "Meeting rooms", "Shops and showrooms"] }),
      p({ slug: "skylights", name: "Aluminium Glass Skylights", illustration: "skylight",
        summary: "Glazed roof openings in aluminium frames that bring daylight into rooms below.",
        howItOpens: "Fixed glazing set into the roof or a covered courtyard.",
        suitedFor: ["Stairwells", "Courtyards and atriums", "Rooms without side windows"] }),
    ],
  },
];

export const installation = {
  slug: "installation",
  name: "UPVC Window & Door Installation",
  summary: "Measurement, fixing, sealing and finishing of UPVC windows and doors at your site.",
  illustration: "installation" as Illustration,
};

export const allProducts = categories.flatMap((c) => c.products.map((pr) => ({ ...pr, category: c })));

export function productHref(categorySlug: string, productSlug: string) {
  return `/products/${categorySlug}/${productSlug}`;
}
export function categoryHref(categorySlug: string) {
  return `/products/${categorySlug}`;
}
