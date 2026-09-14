"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function GlobalVariantSwitcher(): React.JSX.Element | null {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  /* Hydration-safe mount check without an effect: false on the server snapshot,
     true on the client — so the switcher renders only after hydration. */
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) return null;

  const variants = [
    {
      id: "base",
      href: "/",
      badge: "Live",
      title: "Main Blueprint",
      subtitle: "Current Baseline Site",
      theme: "Monochrome Drafting",
    },
    {
      id: "5",
      href: "/5",
      badge: "KimiK3",
      title: "Corporate Atlas",
      subtitle: "Professional Clean Corporate",
      theme: "Porcelain & Steel Blue",
      highlight: "Architectural dual-pillar layout: Manufacturing & Services, numbered process rail, compliance ledger",
    },
  ];

  const currentId = pathname === "/5" ? "5" : "base";

  const currentVariant = variants.find((v) => v.id === currentId) || variants[0];

  return (
    <aside
      aria-label="Interactive Variant Switcher"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[96vw] sm:max-w-2xl pointer-events-none transition-all duration-300 select-none"
    >
      <div className="pointer-events-auto bg-[#0a0f1d]/95 text-slate-100 border border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.65)] rounded-2xl p-2.5 sm:p-3 backdrop-blur-xl">
        {/* Minimized Pill View */}
        {isMinimized ? (
          <div className="flex items-center justify-between gap-3 px-2 py-0.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-400">
                ACTIVE: {currentVariant.badge.toUpperCase()} ({currentVariant.title})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
                {variants.map((v) => (
                  <Link
                    key={v.id}
                    href={v.href}
                    aria-label={`Open ${v.title}`}
                    aria-current={v.id === currentId ? "page" : undefined}
                    className={`px-2 py-0.5 text-[11px] font-mono font-bold rounded transition-all ${
                      v.id === currentId
                        ? "bg-amber-500 text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {v.badge}
                  </Link>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                aria-label="Expand variant switcher"
                className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
                title="Expand Switcher"
              >
                ▲
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Full Switcher View */
          <div className="space-y-2">
            {/* Top Bar: Title, Active Status, Controls */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-mono font-extrabold text-amber-400 tracking-wider">
                    VARIANT SWITCHER
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                    (Review & Compare Both Designs)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  aria-expanded={showDetails}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  {showDetails ? "Hide Details" : "Compare Concepts"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize variant switcher"
                  className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                  title="Minimize Switcher"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Middle Bar: Interactive Switcher Buttons */}
            <div className="grid grid-cols-2 gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 text-center">
              {variants.map((v) => {
                const isActive = v.id === currentId;
                return (
                  <Link
                    key={v.id}
                    href={v.href}
                    aria-label={`Open ${v.title}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-1.5 py-2 rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isActive
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 scale-[1.02]"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-mono font-bold leading-none">
                      {v.badge}
                    </span>
                    <span className="text-[10px] sm:text-[11px] truncate w-full mt-0.5 font-medium">
                      {v.title}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Bottom: Active Variant Quick Note or Comparison Matrix */}
            {showDetails ? (
              <div className="pt-2 text-[11px] text-slate-300 space-y-2 max-h-48 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {variants.map((v) => (
                    <div
                      key={v.id}
                      className={`p-2 rounded-lg border text-left ${
                        v.id === currentId
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-200"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div className="font-bold font-mono text-xs flex justify-between">
                        <span>
                          {v.badge}: {v.title}
                        </span>
                        <span className="text-[10px] opacity-75">{v.theme}</span>
                      </div>
                      <p className="text-[10px] mt-1 text-slate-300 leading-snug">
                        {v.highlight || v.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 px-1 font-mono">
                <div className="truncate">
                  <span className="text-amber-400 font-bold uppercase">{currentVariant.badge}: </span>
                  <span className="text-slate-200">{currentVariant.subtitle}</span>
                  <span className="text-slate-500 hidden md:inline"> — {currentVariant.theme}</span>
                </div>
                <span className="text-[10px] text-emerald-400 shrink-0 ml-2">
                  Dossier Aligned ✓
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
