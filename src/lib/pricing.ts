/**
 * Pricing matrix — single source of truth.
 * Final prices are *always* computed via {@link computePrice}; never hard-coded
 * in components. To change a price, edit the matrix.
 */

export type Currency = "INR" | "USD" | "EUR";
export type Billing = "monthly" | "yearly";
export type PlanId = "starter" | "pro" | "enterprise";

export interface PlanDef {
  id: PlanId;
  name: string;
  tagline: string;
  /** Base price expressed in USD (canonical unit). */
  basePrice: number;
  /** Demand multiplier — lets ops bump a plan without touching tariffs. */
  multiplier: number;
  features: string[];
  highlight?: boolean;
  cta: string;
}

export const pricingMatrix = {
  /** USD → currency tariff conversion. Updated centrally. */
  tariff: {
    USD: 1,
    EUR: 0.92,
    INR: 83.2,
  } as Record<Currency, number>,

  /** Symbol per currency. */
  symbol: {
    USD: "$",
    EUR: "€",
    INR: "₹",
  } as Record<Currency, string>,

  /** Yearly billing applies a 20% discount on the equivalent monthly cost. */
  yearlyDiscount: 0.2,

  plans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "For solo builders shipping their first automation.",
      basePrice: 19,
      multiplier: 1,
      features: [
        "5 active workflows",
        "10k task runs / month",
        "Standard AI models",
        "Community support",
      ],
      cta: "Start free",
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For growing teams scaling intelligent operations.",
      basePrice: 79,
      multiplier: 1,
      features: [
        "Unlimited workflows",
        "250k task runs / month",
        "Advanced reasoning models",
        "Real-time analytics",
        "Priority support",
      ],
      highlight: true,
      cta: "Start 14-day trial",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tagline: "For organisations with custom compliance & scale.",
      basePrice: 249,
      multiplier: 1.2,
      features: [
        "Unlimited everything",
        "Dedicated AI infrastructure",
        "SOC 2 + HIPAA + SSO",
        "Custom integrations",
        "24/7 white-glove support",
      ],
      cta: "Contact sales",
    },
  ] satisfies PlanDef[],
};

export interface PriceParts {
  symbol: string;
  amount: string;
  period: string;
  rawMonthly: number;
  saved?: number;
}

/** Pure pricing calculator — memoizable, no side-effects. */
export function computePrice(
  plan: PlanDef,
  currency: Currency,
  billing: Billing,
): PriceParts {
  const tariff = pricingMatrix.tariff[currency];
  const symbol = pricingMatrix.symbol[currency];
  const monthlyUSD = plan.basePrice * plan.multiplier;
  const monthlyLocal = monthlyUSD * tariff;

  if (billing === "monthly") {
    return {
      symbol,
      amount: format(monthlyLocal, currency),
      period: "/mo",
      rawMonthly: monthlyLocal,
    };
  }

  const discounted = monthlyLocal * (1 - pricingMatrix.yearlyDiscount);
  const yearlyTotal = discounted * 12;
  return {
    symbol,
    amount: format(discounted, currency),
    period: "/mo, billed yearly",
    rawMonthly: discounted,
    saved: monthlyLocal * 12 - yearlyTotal,
  };
}

function format(n: number, currency: Currency): string {
  // INR feels natural without decimals; USD/EUR rounded for headline display.
  if (currency === "INR") return Math.round(n).toLocaleString("en-IN");
  return Math.round(n).toLocaleString("en-US");
}
