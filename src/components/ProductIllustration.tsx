import type { Illustration } from "@/config/products";
import type { ReactNode } from "react";

/**
 * Line drawings of each product type, using architectural conventions:
 *  - dashed triangle: hinged sash, the point of the triangle is the hinge side
 *  - arrow: direction a sliding panel moves
 * All colours come from the theme. These stand in for photos and also
 * explain how each product opens.
 */

const C = {
  frame: "var(--nx-primary)",
  glass: "var(--nx-secondary)",
  streak: "var(--nx-bg)",
  accent: "var(--nx-accent)",
  wall: "var(--nx-bg-alt)",
  line: "var(--nx-border-strong)",
};

function Glass({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const s = Math.min(w, h);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.glass} />
      <polygon points={`${x + w * 0.15},${y + h} ${x + w * 0.15 + s * 0.22},${y + h} ${x + w * 0.62},${y} ${x + w * 0.62 - s * 0.22},${y}`}
        fill={C.streak} opacity={0.55} />
    </g>
  );
}

function Sash({ x, y, w, h, sw = 5 }: { x: number; y: number; w: number; h: number; sw?: number }) {
  return (
    <g>
      <Glass x={x} y={y} w={w} h={h} />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.frame} strokeWidth={sw} />
    </g>
  );
}

/** Dashed opening triangle; apex points to the hinge side */
function Swing({ x, y, w, h, hinge }: { x: number; y: number; w: number; h: number; hinge: "left" | "right" | "top" | "bottom" }) {
  const pts = {
    left: `${x + w},${y} ${x},${y + h / 2} ${x + w},${y + h}`,
    right: `${x},${y} ${x + w},${y + h / 2} ${x},${y + h}`,
    top: `${x},${y + h} ${x + w / 2},${y} ${x + w},${y + h}`,
    bottom: `${x},${y} ${x + w / 2},${y + h} ${x + w},${y}`,
  }[hinge];
  return <polyline points={pts} fill="none" stroke={C.accent} strokeWidth={2.5} strokeDasharray="7 5" strokeLinejoin="round" />;
}

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const dir = x2 > x1 ? 1 : -1;
  return (
    <g stroke={C.accent} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      <polyline points={`${x2 - dir * 9},${y - 7} ${x2},${y} ${x2 - dir * 9},${y + 7}`} />
    </g>
  );
}

function Handle({ x, y, v = true }: { x: number; y: number; v?: boolean }) {
  return v ? <rect x={x - 2.5} y={y - 9} width={5} height={18} rx={2.5} fill={C.accent} />
    : <rect x={x - 9} y={y - 2.5} width={18} height={5} rx={2.5} fill={C.accent} />;
}

function Mesh({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const lines: ReactNode[] = [];
  for (let i = 6; i < w; i += 6) lines.push(<line key={`v${i}`} x1={x + i} y1={y} x2={x + i} y2={y + h} />);
  for (let j = 6; j < h; j += 6) lines.push(<line key={`h${j}`} x1={x} y1={y + j} x2={x + w} y2={y + j} />);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={C.wall} />
      <g stroke={C.line} strokeWidth={1}>{lines}</g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.frame} strokeWidth={5} />
    </g>
  );
}

function OuterFrame({ x, y, w, h, sw = 9 }: { x: number; y: number; w: number; h: number; sw?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.frame} strokeWidth={sw} rx={2} />;
}

function Floor() {
  return <line x1={10} y1={186} x2={230} y2={186} stroke={C.line} strokeWidth={2} />;
}

