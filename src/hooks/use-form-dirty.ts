import { type RefCallback, useCallback, useRef, useState } from "react";

export function formSnapshot(form: HTMLFormElement): string {
  const entries: Array<[string, string]> = Array.from(new FormData(form), ([key, value]) => [key, typeof value === "string" ? value : value.name]);
  entries.sort(([left], [right]) => left.localeCompare(right));
  return JSON.stringify(entries);
}

export interface UseFormDirtyResult<T extends HTMLFormElement = HTMLFormElement> {
  formRef: RefCallback<T | null>;
  isDirty: boolean;
  markDirty: () => void;
  reset: () => void;
}

/** Tracks changes in native form controls and supports controlled fields. */
export function useFormDirty<T extends HTMLFormElement = HTMLFormElement>(): UseFormDirtyResult<T> {
  const formElement = useRef<T | null>(null);
  const baseline = useRef<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const recompute = useCallback(() => {
    if (formElement.current && baseline.current !== null) {
      setIsDirty(formSnapshot(formElement.current) !== baseline.current);
    }
  }, []);

  const reset = useCallback(() => {
    if (formElement.current) {
      baseline.current = formSnapshot(formElement.current);
      setIsDirty(false);
    }
  }, []);

  const formRef = useCallback<RefCallback<T | null>>((form) => {
    if (formElement.current) {
      formElement.current.removeEventListener("input", recompute);
      formElement.current.removeEventListener("change", recompute);
      formElement.current.removeEventListener("reset", recompute);
    }
    formElement.current = form;
    if (form) {
      baseline.current = formSnapshot(form);
      setIsDirty(false);
      form.addEventListener("input", recompute);
      form.addEventListener("change", recompute);
      form.addEventListener("reset", recompute);
    }
  }, [recompute]);

  return { formRef, isDirty, markDirty: () => setIsDirty(true), reset };
}
