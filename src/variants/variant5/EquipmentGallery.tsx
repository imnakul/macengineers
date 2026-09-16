"use client";

import React from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, type Variants } from "framer-motion";
import { MAC_EQUIPMENT, type EquipmentItem } from "../data/variantsData";
import { ArrowRightIcon, CheckCircleIcon } from "../shared/VariantIcons";
import { PlateCta } from "../shared/PlateCta";
import { PlateTag } from "../shared/PlateTag";
import { PlateSurface } from "../shared/PlateSurface";
import { RenderStage } from "@/components/ui/RenderStage";
import { Reveal } from "./Reveal";

/* ---------------------------------------------------------------------------
 * EquipmentGallery — the manufacturing directory as a "conveyor" gallery.
 *
 * One equipment line sits on the stage with its spec sheet. The other lines in
 * the current filter wait in a queue of cards to its right. Advancing moves the
 * first queued card onto the stage and sends the previous line to the back of
 * the queue, like parts moving along a conveyor.
 *
 * Category pills filter which lines are in rotation ("All" shows every line).
 * Navigation within the filter:
 * - Trackpad: one horizontal two-finger swipe = one step. Vertical scrolling
 *   is never intercepted, so the page still scrolls normally.
 * - Keyboard: ← / → step, Home / End jump (while focus is inside the gallery).
 * - Pointer: the arrow buttons, or click any queued card.
 * - Touch: swipe horizontally on the stage.
 *
 * A single "Request Datasheet" action sits below the gallery and always targets
 * the line currently on stage.
 * ------------------------------------------------------------------------- */

type EquipmentCategory = EquipmentItem["category"];
type GalleryFilter = "all" | EquipmentCategory;
type Direction = 1 | -1;

interface GalleryState {
  filter: GalleryFilter;
  /** Position within the filtered lines. */
  index: number;
  /** Which way the last move went; drives the slide direction of the stage. */
  direction: Direction;
}

const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  vessels: "Vessels",
  mixing: "Mixing & Dispersion",
  handling: "Material Handling",
  turnkey: "Turnkey Plants",
};

function linesIn(category: EquipmentCategory): readonly EquipmentItem[] {
  return MAC_EQUIPMENT.filter((item) => item.category === category);
}

/** Lines in rotation for each filter, computed once. */
const LINES_BY_FILTER: Record<GalleryFilter, readonly EquipmentItem[]> = {
  all: MAC_EQUIPMENT,
  vessels: linesIn("vessels"),
  mixing: linesIn("mixing"),
  handling: linesIn("handling"),
  turnkey: linesIn("turnkey"),
};

/** Filter pills in display order; empty categories are hidden. */
const FILTERS: readonly GalleryFilter[] = (["all", "vessels", "mixing", "handling", "turnkey"] satisfies GalleryFilter[]).filter(
  (filter) => LINES_BY_FILTER[filter].length > 0
);

/** Horizontal trackpad travel (px) needed before a swipe counts as a step. */
const WHEEL_STEP_THRESHOLD = 40;
/** Quiet time (ms) that ends a trackpad gesture, so inertia can't trigger a second step. */
const WHEEL_GESTURE_GAP_MS = 240;
/** Horizontal finger travel (px) needed for a touch swipe on the stage. */
const SWIPE_THRESHOLD_PX = 48;

const EASE: [number, number, number, number] = [0.33, 0, 0, 1];
const EASE_CLASS = "ease-[cubic-bezier(0.33,0,0,1)]";

