const LOGOS = ["Vercel", "Linear", "Notion", "Stripe", "Loom", "Ramp", "Rippling", "Mercury", "Brex"];

export function Trusted() {
  return (
    <section id="trusted" aria-label="Trusted by leading teams" className="py-12 md:py-16 border-y border-line bg-white/40">
      <div className="container-x">
        <p className="text-center eyebrow mb-8">Trusted by 4,000+ teams worldwide</p>
        <div className="marquee-mask marquee-pause overflow-hidden">
          <div className="marquee-track gap-14 items-center">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span
                key={i}
                className="font-display text-xl md:text-2xl text-ink-soft/70 hover:text-noir transition-colors duration-200 whitespace-nowrap select-none tracking-tight"
                aria-hidden={i >= LOGOS.length}
              >
                {l.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
