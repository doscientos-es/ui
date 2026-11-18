import { useSyncExternalStore } from 'react'

const MOBILE_MEDIA_QUERY = '(max-width: 47.99rem)'

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(MOBILE_MEDIA_QUERY)
  query.addEventListener('change', onStoreChange)
  return () => query.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches
}

/** The client viewport, or null before hydration. */
export function useMobileViewport() {
  return useSyncExternalStore<boolean | null>(subscribe, getSnapshot, () => null)
}
