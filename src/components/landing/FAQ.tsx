import { useId, useState } from "react";
import { SectionHeading } from "./Features";
import { Icon } from "./Icon";

const FAQS = [
  { q: "How long does it take to ship our first automation?",
    a: "Most teams have a live workflow in under an hour. Mosaic ships with templates for the most common ops, finance and growth use-cases — pick one, swap in your data, deploy." },
  { q: "Which AI models power Mosaic?",
    a: "We route to best-in-class frontier and open-weight models per task. You can pin a specific provider on Enterprise plans, or bring your own keys." },
  { q: "Is my data used to train models?",
    a: "Never. Mosaic is zero-retention by default. We're SOC 2 Type II, HIPAA-ready, and offer EU-only data residency on Pro and above." },
  { q: "Can I self-host?",
    a: "Enterprise customers can deploy Mosaic into their own VPC on AWS, GCP or Azure with the same UX as the managed cloud." },
  { q: "Do you offer a free trial?",
    a: "Yes — every paid plan includes 14 days of full access, no credit card required. Starter is free forever for solo builders." },
  { q: "What happens if I outgrow my plan?",
    a: "You'll get an alert at 80% of any limit and a one-click upgrade. We never rate-limit you mid-run — your workflows always finish." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="py-24 md:py-32 bg-white/40 border-y border-line">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Common questions"
            title="Answers, before you ask."
          />
          <p className="mt-6 text-ink-soft">
            Still curious? <a href="#cta" className="link-underline text-noir font-medium">Talk to a human →</a>
          </p>
        </div>

        <ul className="lg:col-span-7 surface-card divide-y divide-line" role="list">
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              {...f}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              onArrow={(dir) => setOpenIdx(((i + dir + FAQS.length) % FAQS.length))}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQItem({
  q, a, open, onToggle, onArrow,
}: {
  q: string; a: string; open: boolean;
  onToggle: () => void;
  onArrow: (dir: 1 | -1) => void;
}) {
  const id = useRef(`faq-${Math.random().toString(36).slice(2)}`).current;
  return (
    <li>
      <button
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); onArrow(1); }
          if (e.key === "ArrowUp")   { e.preventDefault(); onArrow(-1); }
        }}
        className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5"
      >
        <span className="font-display text-base md:text-lg text-noir">{q}</span>
        <span className={`grid place-items-center h-8 w-8 rounded-full bg-mint text-noir transition-transform duration-300 shrink-0 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>
      <div id={id} role="region" aria-labelledby={`${id}-btn`} className="acc-panel" data-open={open}>
        <div>
          <p className="px-5 md:px-7 pb-6 -mt-1 text-ink-soft leading-relaxed">{a}</p>
        </div>
      </div>
    </li>
  );
}
