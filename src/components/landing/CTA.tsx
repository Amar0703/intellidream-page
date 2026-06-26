import { Icon } from "./Icon";

export function CTA() {
  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[36px] border border-noir bg-noir text-powder px-6 py-16 md:p-20 text-center">
          {/* gradient orbs */}
          <div aria-hidden className="absolute -top-32 -right-20 h-96 w-96 rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(255,200,1,0.55), transparent 70%)" }} />
          <div aria-hidden className="absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full"
               style={{ background: "radial-gradient(closest-side, rgba(255,153,50,0.45), transparent 70%)" }} />
          <div aria-hidden className="absolute inset-0 bg-dot opacity-[0.06]" />

          <div className="relative max-w-2xl mx-auto">
            <p className="eyebrow text-forsythia">Ready when you are</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-powder">
              Automate the boring.{" "}
              <span className="text-forsythia">Compound the brilliant.</span>
            </h2>
            <p className="mt-5 text-powder/75 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Join 4,000+ teams using Mosaic to turn their data into autonomous, compounding leverage.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#signup" className="btn-accent">
                Start building free
                <Icon name="chevron-right" size={14} />
              </a>
              <a href="#demo" className="btn-ghost border-powder/30 text-powder hover:bg-white/10 hover:border-powder">
                Book a demo
              </a>
            </div>
            <p className="mt-5 text-xs font-mono text-powder/50">No credit card · 14-day trial · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
