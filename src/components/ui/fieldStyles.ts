/**
 * Shared form field styling, so the enquiry form and the quote form cannot drift apart.
 * Inputs carry a real border rather than the ring used elsewhere on the site: a ring and
 * a focus ring are both box-shadows and would fight each other on focus.
 */
export const INPUT_CLASS =
  "w-full rounded-btn border border-hairline-strong bg-canvas px-4 py-3 text-[15px] font-regular tracking-glide text-ink-strong transition-[border-color] duration-150 ease-ui placeholder:text-ink-muted/60 hover:border-ink-muted/40 focus:border-accent focus:outline-none disabled:opacity-60";

export const LABEL_CLASS = "font-mono text-[10px] tracking-tech text-ink-muted uppercase";

export const ERROR_CLASS = "text-[13px] tracking-glide text-accent";

export const HINT_CLASS = "text-[13px] leading-[20px] tracking-glide text-ink-muted";

/** Checkbox and radio inputs, sized up from the browser default for touch. */
export const CHOICE_INPUT_CLASS =
  "mt-0.5 h-4 w-4 shrink-0 accent-accent disabled:opacity-60";

export const CHOICE_LABEL_CLASS =
  "flex cursor-pointer items-start gap-3 rounded-btn px-3 py-2.5 text-[14px] leading-[21px] font-regular tracking-glide text-ink transition-[background-color] duration-150 ease-ui hover:bg-surface";
