import { Bug, CloudRain, Flame, Sparkles, Thermometer, Volume2, type LucideIcon } from "lucide-react";

/** General properties of UPVC as a material (shown on Home and About). No brand or test figures. */
export const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: CloudRain, title: "Weather proof", text: "Sealed frames with gaskets help keep out rain, wind and dust." },
  { icon: Bug, title: "No rot or termites", text: "UPVC does not rot, rust or attract termites the way wood and steel can." },
  { icon: Sparkles, title: "Low maintenance", text: "No painting or polishing. A wipe with water keeps frames clean." },
  { icon: Thermometer, title: "Thermal insulation", text: "UPVC is a poor conductor of heat, helping rooms stay cooler." },
  { icon: Volume2, title: "Acoustic insulation", text: "Well-sealed windows reduce noise from traffic and the street." },
  { icon: Flame, title: "Self-extinguishing", text: "Rigid UPVC does not keep burning once a flame is taken away." },
];
