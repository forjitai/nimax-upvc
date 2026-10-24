/**
 * UPVC profile catalogue.
 *
 * Source: the product list on fenstas.com, which carries NIMAX UPVC's phone
 * numbers (same business). Facts only: name, type, size, wall thickness, colour
 * and use. Where Fenstas's own listing contradicted itself (for example a width
 * that does not match the name), the doubtful value is left out — see
 * docs/fenstas-audit.md. Brand is not shown until the owner confirms it.
 *
 * To add a profile: copy a line, give it a unique slug, set its group.
 */

export type ProfileGroup = "frames" | "sashes" | "mullions" | "beads" | "mesh" | "panels";

export const profileGroups: { id: ProfileGroup; name: string; description: string; use: string }[] = [
  { id: "frames", name: "Frames & tracks",
    description: "Outer frame and track sections fixed into the wall opening. Track frames carry the sashes of sliding windows and doors; casement frames carry hinged sashes.",
    use: "The frame is cut to the size of the opening, welded at the corners and fixed into the wall. Sashes, mesh shutters and fixed glass are fitted into it." },
  { id: "sashes", name: "Sashes & sash covers",
    description: "Sash profiles form the moving part of a window or door, the part that holds the glass. Sliding sashes run in a track frame, out-swing sashes are hinged and open outward, and sash covers finish the sash.",
    use: "The sash is welded into a rectangle around the glass, fitted with rollers or hinges and hardware, and set into the matching frame." },
  { id: "mullions", name: "Mullions, couplers & connectors",
    description: "Mullions divide a window into sections, couplers and connectors join frames or sashes together, and bay poles and bay corners form the angled joints of bay windows.",
    use: "These sections are fixed between or across frames to divide large openings, join units side by side, or turn a corner." },
  { id: "beads", name: "Glazing beads",
    description: "Glazing beads clip into the sash or frame to hold the glass in place. The bead is matched to the glass thickness and to the profile series.",
    use: "After the glass is set into the sash, the bead is cut to length and snapped in around the edge to lock the glass in place." },
  { id: "mesh", name: "Mesh profiles",
    description: "Mesh profiles frame the insect screens that let windows and doors stay open without letting mosquitoes in.",
    use: "The mesh frame is made up with insect netting and runs on its own track or sits beside the glass sash." },
  { id: "panels", name: "Door panels",
    description: "Panel profiles fill the solid lower or full part of a UPVC door.",
    use: "Panels are cut to size and fitted into the door sash in place of glass." },
];

export type ProfileItem = {
  slug: string;
  name: string;
  group: ProfileGroup;
  type: string;
  width?: string;
  thickness?: string;
  usedFor: string;
};

const P = (slug: string, name: string, group: ProfileGroup, type: string, width: string | undefined, thickness: string | undefined, usedFor: string): ProfileItem =>
  ({ slug, name, group, type, width, thickness, usedFor });

