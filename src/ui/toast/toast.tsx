import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { CheckCircle, Info, CircleAlert, XCircle, X } from "lucide-react";
import { Button } from "../button/button";
import { cn } from "../../lib/cn";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ToastAction = { label: string; onPress: () => void };
export type ToastOptions = { title: string; description?: string; variant?: ToastVariant; duration?: number; position?: ToastPosition; action?: ToastAction };
export type ToastData = ToastOptions & { id: string; state: "open" | "closing" };
type ToastPromiseOptions<T> = { loading: string; success: string | ((value: T) => string); error: string | ((error: unknown) => string); description?: string; position?: ToastPosition };

let records: ToastData[] = [];
const listeners = new Set<() => void>();
const snapshot = () => records;
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => { listeners.add(listener); return () => listeners.delete(listener); };
const remove = (id: string) => { records = records.filter((record) => record.id !== id); emit(); };

function create(options: ToastOptions) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  records = [...records, { ...options, id, state: "open", variant: options.variant ?? "default", duration: options.duration ?? 5000, position: options.position ?? "bottom-right" }];
  emit();
  return id;
}

function dismiss(id: string) {
  if (!records.some((record) => record.id === id && record.state === "open")) return;
  records = records.map((record) => record.id === id ? { ...record, state: "closing" } : record);
  emit();
  window.setTimeout(() => remove(id), 180);
}

function update(id: string, patch: Partial<ToastData>) { records = records.map((record) => record.id === id ? { ...record, ...patch, state: "open" } : record); emit(); }

export const toast = Object.assign((options: ToastOptions) => create(options), {
  success: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "success" }),
  error: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "error" }),
  warning: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "warning" }),
  info: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "info" }),
  dismiss,
  promise: <T,>(promise: Promise<T>, options: ToastPromiseOptions<T>) => {
    const id = create({ title: options.loading, description: options.description, variant: "default", duration: 0, position: options.position });
    promise.then((value) => update(id, { title: typeof options.success === "function" ? options.success(value) : options.success, variant: "success", duration: 4000 })).catch((error: unknown) => update(id, { title: typeof options.error === "function" ? options.error(error) : options.error, variant: "error", duration: 6000 }));
    return promise;
  },
});

export function useToast() { return toast; }
export function ToastProvider({ children }: { children: ReactNode }) { return <>{children}<Toaster /></>; }

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start", "top-center": "top-4 left-1/2 -translate-x-1/2 items-center", "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start", "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center", "bottom-right": "bottom-4 right-4 items-end",
};

export function Toaster({ position = "bottom-right" }: { position?: ToastPosition }) {
  return <>{(Object.keys(positionClasses) as ToastPosition[]).map((item) => <ToastViewport key={item} position={item} visiblePosition={position} />)}</>;
}

export function ToastViewport({ position, visiblePosition, className }: { position: ToastPosition; visiblePosition?: ToastPosition; className?: string }) {
  const toasts = useSyncExternalStore(subscribe, snapshot, snapshot).filter((item) => item.position === position);
  if (visiblePosition && position !== visiblePosition && toasts.length === 0) return null;
  return <div aria-label={`Notificaciones ${position}`} className={cn("pointer-events-none fixed z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2", positionClasses[position], className)}>{toasts.map((item) => <Toast key={item.id} {...item} onDismiss={() => dismiss(item.id)} />)}</div>;
}

export function Toast({ id, title, description, variant = "default", action, state = "open", duration = 0, onDismiss }: ToastData & { onDismiss?: () => void }) {
  useEffect(() => { if (state !== "open" || duration <= 0) return; const timeout = window.setTimeout(() => dismiss(id), duration); return () => window.clearTimeout(timeout); }, [duration, id, state]);
  const Icon = variant === "success" ? CheckCircleIcon : variant === "error" ? XCircleIcon : variant === "warning" ? WarningCircleIcon : variant === "info" ? InfoIcon : InfoIcon;
  return <div role={variant === "error" ? "alert" : "status"} data-state={state} className={cn("pointer-events-auto w-full overflow-hidden rounded-xl border border-border/80 bg-background/95 p-3.5 text-foreground shadow-xl shadow-black/10 backdrop-blur-md animate-ui-toast-in", "data-[state=closing]:animate-ui-toast-out motion-reduce:animate-none", variant === "success" && "border-success/30", variant === "error" && "border-destructive/30", variant === "warning" && "border-warning/40")}><div className="flex items-start gap-3"><Icon aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", variant === "success" && "text-success", variant === "error" && "text-destructive", variant === "warning" && "text-warning", variant === "info" && "text-primary")} /><div className="min-w-0 flex-1"><p className="animate-ui-toast-title text-sm font-semibold">{title}</p>{description && <p className="mt-1 max-h-20 animate-ui-toast-description overflow-hidden text-sm leading-5 text-muted-foreground data-[state=closing]:max-h-0" data-state={state}>{description}</p>}{action && <Button size="sm" variant="link" onPress={action.onPress} className="mt-1 h-auto px-0">{action.label}</Button>}</div><Button aria-label="Cerrar notificación" onPress={onDismiss} size="icon" variant="ghost" className="-mr-2 -mt-2 size-7"><XIcon /></Button></div></div>;
}
