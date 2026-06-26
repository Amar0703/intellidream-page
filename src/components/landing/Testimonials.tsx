import { SectionHeading } from "./Features";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  tone: "yellow" | "mint" | "noir" | "saffron";
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "Mosaic replaced four internal tools and shipped our forecast engine in a week.", name: "Sasha Lin",    role: "VP Ops",            company: "Northwind",  rating: 5, initials: "SL", tone: "yellow" },
  { quote: "Our analysts ask data questions in English and get charts in seconds. It's wild.", name: "Marcus Avery", role: "Head of Data",      company: "Brightline", rating: 5, initials: "MA", tone: "mint" },
  { quote: "The reasoning agent caught an invoice fraud pattern we missed for 3 quarters.",   name: "Priya Rao",    role: "CFO",               company: "Helio Labs", rating: 5, initials: "PR", tone: "noir" },
  { quote: "We retired 6,000 lines of glue code on day one. Onboarding was effortless.",      name: "Jonas Weber",  role: "Staff Engineer",    company: "Cascade",    rating: 5, initials: "JW", tone: "saffron" },
  { quote: "From signup to a live workflow in 22 minutes. Best DX we've seen all year.",      name: "Elena Cruz",   role: "CTO",               company: "Atlas Pay",  rating: 5, initials: "EC", tone: "yellow" },
  { quote: "Security review was a non-event. SOC 2, SSO, audit logs — all there from day one.", name: "Theo Nakamura", role: "Security Lead",  company: "Orbital",    rating: 5, initials: "TN", tone: "mint" },
];

const TONE: Record<Testimonial["tone"], string> = {
  yellow:  "bg-forsythia text-noir",
  mint:    "bg-mint text-noir",
  noir:    "bg-noir text-powder",
  saffron: "bg-saffron text-noir",
};

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Loved by operators"
          title="Teams that ship faster, with Mosaic."
          intro="Real quotes from real customers running real revenue on Mosaic. (Pause the marquee — your favourite quote is in there.)"
        />
      </div>

      <div className="mt-12 marquee-mask marquee-pause overflow-hidden">
        <div className="marquee-track gap-5 px-5">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={i} t={t} aria-hidden={i >= TESTIMONIALS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, ...rest }: { t: Testimonial; "aria-hidden"?: boolean }) {
  return (
    <figure
      {...rest}
      className={`w-[320px] sm:w-[380px] shrink-0 rounded-3xl border border-line p-6 transition-transform duration-200 hover:-translate-y-1 ${TONE[t.tone]}`}
    >
      <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i < t.rating ? "" : "opacity-25"}`} fill="currentColor" aria-hidden>
            <path d="M10 1.5l2.6 5.6 6 .7-4.5 4.1 1.2 6L10 14.9 4.7 18l1.2-6L1.4 7.8l6-.7L10 1.5z" />
          </svg>
        ))}
      </div>
      <blockquote className="mt-4 font-display text-lg leading-snug">"{t.quote}"</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className={`grid place-items-center h-10 w-10 rounded-full font-mono text-sm font-semibold ${t.tone === "noir" ? "bg-forsythia text-noir" : "bg-noir text-powder"}`}>
          {t.initials}
        </span>
        <div className="text-sm">
          <p className="font-medium">{t.name}</p>
          <p className="opacity-70">{t.role} · {t.company}</p>
        </div>
      </figcaption>
    </figure>
  );
}