const drawings: Record<Illustration, () => ReactNode> = {
  sliding: () => (<>
    <rect x={30} y={40} width={180} height={120} fill={C.wall} />
    <Sash x={40} y={50} w={86} h={100} />
    <Sash x={114} y={50} w={86} h={100} />
    <Handle x={120} y={100} />
    <OuterFrame x={30} y={40} w={180} h={120} />
    <Arrow x1={180} x2={140} y={172} />
  </>),
  casement: () => (<>
    <Sash x={40} y={40} w={80} h={120} /><Sash x={120} y={40} w={80} h={120} />
    <Swing x={44} y={44} w={72} h={112} hinge="left" /><Swing x={124} y={44} w={72} h={112} hinge="right" />
    <Handle x={110} y={100} /><Handle x={130} y={100} />
    <OuterFrame x={34} y={34} w={172} h={132} />
  </>),
  "tilt-turn": () => (<>
    <Sash x={60} y={30} w={120} h={140} />
    <Swing x={64} y={34} w={112} h={132} hinge="bottom" />
    <Swing x={64} y={34} w={112} h={132} hinge="left" />
    <Handle x={166} y={100} />
    <OuterFrame x={54} y={24} w={132} h={152} />
  </>),
  fixed: () => (<>
    <Sash x={50} y={30} w={140} h={140} sw={6} />
    <OuterFrame x={44} y={24} w={152} h={152} />
  </>),
  "top-hung": () => (<>
    <Sash x={50} y={50} w={140} h={100} />
    <Swing x={54} y={54} w={132} h={92} hinge="top" />
    <Handle x={120} y={140} v={false} />
    <OuterFrame x={44} y={44} w={152} h={112} />
  </>),
  french: () => (<>
    <Sash x={50} y={24} w={70} h={152} /><Sash x={120} y={24} w={70} h={152} />
    <Swing x={54} y={28} w={62} h={144} hinge="left" /><Swing x={124} y={28} w={62} h={144} hinge="right" />
    <Handle x={112} y={100} /><Handle x={128} y={100} />
    <OuterFrame x={44} y={18} w={152} h={164} />
  </>),
  combination: () => (<>
    <Sash x={30} y={30} w={180} h={50} />
    <Sash x={30} y={80} w={60} h={90} /><Sash x={90} y={80} w={60} h={90} /><Sash x={150} y={80} w={60} h={90} />
    <Swing x={34} y={84} w={52} h={82} hinge="left" /><Swing x={154} y={84} w={52} h={82} hinge="right" />
    <OuterFrame x={24} y={24} w={192} h={152} />
  </>),
  folding: () => (<>
    {[0, 1, 2, 3].map((i) => <Sash key={i} x={30 + i * 45} y={40} w={45} h={110} />)}
    <g stroke={C.accent} strokeWidth={2.5} fill="none" strokeDasharray="7 5">
      <polyline points="34,146 52,44 70,146" /><polyline points="124,146 142,44 160,146" />
    </g>
    <OuterFrame x={24} y={34} w={192} h={122} />
    <Arrow x1={180} x2={120} y={172} />
  </>),
  bay: () => (<>
    <polygon points="20,50 70,30 70,160 20,150" fill={C.glass} stroke={C.frame} strokeWidth={6} />
    <Sash x={70} y={30} w={100} h={130} sw={6} />
    <polygon points="170,30 220,50 220,150 170,160" fill={C.glass} stroke={C.frame} strokeWidth={6} />
    <polygon points="10,160 230,160 220,176 20,176" fill={C.wall} stroke={C.frame} strokeWidth={3} />
  </>),
  ventilator: () => (<>
    <rect x={40} y={20} width={160} height={160} fill={C.wall} />
    <Sash x={70} y={50} w={100} h={80} />
    <g stroke={C.frame} strokeWidth={3}>{[62, 74, 86, 98, 110, 122].map((y) => <line key={y} x1={74} y1={y} x2={166} y2={y} />)}</g>
    <circle cx={120} cy={152} r={14} fill="none" stroke={C.line} strokeWidth={3} />
    <OuterFrame x={64} y={44} w={112} h={92} sw={8} />
  </>),
  "mesh-window": () => (<>
    <Sash x={40} y={50} w={80} h={100} />
    <Mesh x={120} y={50} w={80} h={100} />
    <OuterFrame x={32} y={42} w={176} h={116} />
    <Arrow x1={190} x2={150} y={172} />
  </>),
  "door-sliding": () => (<>
    <Floor />
    <Sash x={40} y={20} w={86} h={160} /><Sash x={114} y={20} w={86} h={160} />
    <Handle x={120} y={104} />
    <OuterFrame x={32} y={12} w={176} h={174} />
    <Arrow x1={180} x2={140} y={198} />
  </>),
  "door-casement": () => (<>
    <Floor />
    <Sash x={70} y={20} w={100} h={160} />
    <rect x={70} y={130} width={100} height={50} fill={C.wall} stroke={C.frame} strokeWidth={5} />
    <Swing x={74} y={24} w={92} h={152} hinge="left" />
    <Handle x={158} y={110} />
    <OuterFrame x={62} y={12} w={116} h={174} />
  </>),
  "door-french": () => (<>
    <Floor />
    <Sash x={50} y={20} w={70} h={160} /><Sash x={120} y={20} w={70} h={160} />
    <Swing x={54} y={24} w={62} h={152} hinge="left" /><Swing x={124} y={24} w={62} h={152} hinge="right" />
    <Handle x={112} y={110} /><Handle x={128} y={110} />
    <OuterFrame x={42} y={12} w={156} h={174} />
  </>),
  "door-folding": () => (<>
    <Floor />
    {[0, 1, 2, 3].map((i) => <Sash key={i} x={24 + i * 48} y={20} w={48} h={160} />)}
    <g stroke={C.accent} strokeWidth={2.5} fill="none" strokeDasharray="7 5">
      <polyline points="28,176 48,24 68,176" /><polyline points="124,176 144,24 164,176" />
    </g>
    <OuterFrame x={16} y={12} w={208} h={174} />
  </>),
  "door-tilt-slide": () => (<>
    <Floor />
    <Sash x={40} y={20} w={80} h={160} /><Sash x={120} y={20} w={80} h={160} />
    <Swing x={124} y={24} w={72} h={152} hinge="bottom" />
    <Handle x={128} y={104} />
    <OuterFrame x={32} y={12} w={176} h={174} />
    <Arrow x1={180} x2={140} y={198} />
  </>),
  "door-patio": () => (<>
    <rect x={0} y={150} width={240} height={36} fill={C.wall} />
    <Floor />
    {[0, 1, 2].map((i) => <Sash key={i} x={20 + i * 66} y={20} w={68} h={160} />)}
    <Handle x={150} y={104} />
    <OuterFrame x={12} y={12} w={216} h={174} />
  </>),
  "door-bathroom": () => (<>
    <Floor />
    <rect x={74} y={20} width={92} height={160} fill={C.wall} stroke={C.frame} strokeWidth={5} />
    <rect x={92} y={40} width={56} height={70} fill={C.glass} stroke={C.frame} strokeWidth={3} />
    <g stroke={C.streak} strokeWidth={2} opacity={0.7}>{[50, 60, 70, 80, 90, 100].map((y) => <line key={y} x1={96} y1={y} x2={144} y2={y} />)}</g>
    <Handle x={156} y={116} />
    <OuterFrame x={66} y={12} w={108} h={174} />
  </>),
  "door-mesh": () => (<>
    <Floor />
    <Mesh x={70} y={20} w={100} h={160} />
    <Handle x={158} y={110} />
    <Swing x={74} y={24} w={92} h={152} hinge="left" />
    <OuterFrame x={62} y={12} w={116} h={174} />
  </>),
  "alu-window": () => (<>
    <rect x={20} y={40} width={200} height={120} fill={C.wall} />
    {[0, 1, 2].map((i) => <g key={i}><Glass x={26 + i * 63} y={46} w={63} h={108} /><rect x={26 + i * 63} y={46} width={63} height={108} fill="none" stroke={C.frame} strokeWidth={2.5} /></g>)}
    <OuterFrame x={20} y={40} w={200} h={120} sw={4} />
    <Arrow x1={190} x2={150} y={172} />
  </>),
  "alu-door": () => (<>
    <Floor />
    <Glass x={76} y={20} w={88} h={160} />
    <rect x={76} y={20} width={88} height={160} fill="none" stroke={C.frame} strokeWidth={3} />
    <line x1={76} y1={120} x2={164} y2={120} stroke={C.frame} strokeWidth={3} />
    <Handle x={154} y={104} />
    <OuterFrame x={70} y={14} w={100} h={172} sw={4} />
  </>),
  partition: () => (<>
    <Floor />
    <line x1={10} y1={20} x2={230} y2={20} stroke={C.frame} strokeWidth={4} />
    {[0, 1, 3].map((i) => <g key={i}><Glass x={14 + i * 54} y={22} w={50} h={162} /><rect x={14 + i * 54} y={22} width={50} height={162} fill="none" stroke={C.frame} strokeWidth={2.5} /></g>)}
    <rect x={122} y={22} width={50} height={162} fill="none" stroke={C.frame} strokeWidth={2.5} />
    <Swing x={124} y={26} w={46} h={156} hinge="left" />
    <Handle x={165} y={110} />
  </>),
  skylight: () => (<>
    <polygon points="10,120 120,40 230,120" fill={C.wall} stroke={C.frame} strokeWidth={4} strokeLinejoin="round" />
    <polygon points="78,92 120,62 162,92 120,92" fill={C.glass} stroke={C.frame} strokeWidth={4} strokeLinejoin="round" />
    <g stroke={C.accent} strokeWidth={2.5} strokeDasharray="6 6">
      <line x1={100} y1={98} x2={86} y2={176} /><line x1={120} y1={98} x2={120} y2={176} /><line x1={140} y1={98} x2={154} y2={176} />
    </g>
    <line x1={10} y1={180} x2={230} y2={180} stroke={C.line} strokeWidth={2} />
  </>),
  profile: () => (<>
    {/* Cross-section of a multi-chamber UPVC frame profile with steel reinforcement */}
    <path d="M40 40 H200 V70 H186 V160 H200 V170 H40 Z" fill={C.streak} stroke={C.frame} strokeWidth={6} strokeLinejoin="round" />
    <g fill="none" stroke={C.frame} strokeWidth={3.5}>
      <rect x={52} y={52} width={40} height={106} rx={2} />
      <rect x={100} y={52} width={74} height={106} rx={2} />
      <rect x={182} y={48} width={10} height={14} rx={1} />
    </g>
    <rect x={110} y={64} width={54} height={82} fill="none" stroke={C.accent} strokeWidth={4} rx={1} />
    <g stroke={C.frame} strokeWidth={2.5}><line x1={52} y1={105} x2={92} y2={105} /></g>
    <g fill={C.line}><rect x={20} y={70} width={20} height={10} rx={2} /><rect x={20} y={130} width={20} height={10} rx={2} /></g>
    <text x={137} y={190} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.accent} style={{ letterSpacing: "0.08em" }}>STEEL</text>
  </>),
  /* Cross-sections for the profile catalogue, one per profile group */
  "profile-frames": () => (<>
    {/* Sliding track frame: base with three upright rails */}
    <path d="M30 150 H210 V120 H200 V60 H188 V120 H160 V60 H148 V120 H120 V60 H108 V120 H40 V150 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <g fill="none" stroke={C.frame} strokeWidth={3}><rect x={46} y={126} width={44} height={18} /><rect x={96} y={126} width={44} height={18} /><rect x={146} y={126} width={56} height={18} /></g>
    <rect x={100} y={130} width={36} height={10} fill="none" stroke={C.accent} strokeWidth={3} />
    <g stroke={C.line} strokeWidth={2} strokeDasharray="4 4"><line x1={114} y1={56} x2={114} y2={28} /><line x1={154} y1={56} x2={154} y2={28} /><line x1={194} y1={56} x2={194} y2={28} /></g>
  </>),
  "profile-sashes": () => (<>
    {/* Sash: hollow section with glazing rebate and glass */}
    <rect x={150} y={30} width={14} height={140} fill={C.glass} stroke={C.line} strokeWidth={2} />
    <path d="M60 40 H150 V70 H140 V130 H150 V160 H60 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <g fill="none" stroke={C.frame} strokeWidth={3}><rect x={70} y={50} width={30} height={100} /><rect x={106} y={50} width={28} height={100} /></g>
    <rect x={112} y={64} width={16} height={72} fill="none" stroke={C.accent} strokeWidth={3} />
    <circle cx={85} cy={166} r={6} fill={C.accent} />
  </>),
  "profile-mullions": () => (<>
    {/* T mullion between two glass panes */}
    <rect x={30} y={70} width={70} height={14} fill={C.glass} stroke={C.line} strokeWidth={2} />
    <rect x={140} y={70} width={70} height={14} fill={C.glass} stroke={C.line} strokeWidth={2} />
    <path d="M70 92 H170 V122 H136 V176 H104 V122 H70 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <path d="M100 40 H140 V92 H100 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <rect x={110} y={128} width={20} height={40} fill="none" stroke={C.accent} strokeWidth={3} />
    <g fill="none" stroke={C.frame} strokeWidth={3}><rect x={78} y={100} width={26} height={16} /><rect x={136} y={100} width={26} height={16} /></g>
  </>),
  "profile-beads": () => (<>
    {/* Glazing bead clipped against the glass edge */}
    <rect x={60} y={30} width={16} height={140} fill={C.glass} stroke={C.line} strokeWidth={2} />
    <path d="M30 60 H58 V140 H30 Z" fill={C.streak} stroke={C.line} strokeWidth={3} />
    <path d="M78 70 H150 Q170 70 170 92 V108 Q170 130 150 130 H78 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <path d="M150 130 V150 H130" fill="none" stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
    <rect x={90} y={82} width={44} height={36} fill="none" stroke={C.frame} strokeWidth={3} />
  </>),
  "profile-mesh": () => (<>
    {/* Slim mesh frame with netting */}
    <path d="M40 60 H120 V140 H40 Z" fill={C.streak} stroke={C.frame} strokeWidth={5} strokeLinejoin="round" />
    <rect x={52} y={72} width={56} height={56} fill="none" stroke={C.frame} strokeWidth={3} />
    <g stroke={C.line} strokeWidth={1.5}>{[130, 140, 150, 160, 170, 180, 190, 200].map((x) => <line key={x} x1={x} y1={70} x2={x} y2={130} />)}{[78, 90, 102, 114, 126].map((y) => <line key={y} x1={124} y1={y} x2={206} y2={y} />)}</g>
    <path d="M112 92 H128 V108 H112" fill="none" stroke={C.accent} strokeWidth={3.5} />
  </>),
  "profile-panels": () => (<>
    {/* Long flat door panel with internal ribs */}
    <rect x={30} y={80} width={180} height={40} rx={3} fill={C.streak} stroke={C.frame} strokeWidth={5} />
    <g stroke={C.frame} strokeWidth={3}>{[60, 90, 120, 150, 180].map((x) => <line key={x} x1={x} y1={82} x2={x} y2={118} />)}</g>
    <g stroke={C.accent} strokeWidth={2.5}><line x1={30} y1={140} x2={210} y2={140} /><line x1={30} y1={134} x2={30} y2={146} /><line x1={210} y1={134} x2={210} y2={146} /></g>
  </>),
  installation: () => (<>
    <Sash x={50} y={40} w={140} h={110} />
    <OuterFrame x={44} y={34} w={152} h={122} />
    <g stroke={C.accent} strokeWidth={2} fill={C.accent}>
      <line x1={44} y1={20} x2={196} y2={20} /><polygon points="44,20 52,15 52,25" /><polygon points="196,20 188,15 188,25" />
      <line x1={212} y1={34} x2={212} y2={156} /><polygon points="212,34 207,42 217,42" /><polygon points="212,156 207,148 217,148" />
    </g>
    <rect x={70} y={166} width={100} height={16} rx={3} fill={C.frame} />
    <rect x={110} y={169} width={20} height={10} rx={5} fill={C.glass} />
    <circle cx={120} cy={174} r={3} fill={C.accent} />
  </>),
};

type Props = { type: Illustration; title?: string; className?: string };

/** Square product drawing. Pass `title` for an accessible description, or omit it when decorative. */
export function ProductIllustration({ type, title, className = "" }: Props) {
  const isDoorLike = type.startsWith("door") || type === "alu-door" || type === "partition";
  const vb = isDoorLike ? "0 0 240 210" : "0 0 240 200";
  return (
    <svg viewBox={vb} className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet">
      {title && <title>{title}</title>}
      {drawings[type]()}
    </svg>
  );
}
