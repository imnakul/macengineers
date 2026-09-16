"use client";

import React from "react";

/* ---------------------------------------------------------------------------
 * TEMPORARY — hero comparison switcher.
 * TODO: Delete this file (and the switcher in Variant5Page) once a hero is chosen.
 *
 * The choice is kept in localStorage so it survives reloads while reviewing, and can be
 * forced with `?hero=current|plate|scene|factory|factory-tall|factory-logo|factory-final`. The server always renders the default (Factory 4), and the
 * stored choice is applied after hydration, so the two never disagree.
 * ------------------------------------------------------------------------- */

export type HeroVariant = "current" | "plate" | "scene" | "factory" | "factory-tall" | "factory-logo" | "factory-final";

/** Factory 4 is the final candidate, so the server renders it (and the homepage preloads its image). */
export const DEFAULT_HERO_VARIANT: HeroVariant = "factory-final";

const STORAGE_KEY = "mac:hero-variant";
const CHANGE_EVENT = "mac:hero-variant-change";

const OPTIONS: readonly { value: HeroVariant; label: string; hint: string }[] = [
  { value: "current", label: "Current", hint: "Framed scene render" },
  { value: "plate", label: "Plate", hint: "Hero 1 — drafting plate" },
  { value: "scene", label: "Scene", hint: "Hero 2 — full-bleed stage (≥1280px)" },
  { value: "factory", label: "Factory", hint: "Hero 2 with the factory photo (≥1280px)" },
  { value: "factory-tall", label: "Factory 2", hint: "Factory layout with the outpainted plant photo, no callouts (≥1280px)" },
  { value: "factory-logo", label: "Factory 3", hint: "Factory 2 with the MAC logo on the vessel (≥1280px)" },
  { value: "factory-final", label: "Factory 4", hint: "Final candidate: depth-of-field render + light grid behind the copy (≥1280px)" },
];

function isHeroVariant(value: string | null): value is HeroVariant {
  return OPTIONS.some((option) => option.value === value);
}

function readVariant(): HeroVariant {
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("hero");
    if (isHeroVariant(fromQuery)) return fromQuery;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isHeroVariant(stored) ? stored : DEFAULT_HERO_VARIANT;
  } catch {
    return DEFAULT_HERO_VARIANT;
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function writeVariant(value: HeroVariant): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", value);
    window.history.replaceState(window.history.state, "", url);
  } catch (error) {
    console.warn("[HeroSwitcher] Could not persist hero variant", error);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Current hero variant, synced with storage and the URL. */
export function useHeroVariant(): [HeroVariant, (value: HeroVariant) => void] {
  const variant = React.useSyncExternalStore(subscribe, readVariant, () => DEFAULT_HERO_VARIANT);
  return [variant, writeVariant];
}

/** Floating segmented control, bottom-left, for flipping between hero layouts while reviewing. */
export function HeroSwitcher(): React.JSX.Element {
  const [variant, setVariant] = useHeroVariant();

  return (
    <div
      role="group"
      aria-label="Preview hero layout (temporary)"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-[8px] border border-[#0D1B2E]/10 bg-white/90 p-1 shadow-[0_18px_40px_-20px_rgba(13,27,46,0.45)] backdrop-blur-md"
    >
      <span className="px-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Hero</span>
      {OPTIONS.map((option) => {
        const active = option.value === variant;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            title={option.hint}
            onClick={() => setVariant(option.value)}
            className={`rounded-[6px] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] outline-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5FC4] ${
              active ? "bg-[#0D1B2E] text-white" : "text-slate-600 hover:bg-[#F2F6FC] hover:text-[#1B5FC4]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
