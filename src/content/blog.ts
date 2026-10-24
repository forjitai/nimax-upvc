/**
 * Blog & Insights articles. To add a post, copy one object, give it a new slug,
 * and write its sections. Posts appear on /blog, in the sitemap and in the footer automatically.
 * Keep articles factual and general; do not invent test figures, prices or customer stories.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  illustration: "sliding" | "casement" | "profile" | "installation" | "tilt-turn";
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
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
