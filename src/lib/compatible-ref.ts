/** Ref type accepted by every supported React 19 type release. */
export type CompatibleRef<T> =
  | ((instance: T | null) => unknown)
  | { readonly current: T | null }
  | null
