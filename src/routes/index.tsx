import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Trusted } from "../components/landing/Trusted";
import { Features, useReveal } from "../components/landing/Features";
import { Pricing } from "../components/landing/Pricing";
import { Testimonials } from "../components/landing/Testimonials";
import { FAQ } from "../components/landing/FAQ";
import { CTA } from "../components/landing/CTA";
import { Footer } from "../components/landing/Footer";

const TITLE = "Mosaic AI — Intelligent Data Automation Platform";
const DESC  =
  "Mosaic is the AI-powered data automation platform for teams that ship. Build reasoning agents, automate workflows, and turn data into compounding revenue.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mosaic AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: DESC,
  offers: { "@type": "Offer", price: "19", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "412" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "theme-color", content: "#F1F6F4" },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Mosaic AI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  // Lazy IntersectionObserver — used by any `.reveal` block on the page.
  useReveal();

  // Smooth-scroll for in-page anchors (respects prefers-reduced-motion via CSS).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!t) return;
      const id = t.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", `#${id}`); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:btn-primary">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Trusted />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
