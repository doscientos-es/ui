import { useMobileViewport } from './use-mobile-viewport'

/** Whether the viewport is narrower than the `md` breakpoint; updates reactively on resize. */
export function useIsMobile() {
  return useMobileViewport() ?? false
}