/** Stage slides in from the side the user is moving towards. Transforms are dropped under reduced motion. */
const SLIDE_VARIANTS: Variants = {
  enter: (direction: Direction) => ({ opacity: 0, x: direction * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: Direction) => ({ opacity: 0, x: direction * -28 }),
};

function wrapIndex(index: number, total: number): number {
  return total === 0 ? 0 : ((index % total) + total) % total;
}

function padIndex(value: number): string {
  return String(value).padStart(2, "0");
}

/* --------------------------------- Pieces --------------------------------- */

interface EquipmentVisualProps {
  item: EquipmentItem;
  sizes: string;
  /** Tighter padding for the small queue cards. */
  compact?: boolean;
}

/** The equipment render on the shared studio stage, zooming gently when its card is hovered. */
function EquipmentVisual({ item, sizes, compact = false }: EquipmentVisualProps): React.JSX.Element {
  return (
    <RenderStage
      src={item.image}
      alt={item.name}
      sizes={sizes}
      compact={compact}
      imageClassName={`transition-transform duration-700 group-hover:scale-[1.04] ${EASE_CLASS}`}
    />
  );
}

interface StepButtonProps {
  direction: "previous" | "next";
  onClick: () => void;
  disabled: boolean;
}

/** Chamfered 40px step button. `next` is the solid primary; `previous` is the outline secondary. */
function StepButton({ direction, onClick, disabled }: StepButtonProps): React.JSX.Element {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isNext ? "Next equipment line" : "Previous equipment line"}
      className={`group/step relative isolate inline-flex h-10 w-10 items-center justify-center outline-none [--cut:7px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5FC4] disabled:pointer-events-none disabled:opacity-40 ${
        isNext ? "text-white" : "text-[#0D1B2E]"
      }`}
    >
      <PlateSurface
        frameClassName={isNext ? "bg-[#0F3D87]" : "bg-[#CBD5E1] group-hover/step:bg-[#1B5FC4]"}
        faceClassName={isNext ? "bg-[#1B5FC4] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" : "bg-white"}
      >
        <span
          className={`absolute inset-0 scale-x-0 transition-transform duration-300 group-hover/step:scale-x-100 ${EASE_CLASS} ${
            isNext ? "origin-left bg-[#0F3D87]" : "origin-right bg-[#F2F6FC]"
          }`}
        />
      </PlateSurface>
      <ArrowRightIcon
        className={`h-4 w-4 transition-transform duration-[167ms] ${EASE_CLASS} ${
          isNext ? "group-hover/step:translate-x-0.5" : "rotate-180 group-hover/step:-translate-x-0.5"
        }`}
      />
    </button>
  );
}

/* --------------------------------- Section -------------------------------- */

export interface EquipmentGalleryProps {
  /** Opens the RFQ flow prefilled with the equipment line currently on stage. */
  onRequestDatasheet: (equipmentName: string) => void;
  /** Opens the RFQ flow for an off-catalogue build. */
  onRequestCustomBuild: () => void;
}

