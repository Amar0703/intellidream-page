import { useEffect, useState } from "react";
import { FEATURES, Ornament, toneClasses, useIsMobile, type FeatureDef } from "./features-data";
import { Icon } from "./Icon";

/**
 * MANDATORY FEATURE 2.
 *  - Desktop (≥ lg) renders an asymmetric Bento grid.
 *  - Mobile (< lg) renders a from-scratch CSS-only accordion.
 *  - Active index is shared across breakpoints so that hovering a Bento
 *    card on desktop pre-opens the matching accordion panel on mobile,
 *    and vice-versa.
 */
export function Features() {
  const isMobile = useIsMobile(1024);
  // Active index is preserved across resize.
  const [activeIdx, setActiveIdx] = useState<number>(1);

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What you can build"
          title="One platform. Six superpowers."
          intro="Every Mosaic capability is composable — wire them together to ship the workflow your business has been waiting for."
        />

        {isMobile ? (
          <Accordion items={FEATURES} active={activeIdx} onChange={setActiveIdx} />
        ) : (
          <Bento items={FEATURES} active={activeIdx} onHover={setActiveIdx} />
        )}
      </div>
    </section>
  );
}

/* ----------- Bento (desktop) -------------------------------------------- */

const SPANS = [
  "lg:col-span-5 lg:row-span-2",            // Automation — tall left
  "lg:col-span-7 lg:row-span-1",            // Analytics — wide top right
  "lg:col-span-3 lg:row-span-1",            // Builder
  "lg:col-span-4 lg:row-span-1",            // Integrations
  "lg:col-span-7 lg:row-span-1",            // Security — wide
  "lg:col-span-5 lg:row-span-1",            // Assistant
];

function Bento({ items, active, onHover }: {
  items: FeatureDef[]; active: number; onHover: (i: number) => void;
}) {
  return (
    <div className="mt-14 grid lg:grid-cols-12 lg:auto-rows-[220px] gap-4">
      {items.map((f, i) => (
        <article
          key={f.id}
          onMouseEnter={() => onHover(i)}
          onFocus={() => onHover(i)}
          tabIndex={0}
          aria-label={f.title}
          className={[
            "group relative overflow-hidden rounded-3xl border border-line p-6 transition-all duration-300 cursor-default",
            "hover:-translate-y-1 hover:shadow-lift focus-visible:-translate-y-1",
            toneClasses(f.tone),
            SPANS[i],
            active === i ? "ring-1 ring-noir/15 shadow-lift" : "",
          ].join(" ")}
        >
          <div className="flex items-start justify-between">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-noir/8 group-hover:scale-110 transition-transform duration-200">
              <Icon name={f.icon} size={18} />
            </span>
            <span className="font-mono text-[10px] opacity-60 tracking-wider">0{i + 1}</span>
          </div>
          <h3 className="mt-5 font-display text-xl tracking-tight">{f.title}</h3>
          <p className="mt-2 text-sm opacity-80 max-w-md leading-relaxed">{f.body}</p>

          <div className="mt-5 opacity-90 transition-transform duration-300 group-hover:translate-y-[-2px]">
            <Ornament kind={f.ornament} tone={f.tone} />
          </div>

          {/* Subtle inner glow on hover */}
          <span aria-hidden className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,200,1,.3)" }} />
        </article>
      ))}
    </div>
  );
}

/* ----------- Accordion (mobile, CSS-only animation) --------------------- */

function Accordion({ items, active, onChange }: {
  items: FeatureDef[]; active: number; onChange: (i: number) => void;
}) {
  return (
    <ul className="mt-10 surface-card overflow-hidden divide-y divide-line" role="list">
      {items.map((f, i) => {
        const open = i === active;
        return (
          <li key={f.id}>
            <button
              aria-expanded={open}
              aria-controls={`acc-${f.id}`}
              onClick={() => onChange(open ? -1 : i)}
              className="w-full flex items-center gap-4 text-left px-5 py-5"
            >
              <span className={`grid place-items-center h-10 w-10 rounded-xl ${open ? "bg-forsythia text-noir" : "bg-mint text-noir"} transition-colors duration-200 shrink-0`}>
                <Icon name={f.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-display text-base text-noir block">{f.title}</span>
              </span>
              <Icon
                name="chevron-down"
                size={18}
                className={`text-ink-soft transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div id={`acc-${f.id}`} className="acc-panel" data-open={open} role="region" aria-label={f.title}>
              <div>
                <div className="px-5 pb-6 -mt-1">
                  <p className="text-sm text-ink-soft leading-relaxed">{f.body}</p>
                  <div className={`mt-5 p-5 rounded-2xl ${toneClasses(f.tone)}`}>
                    <Ornament kind={f.ornament} tone={f.tone} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ----------- Shared heading -------------------------------------------- */

export function SectionHeading({
  eyebrow, title, intro,
}: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.05] tracking-tight">{title}</h2>
      {intro && <p className="mt-4 text-base md:text-lg text-ink-soft leading-relaxed">{intro}</p>}
    </div>
  );
}

/* Tiny effect util: lazy mount IntersectionObserver for `.reveal` blocks. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("reveal-in")),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}
