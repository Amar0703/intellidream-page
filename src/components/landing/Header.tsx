import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[color-mix(in_oklab,white_75%,transparent)] border-b border-line" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2.5 group" aria-label="Mosaic AI home">
          <LogoMark />
          <span className="font-display text-base font-semibold tracking-tight text-noir">
            mosaic<span className="text-saffron">.ai</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 text-sm text-ink-soft hover:text-noir rounded-full transition-colors duration-150 link-underline"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href="#signin" className="btn-ghost">Sign in</a>
          <a href="#cta" className="btn-accent">
            Get started
            <Icon name="chevron-right" size={14} />
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative h-10 w-10 rounded-full border border-line-strong bg-white grid place-items-center"
        >
          <span className={`block h-[2px] w-5 bg-noir transition-transform duration-300 ${open ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-[2px] w-5 bg-noir transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 bg-noir transition-transform duration-300 ${open ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-powder/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
        <nav className="relative container-x pt-6 pb-10 flex flex-col gap-1" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-line text-2xl font-display text-noir"
              style={{ animation: open ? `rise 380ms ${i * 60}ms both` : "none" }}
            >
              {n.label}
              <Icon name="chevron-right" size={20} />
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-8">
            <a href="#signin" className="btn-ghost justify-center" onClick={() => setOpen(false)}>Sign in</a>
            <a href="#cta" className="btn-accent justify-center" onClick={() => setOpen(false)}>Get started</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid place-items-center h-9 w-9 rounded-xl bg-noir text-forsythia transition-transform duration-200 group-hover:rotate-6"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M8 16c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    </span>
  );
}
