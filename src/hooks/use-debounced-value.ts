import { useEffect, useState } from "react";

/** Returns a value only after it has been stable for the supplied delay. */
export function useDebouncedValue<T>(value: T, delay: number = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
}