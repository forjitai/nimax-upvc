/**
 * Blog & Insights articles. To add a post, copy one object, give it a new slug,
 * and write its sections. Posts appear on /blog, in the sitemap and in the footer automatically.
 * Keep articles factual and general; do not invent test figures, prices or customer stories.
 */
export type BlogCategory = "choosing" | "profiles" | "care";
export const blogCategories: { id: BlogCategory; name: string }[] = [
  { id: "choosing", name: "Choosing windows" },
  { id: "profiles", name: "Profiles & fabrication" },
  { id: "care", name: "Planning & care" },
];

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  illustration: "sliding" | "casement" | "profile" | "installation" | "tilt-turn" | "mesh-window" | "profile-beads" | "profile-frames";
  category: BlogCategory;
  /** Approximate reading time in minutes */
  minutes: number;
  related: { label: string; href: string }[];
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "sliding-vs-casement-windows",
    title: "Sliding vs casement windows: which suits your room?",
    description: "How sliding and casement UPVC windows open, where each works best, and how to choose between them for bedrooms, living rooms and balconies.",
    date: "2026-10-25",
    illustration: "casement",
    category: "choosing",
    minutes: 4,
    related: [
      { label: "UPVC sliding windows", href: "/products/upvc-windows/sliding-windows" },
      { label: "UPVC casement windows", href: "/products/upvc-windows/casement-windows" },
    ],
    sections: [
      { paragraphs: [
        "Sliding and casement windows are the two most common UPVC window styles in Indian homes. Both can be made in UPVC, both can take mesh shutters, and both can be made to the size of your opening. The difference is in how they open, and that decides which one suits a room.",
      ] },
      { heading: "How a sliding window works", paragraphs: [
        "A sliding window has two or more sashes that move sideways on tracks inside the frame. A 2-track frame holds two sashes; a 3-track frame adds a third track, usually for an insect mesh shutter. Because the sashes overlap, part of the opening is always covered by glass, even when the window is open.",
        "The big advantage is space. Nothing swings into the room or out over a balcony, so curtains, furniture and grilles can sit close to the window.",
      ] },
      { heading: "How a casement window works", paragraphs: [
        "A casement window has sashes hinged on one side that swing open like a door. When open, almost the whole opening is clear, so you get more airflow from the same size of window. When closed, the sash presses against the frame on all four sides, which gives a tight seal against rain and dust.",
        "Casements need room for the sash to swing, either inside or outside, so check that nothing is in the way.",
      ] },
      { heading: "Which to choose", paragraphs: ["As a rule of thumb:"], list: [
        "Balconies, passages and rooms with furniture near the window: sliding",
        "Rooms where airflow matters most, such as bedrooms in warm weather: casement",
        "Wide openings with a view: French windows (a pair of casements without a centre post) or a combination of fixed and opening panels",
        "Upper floors where you want secure ventilation: tilt and turn",
      ] },
      { heading: "Can you mix them?", paragraphs: [
        "Yes. Many homes use sliding windows in some rooms and casements in others, and a single large opening can combine fixed glass with casement or sliding sashes. If you are unsure, send us photos of the openings and tell us how you use each room.",
      ] },
    ],
  },
  {
    slug: "what-is-a-upvc-profile",
    title: "What is a UPVC profile? Frames, sashes and chambers",
    description: "A plain-language guide to UPVC window profiles: frame, sash, mullion and bead sections, the chambers inside, and why steel reinforcement is used.",
    date: "2026-10-25",
    illustration: "profile",
    category: "profiles",
    minutes: 4,
    related: [
      { label: "UPVC profile catalogue", href: "/products/upvc-profiles" },
      { label: "All UPVC windows", href: "/products/upvc-windows" },
    ],
    sections: [
      { paragraphs: [
        "Every UPVC window starts as lengths of UPVC profile. A profile is a long section of UPVC with a fixed cross-section, made by pushing heated UPVC through a shaped die. The fabricator cuts these lengths, joins them at the corners and fits glass and hardware to make the finished window.",
      ] },
      { heading: "The main profile sections", paragraphs: ["A typical window uses several different profiles:"], list: [
        "Frame: the outer section fixed into the wall opening",
        "Sash: the moving part that holds the glass and opens or slides",
        "Mullion or transom: a bar that divides a window into separate panes or sections",
        "Glazing bead: a thin strip that clips in to hold the glass in place",
        "Interlock and track sections: used on sliding windows where sashes meet and run",
      ] },
      { heading: "What the chambers are for", paragraphs: [
        "If you look at the end of a UPVC profile you will see it is hollow, divided by internal walls into several chambers. The chambers make the profile stiff without making it solid and heavy, and the trapped air helps reduce heat passing through the frame. Some chambers also drain away any water that gets past the outer seal.",
      ] },
      { heading: "Why steel reinforcement is used", paragraphs: [
        "UPVC on its own can flex over long lengths, so a galvanised steel section is usually slid into the main chamber of the frame and sash. This keeps larger windows straight and gives the screws for hinges and locks something firm to grip.",
      ] },
      { heading: "Choosing a profile", paragraphs: [
        "Profiles come in different widths and systems for sliding, casement and other window types, and in different colours and finishes. The right one depends on the window type, its size and where it will be fitted. Contact us with your requirement and we will help you choose.",
      ] },
    ],
  },
  {
    slug: "how-to-measure-for-upvc-windows",
    title: "How to measure your openings for a UPVC window quote",
    description: "A simple guide to measuring window openings and the details to send so you get an accurate UPVC window quotation faster.",
    date: "2026-10-25",
    illustration: "installation",
    category: "care",
    minutes: 3,
    related: [
      { label: "Window installation", href: "/services/installation" },
      { label: "Contact us", href: "/contact" },
    ],
    sections: [
      { paragraphs: [
        "Final sizes are always taken at site before windows are made, but rough measurements help you get an early quotation and plan your budget. Here is how to take them.",
      ] },
      { heading: "What you need", paragraphs: ["A measuring tape, a notebook or your phone, and a few minutes per window."] },
      { heading: "Measuring each opening", paragraphs: ["For every window opening:"], list: [
        "Measure the width at the top, middle and bottom of the opening, and note the smallest",
        "Measure the height at the left, middle and right, and note the smallest",
        "Note whether there is an old frame that will need to be removed",
        "Give each opening a name, for example Bedroom 1 or Kitchen",
      ] },
      { heading: "Details that help with the quotation", list: [
        "The window type you want for each opening (sliding, casement, fixed and so on)",
        "Whether you want a mesh shutter",
        "Any glass preference, such as frosted glass for a bathroom",
        "Whether it is a new building or a replacement",
        "Your area and which floor the windows are on",
      ], paragraphs: [] },
      { heading: "Send photos", paragraphs: [
        "A photo of each opening, taken straight on, tells us a lot about the wall, any existing frame and access. Send the photos with your list on WhatsApp and we will get back to you with a quotation.",
      ] },
    ],
  },
  {
    slug: "parts-of-a-upvc-sliding-window",
    title: "Parts of a UPVC sliding window: a fabricator's guide",
    description: "Which UPVC profiles go into a sliding window: track frame, sliding sash, interlock and mullion, glazing bead and mesh track, and how they fit together.",
    date: "2026-10-25",
    illustration: "profile-frames",
    category: "profiles",
    minutes: 5,
    related: [
      { label: "Frames & tracks", href: "/products/upvc-profiles#frames" },
      { label: "Sashes & sash covers", href: "/products/upvc-profiles#sashes" },
      { label: "Glazing beads", href: "/products/upvc-profiles#beads" },
    ],
    sections: [
      { paragraphs: [
        "A UPVC sliding window looks simple from the room, but it is built from several different profiles that each do one job. Knowing which profile does what makes it easier to order the right set for a job and to explain the window to a customer.",
      ] },
      { heading: "1. The track frame", paragraphs: [
        "The outer frame is fixed into the wall opening. On a sliding window it has raised rails, called tracks, that the sashes run on. A 2-track frame carries two glass sashes. A 3-track frame adds a third track, usually for a mosquito mesh shutter, and a 2.5-track frame has a narrower third track for mesh.",
        "Frame width is chosen to suit the wall and the size of the window: larger windows usually need a deeper frame.",
      ] },
      { heading: "2. The sliding sash", paragraphs: [
        "Each sash is a rectangle of sash profile, welded at the corners, that holds the glass. Rollers fitted into the bottom of the sash let it run smoothly on the track. The sash profile must match the frame series it runs in.",
      ] },
      { heading: "3. Interlock and sash mullion", paragraphs: [
        "Where two sashes meet in the middle, they overlap. Sash mullion or interlock profiles on the meeting edges close this gap so wind and dust cannot pass between the sashes, and stiffen the sash.",
      ] },
      { heading: "4. Glazing bead", paragraphs: [
        "The glass sits in a rebate in the sash and is held in place by a glazing bead that clips in around the inside edge. Beads come in sizes to suit the glass thickness, so the bead is chosen after the glass.",
      ] },
      { heading: "5. Mesh frame and mesh track", paragraphs: [
        "For a mesh shutter, a slim mesh profile is made into a frame with insect netting. It runs on the third track of a 3-track or 2.5-track frame, or on an add-on mesh track.",
      ] },
      { heading: "6. Covers and couplers", paragraphs: [
        "Sash covers finish the visible faces of the sash. Couplers join two frames side by side when an opening is too wide for one window, or when a sliding window sits next to a fixed one.",
      ] },
      { heading: "Ordering a set", paragraphs: [
        "For each window type you make, list the frame, sash, mullion, bead and mesh profiles together, so a full set always arrives. Send us your list and quantities and we will confirm what is available.",
      ] },
    ],
  },
  {
    slug: "upvc-window-mosquito-mesh-options",
    title: "Mosquito mesh for UPVC windows: your options",
    description: "Sliding, fixed and hinged mosquito mesh for UPVC windows: how each works, where each suits, and what to ask for when you order.",
    date: "2026-10-25",
    illustration: "mesh-window",
    category: "choosing",
    minutes: 3,
    related: [
      { label: "UPVC mesh windows", href: "/products/upvc-windows/mesh-windows" },
      { label: "Mesh profiles", href: "/products/upvc-profiles#mesh" },
    ],
    sections: [
      { paragraphs: [
        "In most Bengaluru homes a window without mosquito mesh stays shut in the evening. Adding mesh to a UPVC window lets you keep the glass open for air without letting insects in. There are three common ways to do it.",
      ] },
      { heading: "Sliding mesh shutter", paragraphs: [
        "On sliding windows, a mesh shutter runs on its own track next to the glass sashes. This needs a 3-track or 2.5-track frame, or an add-on mesh track. You slide the mesh across whichever part of the window is open.",
      ] },
      { heading: "Fixed mesh", paragraphs: [
        "A mesh panel is fixed over the opening, usually on the inside. It is simple and suits windows that open outward, such as top-hung bathroom and kitchen windows, where you do not need to reach through the mesh.",
      ] },
      { heading: "Hinged mesh", paragraphs: [
        "For casement windows, a mesh frame can be hinged on the inside so it can be opened to reach the window handle or to clean the glass.",
      ] },
      { heading: "What to tell us", list: [
        "Which windows need mesh, and whether they slide or open on hinges",
        "Whether the frames are new or already fitted",
        "Any rooms where you want mesh that can be opened fully, for example to reach a grille",
      ], paragraphs: [] },
    ],
  },
  {
    slug: "how-to-clean-and-care-for-upvc-windows",
    title: "How to clean and care for UPVC windows",
    description: "Simple cleaning and care for UPVC windows: frames, glass, tracks, gaskets and hardware, and what to avoid so they keep working smoothly.",
    date: "2026-10-25",
    illustration: "sliding",
    category: "care",
    minutes: 3,
    related: [
      { label: "UPVC sliding windows", href: "/products/upvc-windows/sliding-windows" },
      { label: "Contact us", href: "/contact" },
    ],
    sections: [
      { paragraphs: [
        "UPVC windows need very little looking after, but a few minutes every couple of months keeps them clean and smooth, especially in dusty areas and during the monsoon.",
      ] },
      { heading: "Frames", paragraphs: [
        "Wipe the frames with a soft cloth and warm water with a little mild soap or dish liquid. Rinse with clean water and dry. That is all UPVC needs.",
      ], list: [
        "Avoid scouring powder, steel wool and abrasive pads, which scratch the surface",
        "Avoid strong solvents such as thinner or acetone",
      ] },
      { heading: "Tracks of sliding windows", paragraphs: [
        "Dust and sand collect in the bottom track and make sashes harder to slide. Vacuum or brush out the track, then wipe it with a damp cloth. Check that the small drainage slots in the frame are clear so rainwater can run out.",
      ] },
      { heading: "Rubber gaskets", paragraphs: [
        "The rubber seals around the sash keep out wind, water and dust. Wipe them gently with a damp cloth. Do not pull or paint them.",
      ] },
      { heading: "Handles, locks and hinges", paragraphs: [
        "If a handle or hinge feels stiff, a small amount of light machine oil on the moving parts usually frees it. Wipe off any extra.",
      ] },
      { heading: "Glass and mesh", paragraphs: [
        "Clean glass with a normal glass cleaner or water with a little soap. Brush mesh gently, or lift it out if your mesh frame is removable, and rinse it.",
      ] },
      { heading: "When to call us", paragraphs: [
        "If a sash drops, scrapes the frame, does not lock, or water comes in when the window is shut, the window may need adjusting. Call or WhatsApp us with a photo.",
      ] },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
