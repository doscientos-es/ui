import { cva } from 'class-variance-authority'

/**
 * Provides the clipping and stacking context for a transient action ripple.
 */
export const actionRipple = cva('relative isolate overflow-hidden')
