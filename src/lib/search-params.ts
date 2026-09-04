export type SearchParamPrimitive = string | number | boolean
export type SearchParamValue =
  | SearchParamPrimitive
  | readonly SearchParamPrimitive[]
  | null
  | undefined
export type SearchParamUpdates = Record<string, SearchParamValue>
export type SearchParamsRecord = Record<string, string | readonly string[] | undefined>
export type SearchParamsInput =
  | string
  | URLSearchParams
  | SearchParamsRecord
  | { toString(): string }

/** Normalizes framework-specific query values into a mutable URLSearchParams instance. */
export function toSearchParams(input: SearchParamsInput = ''): URLSearchParams {
  if (typeof input === 'string' || input instanceof URLSearchParams)
    return new URLSearchParams(input)
  if (Object.getPrototypeOf(input) === Object.prototype) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(input)) {
      for (const item of Array.isArray(value) ? value : [value]) {
        if (item !== undefined) params.append(key, item)
      }
    }
    return params
  }
  return new URLSearchParams(input.toString())
}

/** Applies filter updates without dropping unrelated query params. Empty values remove their key. */
export function updateSearchParams(
  current: SearchParamsInput,
  updates: SearchParamUpdates,
): URLSearchParams {
  const params = toSearchParams(current)
  for (const [key, value] of Object.entries(updates)) {
    params.delete(key)
    if (value === null || value === undefined || value === '') continue
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== '') params.append(key, String(item))
    }
  }
  return params
}

export function readSearchParam(params: SearchParamsInput, key: string, fallback = ''): string {
  return toSearchParams(params).get(key)?.trim() || fallback
}

export function readSearchParamArray(params: SearchParamsInput, key: string): string[] {
  return toSearchParams(params)
    .getAll(key)
    .map((value) => value.trim())
    .filter(Boolean)
}

export function readSearchParamInt(
  params: SearchParamsInput,
  key: string,
  fallback = 1,
  options: { min?: number; max?: number } = {},
): number {
  const rawValue = readSearchParam(params, key)
  if (!rawValue) return fallback
  const value = Number(rawValue)
  if (!Number.isSafeInteger(value)) return fallback
  const min = options.min ?? Number.NEGATIVE_INFINITY
  const max = options.max ?? Number.POSITIVE_INFINITY
  return value >= min && value <= max ? value : fallback
}

export function readSearchParamEnum<Value extends string>(
  params: SearchParamsInput,
  key: string,
  values: readonly Value[],
  fallback: Value,
): Value {
  const value = readSearchParam(params, key)
  return values.includes(value as Value) ? (value as Value) : fallback
}
