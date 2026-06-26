const COLS = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "Guides", "API reference", "Status", "Community"] },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/40">
      <div className="container-x py-16 md:py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="grid place-items-center h-9 w-9 rounded-xl bg-noir text-forsythia">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <path d="M8 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
              </svg>
            </span>
            <span className="font-display text-base font-semibold text-noir">
              mosaic<span className="text-saffron">.ai</span>
            </span>
          </div>
          <p className="mt-5 text-sm text-ink-soft max-w-sm leading-relaxed">
            The data automation platform for teams that ship. Built in San Francisco & Bengaluru.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {["X", "GH", "Li", "Yt"].map((s) => (
              <a key={s} href={`#${s}`} aria-label={s}
                 className="grid place-items-center h-9 w-9 rounded-full border border-line bg-white hover:bg-noir hover:text-powder hover:border-noir transition-colors duration-200 text-xs font-mono">
                {s}
              </a>
            ))}
          </div>
        </div>

        {COLS.map((c) => (
          <div key={c.title} className="lg:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-ink-soft hover:text-noir transition-colors duration-150 link-underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <form className="lg:col-span-2" onSubmit={(e) => e.preventDefault()} aria-label="Subscribe to newsletter">
          <label htmlFor="newsletter" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Newsletter</label>
          <div className="mt-4 flex rounded-full border border-line-strong bg-white p-1 focus-within:border-noir transition-colors">
            <input
              id="newsletter"
              type="email"
              placeholder="you@work.com"
              className="bg-transparent flex-1 min-w-0 px-3 py-2 text-sm outline-none placeholder:text-ink-mute"
            />
            <button type="submit" className="rounded-full bg-noir text-powder text-xs font-medium px-3.5 hover:bg-nocturnal transition-colors">
              Join
            </button>
          </div>
          <p className="mt-3 text-xs text-ink-mute">One email per month. No spam, ever.</p>
        </form>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-ink-mute font-mono">
          <p>© {new Date().getFullYear()} Mosaic Labs Inc. All rights reserved.</p>
          <ul className="flex items-center gap-5" role="list">
            <li><a href="#privacy" className="hover:text-noir transition-colors">Privacy</a></li>
            <li><a href="#terms" className="hover:text-noir transition-colors">Terms</a></li>
            <li><a href="#security" className="hover:text-noir transition-colors">Security</a></li>
            <li><a href="#sitemap" className="hover:text-noir transition-colors">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
