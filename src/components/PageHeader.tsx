import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Inner-page header: breadcrumb trail, eyebrow, the page's single H1 and a lead paragraph. */
export function PageHeader({ crumbs, eyebrow, title, lead, aside }: {
  crumbs: Crumb[]; eyebrow?: string; title: string; lead?: ReactNode; aside?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-bg-alt">
      <div className="nx-container py-8 md:py-12">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-8 grid items-center gap-8 ${aside ? "md:grid-cols-[1.4fr_1fr]" : ""}`}>
          <div className="min-w-0">
            {eyebrow && <p className="nx-eyebrow mb-3">{eyebrow}</p>}
            <h1 className="font-display text-[clamp(2rem,4.4vw,3.1rem)] font-extrabold leading-[1.08] [font-stretch:108%]">{title}</h1>
            {lead && <div className="nx-lead mt-4">{lead}</div>}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
