"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type Item = { slug: string; name: string; group: string; card: ReactNode };
type Group = { id: string; name: string };

/**
 * Filterable profile grid. Every card is in the server-rendered HTML (good for search engines);
 * the filter only hides cards. The URL hash (#frames, #beads …) selects a group on load.
 */
export function ProfileCatalogue({ items, groups, noun = "profiles", allLabel = "All profiles", placeholder = "Search, e.g. 88mm or bead" }: {
  items: Item[]; groups: Group[]; noun?: string; allLabel?: string; placeholder?: string;
}) {
  const [group, setGroup] = useState<string>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1);
      if (groups.some((g) => g.id === h)) setGroup(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [groups]);

  const counts = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, items.filter((i) => i.group === g.id).length])), [groups, items]);
  const needle = q.trim().toLowerCase();
  const visible = items.filter((i) => (group === "all" || i.group === group) && (!needle || i.name.toLowerCase().includes(needle)));

  const choose = (id: string) => {
    setGroup(id);
    try { history.replaceState(null, "", id === "all" ? location.pathname : `#${id}`); } catch { /* ignore */ }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={`Filter ${noun}`} className="flex flex-wrap gap-2">
          {[{ id: "all", name: allLabel }, ...groups].map((g) => (
            <button key={g.id} type="button" aria-pressed={group === g.id} onClick={() => choose(g.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${group === g.id ? "border-primary bg-primary text-white" : "border-line bg-bg text-body hover:border-primary hover:text-primary"}`}>
              {g.name} <span className="tabular-nums opacity-70">({g.id === "all" ? items.length : counts[g.id]})</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search {noun}</span>
          <Search aria-hidden size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
            className="w-full rounded-full border border-line-strong bg-bg py-2.5 pl-10 pr-4 text-sm text-heading placeholder:text-muted focus:border-primary focus:outline-none" />
        </label>
      </div>
      <p aria-live="polite" className="nx-caption mb-4">Showing {visible.length} of {items.length} {noun}</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <li key={i.slug} hidden={!visible.includes(i)} className="grid">{i.card}</li>
        ))}
      </ul>
      {visible.length === 0 && <p className="py-10 text-center">No {noun} match. Try another word or choose {allLabel}.</p>}
    </div>
  );
}
