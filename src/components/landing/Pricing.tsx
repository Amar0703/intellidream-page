import { memo, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { SectionHeading } from "./Features";
import {
  computePrice,
  pricingMatrix,
  type Billing,
  type Currency,
  type PlanDef,
} from "../../lib/pricing";

/**
 * Pricing — Mandatory Feature 1.
 * State is *isolated* per concern (currency, billing) and cards consume only
 * the slices they need. Each `PriceTag` memoizes its computation so changing
 * the currency does NOT rerender the whole section tree, only the tag.
 */
export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-white/40 border-y border-line">
      <div className="container-x">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple pricing. Serious leverage."
            intro="Start free, scale as you ship. Switch currency or billing anytime — your seats and runs come with you."
          />
          <Controls
            currency={currency}
            billing={billing}
            onCurrency={setCurrency}
            onBilling={setBilling}
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pricingMatrix.plans.map((p) => (
            <PlanCard key={p.id} plan={p} currency={currency} billing={billing} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-ink-mute font-mono">
          Prices computed live · USD canonical · tariffs auto-applied · 20% off annual
        </p>
      </div>
    </section>
  );
}

/* ----------- Controls (currency + billing) ----------------------------- */

function ControlsImpl({
  currency, billing, onCurrency, onBilling,
}: {
  currency: Currency; billing: Billing;
  onCurrency: (c: Currency) => void; onBilling: (b: Billing) => void;
}) {
  const currencies: Currency[] = ["INR", "USD", "EUR"];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="toggle-pill" role="radiogroup" aria-label="Currency">
        {currencies.map((c) => (
          <button
            key={c}
            role="radio"
            aria-pressed={currency === c}
            aria-checked={currency === c}
            onClick={() => onCurrency(c)}
          >
            {pricingMatrix.symbol[c]} {c}
          </button>
        ))}
      </div>
      <div className="toggle-pill" role="radiogroup" aria-label="Billing period">
        <button
          role="radio"
          aria-pressed={billing === "monthly"}
          aria-checked={billing === "monthly"}
          onClick={() => onBilling("monthly")}
        >
          Monthly
        </button>
        <button
          role="radio"
          aria-pressed={billing === "yearly"}
          aria-checked={billing === "yearly"}
          onClick={() => onBilling("yearly")}
        >
          Yearly
          <span className="ml-1.5 rounded-full bg-forsythia text-noir px-1.5 py-0.5 text-[10px] font-mono">
            −20%
          </span>
        </button>
      </div>
    </div>
  );
}
const Controls = memo(ControlsImpl);

/* ----------- Plan card ------------------------------------------------- */

interface PlanCardProps {
  plan: PlanDef;
  currency: Currency;
  billing: Billing;
}
function PlanCardImpl({ plan, currency, billing }: PlanCardProps) {
  const highlighted = plan.highlight;
  return (
    <article
      className={[
        "relative rounded-3xl p-7 transition-all duration-300 group",
        highlighted
          ? "bg-noir text-powder border border-noir shadow-lift"
          : "surface-card hover:-translate-y-1 hover:shadow-lift",
      ].join(" ")}
      aria-label={`${plan.name} plan`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-forsythia text-noir px-3 py-1 text-[11px] font-mono uppercase tracking-wider shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-noir" />
          Most popular
        </span>
      )}
      <div className="flex items-center justify-between">
        <h3 className={`font-display text-xl ${highlighted ? "text-powder" : "text-noir"}`}>{plan.name}</h3>
        <Icon
          name={plan.id === "enterprise" ? "cog" : plan.id === "pro" ? "arrow-trending-up" : "cube"}
          size={18}
          className={highlighted ? "text-forsythia" : "text-ink-soft"}
        />
      </div>
      <p className={`mt-2 text-sm ${highlighted ? "text-powder/70" : "text-ink-mute"}`}>{plan.tagline}</p>

      <div className="mt-6 min-h-[88px]">
        <PriceTag plan={plan} currency={currency} billing={billing} highlighted={!!highlighted} />
      </div>

      <a
        href="#cta"
        className={`mt-6 w-full justify-center ${highlighted ? "btn-accent" : "btn-primary"}`}
      >
        {plan.cta}
        <Icon name="chevron-right" size={14} />
      </a>

      <ul className={`mt-7 space-y-3 text-sm ${highlighted ? "text-powder/90" : "text-ink-soft"}`} role="list">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className={`mt-0.5 grid place-items-center h-5 w-5 rounded-full shrink-0 ${highlighted ? "bg-forsythia text-noir" : "bg-mint text-noir"}`}>
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6.5 L5 9.5 L10 3.5" />
              </svg>
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
/** Memoized — re-renders only when its own props change. */
const PlanCard = memo(PlanCardImpl);

/* ----------- Price tag (only this updates on currency change) ---------- */

interface PriceTagProps {
  plan: PlanDef;
  currency: Currency;
  billing: Billing;
  highlighted: boolean;
}
function PriceTagImpl({ plan, currency, billing, highlighted }: PriceTagProps) {
  // Pure compute — memoized per (plan, currency, billing) triple.
  const price = useMemo(
    () => computePrice(plan, currency, billing),
    [plan, currency, billing],
  );

  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`font-display ${highlighted ? "text-forsythia" : "text-ink-soft"} text-2xl`}>
        {price.symbol}
      </span>
      <span
        className={`font-display text-5xl tracking-tight tabular-nums ${highlighted ? "text-powder" : "text-noir"}`}
        // The key forces an enter animation when the displayed number changes,
        // but does NOT bubble up — the rest of the card is untouched.
        key={`${currency}-${billing}`}
        style={{ animation: "rise 280ms ease-out both" }}
      >
        {price.amount}
      </span>
      <span className={`ml-1 text-sm ${highlighted ? "text-powder/60" : "text-ink-mute"}`}>{price.period}</span>
    </div>
  );
}
const PriceTag = memo(PriceTagImpl);
