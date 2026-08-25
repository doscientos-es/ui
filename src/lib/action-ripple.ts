import { cva } from "class-variance-authority";

/**
 * Adds a subtle, centered press ripple to an interactive element.
 * The effect owns the element's `::after` pseudo-element.
 */
export const actionRipple = cva(
  "relative isolate overflow-hidden after:pointer-events-none after:absolute after:top-1/2 after:left-1/2 after:aspect-square after:w-full after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-current after:opacity-0 after:content-[''] after:transition-[scale,opacity] after:duration-300 after:ease-out active:after:scale-150 active:after:opacity-10 data-pressed:after:scale-150 data-pressed:after:opacity-10 motion-reduce:after:hidden",
);