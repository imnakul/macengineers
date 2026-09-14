import React from "react";
import { PlateSurface } from "./PlateSurface";

/**
 * Colour treatments for static labels.
 * - `hairline` — white tag with a hairline rim (certifications, stats).
 * - `tint` — pale steel tag with steel text (status / eyebrow pills).
 * - `frost` — near-opaque white for tags sitting on photography.
 * - `steel` — solid accent tag for highlight badges.
 */
export type PlateTagSkin = "hairline" | "tint" | "frost" | "steel";

export type PlateTagSize = "xs" | "sm";

const SKINS: Record<PlateTagSkin, { frame: string; face: string; text: string }> = {
  hairline: { frame: "bg-[#E3E7ED]", face: "bg-white", text: "text-slate-600" },
  tint: { frame: "bg-[#DCE4F0]", face: "bg-[#F2F6FC]", text: "text-[#1B5FC4]" },
  frost: { frame: "bg-white/95", face: "bg-white/95", text: "text-slate-700" },
  steel: { frame: "bg-[#0F3D87]", face: "bg-[#1B5FC4]", text: "text-white" },
};

const SIZES: Record<PlateTagSize, string> = {
  xs: "[--cut:5px] gap-1.5 px-2.5 py-1 text-[10px] tracking-[0.14em]",
  sm: "[--cut:6px] gap-2.5 px-3.5 py-1.5 text-[11px] tracking-[0.18em]",
};

interface PlateTagProps {
  children: React.ReactNode;
  skin?: PlateTagSkin;
  size?: PlateTagSize;
  /** Rendered element. Use `p` when the tag is a standalone line of copy. */
  as?: "span" | "p";
}

/** Small chamfered mono label — the static sibling of `PlateCta`. */
export function PlateTag({
  children,
  skin = "hairline",
  size = "xs",
  as: Tag = "span",
}: PlateTagProps): React.JSX.Element {
  const colours = SKINS[skin];
  return (
    <Tag
      className={`relative isolate inline-flex items-center whitespace-nowrap font-mono font-semibold uppercase ${SIZES[size]} ${colours.text}`}
    >
      <PlateSurface frameClassName={colours.frame} faceClassName={colours.face} />
      {children}
    </Tag>
  );
}
