import { Icon } from "./Icon";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient backdrop */}
      <div aria-hidden className="absolute inset-0 hero-aura" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_55%_at_50%_30%,black,transparent)]" />

      <div className="container-x relative pt-12 pb-20 md:pt-20 md:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-7 max-w-2xl">
          <span className="anim-rise inline-flex items-center gap-2 rounded-full border border-line bg-white/70 backdrop-blur px-3 py-1.5 text-xs">
            <span className="relative grid place-items-center h-2 w-2">
              <span className="h-2 w-2 rounded-full bg-saffron anim-pulse-ring" />
            </span>
            <span className="font-mono text-ink-soft tracking-wide">v4.0 — Reasoning Engine is live</span>
          </span>

          <h1
            className="anim-rise mt-6 text-[clamp(2.4rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-noir"
            style={{ animationDelay: "60ms" }}
          >
            Power your business with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">intelligent</span>
              <span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 bg-forsythia/70 -z-0 rounded-sm" />
            </span>{" "}
            AI automation.
          </h1>

          <p
            className="anim-rise mt-6 text-lg text-ink-soft max-w-xl leading-relaxed"
            style={{ animationDelay: "140ms" }}
          >
            Mosaic is the data automation platform for teams that ship. Connect any source, let reasoning agents
            run the work, and watch revenue compound — without writing a single cron job.
          </p>

          <div
            className="anim-rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "220ms" }}
          >
            <a href="#cta" className="btn-accent">
              Start building free
              <Icon name="chevron-right" size={14} />
            </a>
            <a href="#features" className="btn-ghost">
              <span className="grid place-items-center h-5 w-5 rounded-full bg-noir text-powder">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>
              </span>
              Watch the demo
            </a>
          </div>

          <dl
            className="anim-rise mt-10 grid grid-cols-3 gap-4 max-w-md"
            style={{ animationDelay: "300ms" }}
          >
            {[
              ["10×", "faster ops"],
              ["99.99%", "uptime SLA"],
              ["4.9★", "G2 rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl text-noir">{n}</dt>
                <dd className="text-xs text-ink-mute mt-1">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Dashboard mockup */}
        <div className="lg:col-span-5 relative">
          <DashboardMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trusted"
        aria-label="Scroll to logos"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-mute hover:text-noir transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <span className="h-8 w-px bg-noir/40 relative overflow-hidden">
          <span className="absolute inset-x-0 h-3 bg-noir animate-[rise_1.6s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="relative">
      {/* Floating cards */}
      <FloatCard className="absolute -left-4 -top-6 z-20 anim-float" style={{ animationDelay: "0s" }}>
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-forsythia text-noir">
            <Icon name="arrow-trending-up" size={18} />
          </span>
          <div>
            <p className="text-[11px] font-mono text-ink-mute uppercase tracking-wider">Revenue</p>
            <p className="font-display text-base text-noir">+38.2%</p>
          </div>
        </div>
      </FloatCard>

      <FloatCard className="absolute -right-2 top-1/3 z-20 anim-float" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-nocturnal text-forsythia">
            <Icon name="cog" size={18} />
          </span>
          <div>
            <p className="text-[11px] font-mono text-ink-mute uppercase tracking-wider">Agents</p>
            <p className="font-display text-base text-noir">24 running</p>
          </div>
        </div>
      </FloatCard>

      <FloatCard className="absolute -right-6 -bottom-6 z-20 anim-float" style={{ animationDelay: "3s" }}>
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-saffron text-noir">
            <Icon name="arrow-path" size={18} />
          </span>
          <div>
            <p className="text-[11px] font-mono text-ink-mute uppercase tracking-wider">Synced</p>
            <p className="font-display text-base text-noir">2 min ago</p>
          </div>
        </div>
      </FloatCard>

      {/* Main panel */}
      <div className="relative rounded-3xl border border-line bg-noir text-powder shadow-lift overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <p className="font-mono text-[11px] text-powder/60">mosaic / workspace</p>
          <Icon name="search" size={14} className="text-powder/60" />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-powder/50">Pipeline</p>
              <p className="font-display text-xl mt-1">Q4 Revenue Engine</p>
            </div>
            <span className="rounded-full bg-forsythia/15 text-forsythia border border-forsythia/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider">
              Live
            </span>
          </div>

          {/* Chart */}
          <div className="mt-6 grid grid-cols-12 gap-1.5 items-end h-32">
            {[40, 55, 38, 60, 72, 48, 80, 64, 88, 70, 95, 82].map((h, i) => (
              <div key={i} className="relative">
                <div
                  className="rounded-md origin-bottom"
                  style={{
                    height: `${h}%`,
                    background: i % 3 === 0
                      ? "linear-gradient(180deg, #FFC801, #FF9932)"
                      : "rgba(255,255,255,0.12)",
                    animation: `bar-grow 700ms ${i * 60}ms cubic-bezier(0.2,0.7,0.2,1) both`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="mt-6 space-y-2">
            {[
              ["Lead scoring agent", "running"],
              ["Invoice reconciler", "queued"],
              ["Churn forecast", "complete"],
            ].map(([label, status], i) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/5 px-3 py-2.5"
                style={{ animation: `rise 500ms ${300 + i * 80}ms both` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center h-7 w-7 rounded-lg bg-white/10">
                    <Icon name="cube" size={14} className="text-powder" />
                  </span>
                  <span className="text-sm truncate">{label}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-powder/60">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatCard({
  children, className = "", style,
}: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white/90 backdrop-blur px-3.5 py-2.5 shadow-lift ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