/** Filterable stage + conveyor-queue gallery for Variant 5's manufacturing directory. */
export function EquipmentGallery({
  onRequestDatasheet,
  onRequestCustomBuild,
}: EquipmentGalleryProps): React.JSX.Element | null {
  const [{ filter, index, direction }, setGallery] = React.useState<GalleryState>({
    filter: "all",
    index: 0,
    direction: 1,
  });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const swipeStartX = React.useRef<number | null>(null);

  const lines = LINES_BY_FILTER[filter];
  const total = lines.length;
  const canStep = total > 1;

  const step = React.useCallback((move: Direction): void => {
    setGallery((previous) => {
      const count = LINES_BY_FILTER[previous.filter].length;
      if (count <= 1) return previous;
      return { ...previous, index: wrapIndex(previous.index + move, count), direction: move };
    });
  }, []);

  const goTo = React.useCallback((target: number, forcedDirection?: Direction): void => {
    setGallery((previous) => {
      const nextIndex = wrapIndex(target, LINES_BY_FILTER[previous.filter].length);
      if (nextIndex === previous.index) return previous;
      return { ...previous, index: nextIndex, direction: forcedDirection ?? (nextIndex > previous.index ? 1 : -1) };
    });
  }, []);

  const changeFilter = (nextFilter: GalleryFilter): void => {
    setGallery((previous) => (previous.filter === nextFilter ? previous : { filter: nextFilter, index: 0, direction: 1 }));
  };

  /* Trackpad: native listener because React's wheel handler is passive and cannot preventDefault. */
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let travel = 0;
    let gestureConsumed = false;
    let lastEventAt = 0;

    const onWheel = (event: WheelEvent): void => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      // Stops the browser treating the swipe as history navigation or a sideways pan.
      event.preventDefault();

      if (event.timeStamp - lastEventAt > WHEEL_GESTURE_GAP_MS) {
        travel = 0;
        gestureConsumed = false;
      }
      lastEventAt = event.timeStamp;
      if (gestureConsumed) return;

      travel += event.deltaX;
      if (Math.abs(travel) >= WHEEL_STEP_THRESHOLD) {
        step(travel > 0 ? 1 : -1);
        gestureConsumed = true;
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [step]);

  const active = lines[index];
  if (!active) return null;

  const queueIndices = Array.from({ length: total - 1 }, (_, offset) => wrapIndex(index + 1 + offset, total));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key) {
      case "ArrowRight":
        step(1);
        break;
      case "ArrowLeft":
        step(-1);
        break;
      case "Home":
        goTo(0, -1);
        break;
      case "End":
        goTo(total - 1, 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const handleStagePointerUp = (event: React.PointerEvent<HTMLElement>): void => {
    const start = swipeStartX.current;
    swipeStartX.current = null;
    if (start === null) return;
    const travelX = event.clientX - start;
    if (Math.abs(travelX) >= SWIPE_THRESHOLD_PX) step(travelX < 0 ? 1 : -1);
  };

  const filterLabel = filter === "all" ? "All Lines" : CATEGORY_LABELS[filter];

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Equipment gallery"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="rounded-[8px] outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#1B5FC4]"
      >
        <p className="sr-only" aria-live="polite">
          {filterLabel}: showing {index + 1} of {total}, {active.name}
        </p>

        {/* Controls: category filter pills, then arrows with a position readout */}
        <Reveal>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter equipment by category">
              {FILTERS.map((option) => {
                const isActive = filter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => changeFilter(option)}
                    aria-pressed={isActive}
                    className={`group/chip relative isolate shrink-0 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] outline-none transition-colors duration-150 [--cut:6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5FC4] ${
                      isActive ? "text-white" : "text-slate-600 hover:text-[#1B5FC4]"
                    }`}
                  >
                    <PlateSurface
                      frameClassName={isActive ? "bg-[#0D1B2E]" : "bg-[#E3E7ED] group-hover/chip:bg-[#1B5FC4]/60"}
                      faceClassName={isActive ? "bg-[#0D1B2E]" : "bg-white"}
                    />
                    {option === "all" ? "All" : CATEGORY_LABELS[option]}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <StepButton direction="previous" onClick={() => step(-1)} disabled={!canStep} />
              <p aria-hidden="true" className="min-w-[4.5rem] text-center font-mono text-xs font-semibold tabular-nums tracking-[0.14em]">
                <span className="text-[#1B5FC4]">{padIndex(index + 1)}</span>
                <span className="text-slate-400"> / {padIndex(total)}</span>
              </p>
              <StepButton direction="next" onClick={() => step(1)} disabled={!canStep} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* ------------------------------ Stage ------------------------------ */}
            <article
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}: ${active.name}`}
              onPointerDown={(event) => {
                if (event.pointerType === "touch") swipeStartX.current = event.clientX;
              }}
              onPointerUp={handleStagePointerUp}
              onPointerCancel={() => {
                swipeStartX.current = null;
              }}
              className="grid touch-pan-y overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white md:h-[25rem] md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] lg:col-span-7"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <EquipmentVisual item={active} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative flex min-h-0 flex-col overflow-hidden p-5 sm:p-6 md:h-full">
                <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                  <motion.div
                    key={active.id}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex h-full flex-col"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlateTag skin="tint">{CATEGORY_LABELS[active.category]}</PlateTag>
                      {active.badge ? <PlateTag skin="steel">{active.badge}</PlateTag> : null}
                    </div>

                    <h3 className="mt-3 line-clamp-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-[#0D1B2E]">
                      {active.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-600">{active.fullDesc}</p>

                    <ul className="mt-4 mb-4 space-y-1.5">
                      {active.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-[12.5px] leading-snug text-slate-700">
                          <CheckCircleIcon className="mt-px h-3.5 w-3.5 shrink-0 text-[#1B5FC4]" />
                          <span className="line-clamp-2">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-auto grid grid-cols-2 gap-x-5 gap-y-1 border-t border-[#EDF1F6] pt-4">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">Capacity</dt>
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">MOC</dt>
                      <dd className="line-clamp-2 text-[12.5px] font-semibold text-[#0D1B2E]">{active.capacityRange}</dd>
                      <dd className="line-clamp-2 text-[12.5px] font-semibold text-[#0D1B2E]">{active.moc.slice(0, 2).join(" · ")}</dd>
                    </dl>
                  </motion.div>
                </AnimatePresence>
              </div>
            </article>

            {/* ------------------------------ Queue ------------------------------ */}
            <div className="hidden min-w-0 lg:col-span-5 lg:block">
              {canStep ? (
                <div
                  className="flex h-full gap-3 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,black_75%,transparent)] [mask-image:linear-gradient(to_right,black_75%,transparent)]"
                >
                  <LayoutGroup>
                    <AnimatePresence initial={false} mode="popLayout">
                      {queueIndices.map((itemIndex, position) => {
                        const item = lines[itemIndex];
                        if (!item) return null;
                        return (
                          <motion.button
                            key={`${filter}-${item.id}`}
                            layout
                            type="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ layout: { duration: 0.45, ease: EASE }, opacity: { duration: 0.25 } }}
                            onClick={() => {
                              goTo(itemIndex, 1);
                              // The clicked card leaves the queue, so keep keyboard focus inside the gallery.
                              rootRef.current?.focus({ preventScroll: true });
                            }}
                            aria-label={`Show ${item.name}${position === 0 ? " (next)" : ""}`}
                            className="group relative flex w-[11.5rem] shrink-0 flex-col overflow-hidden rounded-[6px] border border-[#E3E7ED] bg-white text-left outline-none transition-colors duration-150 hover:border-[#1B5FC4]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B5FC4]"
                          >
                            <span className="relative block min-h-[9rem] w-full flex-1 overflow-hidden">
                              <EquipmentVisual item={item} sizes="200px" compact />
                            </span>
                            <span className="flex h-[6.75rem] shrink-0 flex-col gap-1 overflow-hidden border-t border-[#EDF1F6] p-3.5">
                              <span className="truncate font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#1B5FC4]">
                                {padIndex(itemIndex + 1)} · {CATEGORY_LABELS[item.category]}
                              </span>
                              <span className="line-clamp-2 font-display text-[13.5px] font-semibold leading-snug text-[#0D1B2E]">
                                {item.name}
                              </span>
                              <span className="line-clamp-1 text-[11px] text-slate-500">{item.capacityRange}</span>
                            </span>
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute inset-x-0 bottom-0 block h-0.5 origin-left scale-x-0 bg-[#1B5FC4] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${EASE_CLASS}`}
                            />
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </LayoutGroup>
                </div>
              ) : (
                /* Single-line category: nothing to queue, so offer a way back to every line. */
                <div className="flex h-full flex-col justify-between gap-5 rounded-[6px] border border-[#E3E7ED] bg-[#F8FAFD] p-5 sm:p-6">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1B5FC4]">
                      Only line in {filterLabel}
                    </p>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                      This category has one standard line. Browse the full directory, or send us a custom duty.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => changeFilter("all")}
                    className="group/link inline-flex items-center gap-2 self-start text-[13px] font-semibold text-[#1B5FC4] outline-none transition-colors duration-150 hover:text-[#0F3D87] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5FC4]"
                  >
                    View all {MAC_EQUIPMENT.length} lines
                    <ArrowRightIcon className={`h-3.5 w-3.5 transition-transform duration-[167ms] group-hover/link:translate-x-0.5 ${EASE_CLASS}`} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Single action row: datasheet for whatever is on stage, plus the off-catalogue route */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
            <PlateCta
              onClick={() => onRequestDatasheet(active.name)}
              aria-label={`Request datasheet for ${active.name}`}
              className="self-start whitespace-nowrap sm:self-auto"
            >
              Request Datasheet
            </PlateCta>
            <p className="min-w-0 truncate font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              For · <span className="text-[#0D1B2E]">{active.name}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onRequestCustomBuild}
            className="group/link inline-flex shrink-0 items-center gap-2 self-start text-[13px] font-semibold text-[#1B5FC4] outline-none transition-colors duration-150 hover:text-[#0F3D87] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B5FC4] sm:self-auto"
          >
            Off-catalogue duty? Engineer a custom build
            <ArrowRightIcon className={`h-3.5 w-3.5 transition-transform duration-[167ms] group-hover/link:translate-x-0.5 ${EASE_CLASS}`} />
          </button>
        </div>
      </div>
    </MotionConfig>
  );
}