export const profiles: ProfileItem[] = [
  // Frames & tracks
  P("112mm-3-track", "112mm 3 Track UPVC Profile", "frames", "3-track sliding frame", "112 mm", "2 mm", "Sliding window and door systems, with room for a mesh track"),
  P("2-5-track", "2.5 Track UPVC Profile", "frames", "2.5-track sliding frame", undefined, "2.2 mm", "Sliding windows for homes, offices and shops"),
  P("55mm-sliding", "55mm Sliding UPVC Profile", "frames", "Sliding profile", "55 mm", "2 mm", "Sliding windows and doors"),
  P("60-45mm-two-track", "60/45mm Two Track UPVC Profile", "frames", "2-track sliding frame", "60/45 mm", "2.5 mm", "Sliding windows and doors"),
  P("62mm-two-track-window-frame", "62mm Two Track Window Frame UPVC Profile", "frames", "2-track window frame", "62 mm", "2.5 mm", "Sliding windows for homes and commercial buildings"),
  P("82mm-2-5-track-window", "82mm 2.5 Track UPVC Window Profile", "frames", "2.5-track sliding frame", undefined, "2.5 mm", "Sliding windows with a mesh track for ventilation and insect protection"),
  P("82mm-2-5-track", "82mm 2.5 Track UPVC Profile", "frames", "2.5-track sliding frame", "82 mm", "2.5 mm", "Sliding window systems for homes and commercial buildings"),
  P("90mm-2-track", "90mm 2 Track UPVC Profile", "frames", "2-track sliding frame", "90 mm", "2 mm", "Sliding window and door systems"),
  P("90mm-2-5-track", "90mm 2.5 Track UPVC Profile", "frames", "2.5-track sliding frame", undefined, "2 mm", "Sliding windows with a mesh track"),
  P("45mm-small-casement-frame", "45mm Small Casement Frame UPVC Profile", "frames", "Casement frame", "45 mm", "2 mm", "Compact casement windows and small openings"),
  P("60mm-casement", "60mm Casement UPVC Profile", "frames", "Casement profile", "60 mm", undefined, "Main frame and sash of casement windows and doors"),
  P("90mm-frame", "90mm UPVC Frame Profile", "frames", "Door frame profile", "90 mm", "2 mm", "Main doors, balcony doors and patio doors"),
  P("60mm-blend-lower", "60mm Blend Lower UPVC Profile", "frames", "Blend lower", "60 mm", "2 mm", "Base and support for sliding window and door sashes"),
  // Sashes & covers
  P("57mm-sash", "57mm Sash UPVC Profile", "sashes", "Sash profile", "57 mm", "2 mm", "Holding glass in windows and doors"),
  P("57mm-sliding-sash", "57mm Sliding Sash UPVC Profile", "sashes", "Sliding sash", "57 mm", "1.5 mm", "Sliding windows and doors for homes and commercial buildings"),
  P("80-series-66mm-sliding-sash", "80 Series 66mm Sliding Sash", "sashes", "Sliding sash", "66 mm", "2.1 mm", "Sliding windows, doors and fabrication work"),
  P("86mm-sliding-sash", "86mm Sliding Sash UPVC Profile", "sashes", "Sliding sash", "86 mm", "2 mm", "Sliding windows and doors"),
  P("90-66mm-sliding-sash", "90 Series 66mm Sliding Sash UPVC Profile", "sashes", "Sliding sash", "90 mm frame / 66 mm sash", "2 mm", "Sliding windows for homes and commercial buildings"),
  P("90-series-85mm-sliding-sash", "90 Series 85mm Sliding Sash Profile", "sashes", "Sliding sash", "90/85 mm", "2.5 mm", "Sliding windows and doors for homes and commercial buildings"),
  P("72mm-out-swing-window-sash", "72mm Out Swing Window Sash UPVC Profile", "sashes", "Out-swing window sash", "72 mm", "2 mm", "Outward-opening casement windows"),
  P("60-out-swing-door-sash", "60 Out Swing Door Sash", "sashes", "Out-swing door sash", undefined, "2.3 mm", "Patio doors, French doors and balcony doors that open outward"),
  P("112mm-door-sash-cover", "112mm Door Sash Cover UPVC Profile", "sashes", "Door sash cover", "112 mm", "1.5 mm", "Finishing and protecting door sashes"),
  P("88mm-sliding-sash-cover", "88mm Sliding Sash Cover Profile", "sashes", "Sliding sash cover", "88 mm", "2 mm", "Finishing and protecting sliding window sashes"),
  // Mullions, couplers & connectors
  P("65mm-sash-mullion", "65mm Sash Mullion UPVC Profile", "mullions", "Sash mullion", "65 mm", "2.8 mm", "Dividing and supporting sliding window and door sashes"),
  P("88mm-sash-mullion", "88mm Sash Mullion UPVC Profile", "mullions", "Sash mullion", "88 mm", "1.5 mm", "Dividing and supporting sliding window and door sashes"),
  P("t-mullion", "T Mullion UPVC Profile", "mullions", "T mullion", "60 mm", "2.8 mm", "Dividing larger casement windows into sections"),
  P("60mm-coupler", "60mm Coupler UPVC Profile", "mullions", "Coupler", "60 mm", "2 mm", "Joining UPVC window and door frames"),
  P("88-60-coupler", "88/60 Coupler UPVC Profile", "mullions", "Coupler", "88 mm and 60 mm", "1.5 mm", "Joining two frames of different depths"),
  P("88mm-sash-connector", "88mm Sash Connector", "mullions", "Sash connector", "88 mm", "1.6 mm", "Connecting UPVC window sash profiles"),
  P("60mm-bay-pole", "60mm Bay Pole UPVC Profile", "mullions", "Bay pole", "60 mm", "2 mm", "Angled joints between frames in bay windows"),
  P("80-60mm-bay-corner", "80mm & 60mm Bay Corner UPVC Profile", "mullions", "Bay corner", "80 mm and 60 mm", "1.5 mm", "Corner joints in bay window frames"),
  P("tube-adaptor", "UPVC Tube Adaptor", "mullions", "Tube adaptor", undefined, "1.5 mm", "Windows and general UPVC work"),
  // Glazing beads
  P("5mm-casement-single-glazing-bead", "5mm Casement Single Glazing Bead UPVC Profile", "beads", "Casement glazing bead", undefined, "1.5 mm", "Holding a single glass pane in casement windows"),
  P("5mm-glazing-bead-90-series", "5mm Glazing Bead 90 Series UPVC Profile", "beads", "Glazing bead", undefined, "2 mm", "Holding glass in 90-series window and door frames"),
  P("5mm-sliding-bead", "5mm Sliding Bead UPVC Glazing Profile", "beads", "Sliding glazing bead", "5 mm", "1.5 mm", "Holding glass in sliding windows and doors"),
  P("80-series-5mm-glazing-bead", "80 Series 5mm Glazing Bead UPVC Profile", "beads", "Glazing bead", undefined, "2 mm", "Holding glass in 80-series window and door frames"),
  P("lower-glazing-bead-hole", "Lower Glazing Bead Hole UPVC Profile", "beads", "Lower glazing bead with drainage", undefined, "2 mm", "Holding glass while letting water drain from the sash"),
  P("round-bead", "Round Bead UPVC Profile", "beads", "Round glazing bead", undefined, "2 mm", "Glazing UPVC windows and doors"),
  // Mesh
  P("52mm-mesh-sliding", "52mm UPVC Mesh Sliding Profile", "mesh", "Sliding mesh frame", "52 mm", "1.5 mm", "Sliding mosquito mesh shutters in windows and doors"),
  P("62mm-big-door-mesh", "62mm Big Door Mesh UPVC Profile", "mesh", "Door mesh frame", "62 mm", "1.8 mm", "Mosquito mesh shutters for large doors"),
  P("mesh-add-track", "Mesh Add Track", "mesh", "Add-on mesh track", undefined, "2 mm", "Adding a sliding mesh track to sliding windows"),
  P("mesh-mullion", "Mesh Mullion UPVC Profile", "mesh", "Mesh mullion", undefined, "2 mm", "Dividing and supporting mosquito mesh panels"),
  P("mesh-window-track", "Mesh Window Track UPVC Profile", "mesh", "Mesh track", "67 mm", "2.5 mm", "Sliding mosquito mesh screens in UPVC windows"),
  // Panels
  P("20-150mm-door-panel", "20/150mm UPVC Door Panel Profile", "panels", "Door panel", undefined, "2 mm", "Solid panels in UPVC doors"),
];

export function profileGroup(id: ProfileGroup) {
  return profileGroups.find((g) => g.id === id)!;
}
