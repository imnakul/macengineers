import React from "react";
import { AtlasFooter } from "./AtlasFooter";
import { AtlasHeader } from "./AtlasHeader";

/**
 * Token overrides that re-skin the pre-Atlas components still used inside Atlas pages
 * (forms, job list, About sections). Tailwind v4 compiles theme colours, radii and
 * shadows to CSS variables, so redefining them on this wrapper turns the legacy orange
 * accent into steel blue and the soft 12px cards into Atlas's squarer hairline cards,
 * without touching those components' logic.
 */
const ATLAS_THEME_TOKENS = [
  "[--color-canvas:#ffffff]",
  "[--color-surface:#f8f8f5]",
  "[--color-surface-2:#eef1f4]",
  "[--color-inverse:#0d1b2e]",
  "[--color-inverse-deep:#0a1424]",
  "[--color-ink:#334155]",
  "[--color-ink-strong:#0d1b2e]",
  "[--color-ink-muted:#5b6778]",
  "[--color-cta:#1b5fc4]",
  "[--color-hairline:rgba(13,27,46,0.08)]",
  "[--color-hairline-strong:rgba(13,27,46,0.14)]",
  "[--color-grid:rgba(13,27,46,0.05)]",
  "[--color-accent:#1b5fc4]",
  "[--color-accent-bright:#7fa8ec]",
  "[--color-accent-wash:rgba(27,95,196,0.08)]",
  "[--radius-btn:4px]",
  "[--radius-block:6px]",
  "[--radius-card:6px]",
  "[--radius-chip:4px]",
  "[--radius-shell:8px]",
  "[--shadow-ring:0_0_0_1px_#e3e7ed]",
  "[--shadow-ring-strong:0_0_0_1px_#cbd5e1]",
].join(" ");

/**
 * Corporate Atlas page shell: theme tokens, site header, `<main id="main">` and footer.
 *
 * Used by the (atlas) route-group layout and by the root 404 page, which renders outside
 * any route group and so cannot inherit that layout.
 */
export function AtlasShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div
      className={`flex flex-1 flex-col bg-[#F8F8F5] font-sans text-[#0D1B2E] antialiased selection:bg-[#1B5FC4] selection:text-white ${ATLAS_THEME_TOKENS}`}
    >
      <AtlasHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <AtlasFooter />
    </div>
  );
}
