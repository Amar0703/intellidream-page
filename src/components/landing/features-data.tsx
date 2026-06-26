import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";

export interface FeatureDef {
  id: string;
  title: string;
  body: string;
  icon: IconName;
  /** Decorative ornament rendered inside the Bento card. */
  ornament: "chart" | "agents" | "flow" | "stack" | "shield" | "chat";
  tone: "cream" | "noir" | "saffron" | "mint" | "yellow" | "ink";
}

export const FEATURES: FeatureDef[] = [
  { id: "automation", title: "Automation",         icon: "arrow-path",        ornament: "flow",
    tone: "cream",
    body: "Trigger any workflow from any signal — events, schedules, webhooks or AI judgement calls." },
  { id: "analytics",  title: "AI Analytics",       icon: "chart-pie",         ornament: "chart",
    tone: "noir",
    body: "Reasoning models surface anomalies, drivers and recommendations before you ask the question." },
  { id: "builder",    title: "Workflow Builder",   icon: "cube",              ornament: "agents",
    tone: "yellow",
    body: "Compose multi-step agents visually. Branch, loop, retry — all with type-safe outputs." },
  { id: "integrations", title: "Integrations",     icon: "link",              ornament: "stack",
    tone: "mint",
    body: "300+ native connectors plus a universal REST + GraphQL bridge for your internal stack." },
  { id: "security",   title: "Enterprise Security", icon: "cog",              ornament: "shield",
    tone: "ink",
    body: "SOC 2 Type II, HIPAA, SSO, audit trails, EU residency. Your data never trains a model." },
  { id: "assistant",  title: "24/7 AI Assistant",  icon: "search",            ornament: "chat",
    tone: "saffron",
    body: "Ask Mosaic anything about your data. Get answers, charts and runnable actions in seconds." },
];

/** Returns true when viewport is below `bp` px. SSR-safe. */
export function useIsMobile(bp = 1024) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [bp]);
  return m;
}

export function Ornament({ kind, tone }: { kind: FeatureDef["ornament"]; tone: FeatureDef["tone"] }) {
  // Color helpers — inherits via CSS variables on the card.
  const bar = tone === "noir" || tone === "ink" ? "bg-forsythia" : "bg-noir";
  const dim = tone === "noir" || tone === "ink" ? "bg-white/12" : "bg-noir/8";

  switch (kind) {
    case "chart":
      return (
        <div className="flex items-end gap-1.5 h-24">
          {[50, 70, 45, 80, 62, 90, 75, 95].map((h, i) => (
            <span
              key={i}
              className={`w-3 rounded-sm origin-bottom ${i === 5 || i === 7 ? bar : dim}`}
              style={{ height: `${h}%`, animation: `bar-grow 700ms ${i * 80}ms ease-out both` }}
            />
          ))}
        </div>
      );
    case "agents":
      return (
        <div className="grid grid-cols-3 gap-2 max-w-[220px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-lg ${i === 4 ? "bg-noir text-forsythia" : "bg-noir/8"} grid place-items-center transition-transform duration-300`}
              style={{ animation: `fadeIn 500ms ${i * 50}ms both` }}
            >
              {i === 4 && <Icon name="cube" size={14} />}
            </span>
          ))}
        </div>
      );
    case "flow":
      return (
        <svg viewBox="0 0 220 80" className="w-full max-w-[260px] h-20">
          <defs>
            <marker id="d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          {[20, 80, 140, 200].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={40} r={10} fill={i === 1 ? "#FFC801" : "currentColor"} className={i === 1 ? "" : "opacity-15"} />
              {i < 3 && <line x1={x + 12} y1={40} x2={x + 48} y2={40} stroke="currentColor" strokeOpacity="0.4" strokeDasharray="3 3" markerEnd="url(#d)" />}
            </g>
          ))}
        </svg>
      );
    case "stack":
      return (
        <div className="flex flex-wrap gap-2 max-w-[260px]">
          {["pg", "S3", "GH", "API", "GQL", "AI", "Slack", "Stripe"].map((t, i) => (
            <span
              key={t}
              className="rounded-lg border border-current/15 bg-current/5 px-2.5 py-1.5 text-[11px] font-mono"
              style={{ animation: `rise 500ms ${i * 60}ms both` }}
            >
              {t}
            </span>
          ))}
        </div>
      );
    case "shield":
      return (
        <svg viewBox="0 0 80 90" className="h-24">
          <path d="M40 5 L72 18 V46 C72 66 56 80 40 85 C24 80 8 66 8 46 V18 Z"
                fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
          <path d="M40 18 L60 26 V46 C60 60 50 70 40 73 C30 70 20 60 20 46 V26 Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M28 46 L37 55 L54 38" fill="none" stroke="#FFC801" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <div className="space-y-2 max-w-[260px]">
          <div className="rounded-2xl rounded-bl-sm bg-noir/8 px-3 py-2 text-xs max-w-[80%]">Forecast Q4 churn risk</div>
          <div className="rounded-2xl rounded-br-sm bg-noir text-powder px-3 py-2 text-xs max-w-[88%] ml-auto">
            12 accounts at risk — running save-flow now.
          </div>
        </div>
      );
  }
}

/** Tailwind-ready palette per tone. */
export function toneClasses(tone: FeatureDef["tone"]) {
  switch (tone) {
    case "cream":   return "bg-white text-noir";
    case "yellow":  return "bg-forsythia text-noir";
    case "saffron": return "bg-saffron text-noir";
    case "mint":    return "bg-mint text-noir";
    case "noir":    return "bg-noir text-powder";
    case "ink":     return "bg-nocturnal text-powder";
  }
}
