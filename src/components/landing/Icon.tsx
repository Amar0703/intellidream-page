import { memo } from "react";

export type IconName =
  | "chart-pie"
  | "cog"
  | "cube"
  | "link"
  | "link-solid"
  | "search"
  | "arrow-path"
  | "arrow-trending-up"
  | "chevron-up"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up-solid"
  | "x-mark";

const FILE_MAP: Record<IconName, string> = {
  "chart-pie": "/icons/chart-pie.svg",
  cog: "/icons/cog-8-tooth.svg",
  cube: "/icons/cube-16-solid.svg",
  link: "/icons/link.svg",
  "link-solid": "/icons/link-solid.svg",
  search: "/icons/search.svg",
  "arrow-path": "/icons/arrow-path.svg",
  "arrow-trending-up": "/icons/arrow-trending-up.svg",
  "chevron-up": "/icons/chevron-up.svg",
  "chevron-down": "/icons/chevron-down.svg",
  "chevron-left": "/icons/chevron-left.svg",
  "chevron-right": "/icons/chevron-right.svg",
  "chevron-up-solid": "/icons/chevron-up-solid.svg",
  "x-mark": "/icons/x-mark.svg",
};

interface Props {
  name: IconName;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
  alt?: string;
}

/** Uses CSS `mask-image` so the SVG inherits `currentColor`. */
function IconImpl({ name, className = "", size = 20, alt = "" }: Props) {
  const src = FILE_MAP[name];
  return (
    <span
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      className={`inline-block shrink-0 align-middle ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export const Icon = memo(IconImpl);
