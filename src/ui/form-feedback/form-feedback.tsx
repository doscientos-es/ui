import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle, LoaderCircle, CircleAlert } from "lucide-react";
import { cn } from "../../lib/cn";

export type FormFeedbackState = { status: "idle" } | { status: "pending" } | { status: "success"; message?: string } | { status: "error"; message: string };

export function useFormFeedback(options?: { successResetMs?: number }) {
  const resetMs = options?.successResetMs ?? 2500;
  const [state, setState] = useState<FormFeedbackState>({ status: "idle" });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; }, []);
  useEffect(() => () => clearTimer(), [clearTimer]);
  const setPending = useCallback(() => { clearTimer(); setState({ status: "pending" }); }, [clearTimer]);
  const setSuccess = useCallback((message?: string) => { clearTimer(); setState({ status: "success", message }); if (resetMs > 0) timer.current = setTimeout(() => setState({ status: "idle" }), resetMs); }, [clearTimer, resetMs]);
  const setError = useCallback((message: string) => { clearTimer(); setState({ status: "error", message }); }, [clearTimer]);
  const reset = useCallback(() => { clearTimer(); setState({ status: "idle" }); }, [clearTimer]);
  return { state, pending: state.status === "pending", setPending, setSuccess, setError, reset };
}

export interface FormFeedbackProps { state: FormFeedbackState; className?: string; pendingLabel?: string; successLabel?: string; }

export function FormFeedback({ state, className, pendingLabel = "Guardando…", successLabel = "Guardado" }: FormFeedbackProps) {
  if (state.status === "idle") return <span aria-hidden="true" className={cn("inline-flex h-5 items-center", className)} />;
  const error = state.status === "error";
  const success = state.status === "success";
  return <span role={error ? "alert" : "status"} aria-live="polite" className={cn("inline-flex h-5 items-center gap-1.5 text-xs", error && "text-destructive", success && "text-success", state.status === "pending" && "text-muted-foreground", className)}>
    {state.status === "pending" && <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />}
    {success && <CheckCircle aria-hidden="true" className="size-3.5" />}
    {error && <CircleAlert aria-hidden="true" className="size-3.5" />}
    <span>{state.status === "pending" ? pendingLabel : success ? state.message ?? successLabel : state.message}</span>
  </span>;
}
