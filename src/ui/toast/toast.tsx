import { useEffect, type ReactNode } from "react";
import { sileo, Toaster as SileoToaster } from "sileo";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ToastAction = { label: string; onPress: () => void };
export type ToastOptions = { title: string; description?: string; variant?: ToastVariant; duration?: number; position?: ToastPosition; action?: ToastAction };
export type ToastData = ToastOptions & { id: string; state: "open" | "closing" };
type ToastPromiseOptions<T> = { loading: string; success: string | ((value: T) => string); error: string | ((error: unknown) => string); description?: string; position?: ToastPosition };

function toSileoOptions({ title, description, duration, position, action }: ToastOptions) {
  return {
    title,
    description,
    duration: duration === 0 ? null : duration,
    position,
    button: action ? { title: action.label, onClick: action.onPress } : undefined,
  };
}

function create(options: ToastOptions) {
  const sileoOptions = toSileoOptions(options);
  if (options.action) return sileo.action(sileoOptions);
  if (options.variant === "success") return sileo.success(sileoOptions);
  if (options.variant === "error") return sileo.error(sileoOptions);
  if (options.variant === "warning") return sileo.warning(sileoOptions);
  if (options.variant === "info") return sileo.info(sileoOptions);
  return sileo.show(sileoOptions);
}

export const toast = Object.assign((options: ToastOptions) => create(options), {
  success: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "success" }),
  error: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "error" }),
  warning: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "warning" }),
  info: (title: string, options?: Omit<ToastOptions, "title" | "variant">) => create({ ...options, title, variant: "info" }),
  dismiss: (id: string) => sileo.dismiss(id),
  promise: <T,>(promise: Promise<T>, options: ToastPromiseOptions<T>) => {
    const shared = { description: options.description, position: options.position };
    return sileo.promise(promise, {
      loading: { ...shared, title: options.loading },
      success: (value) => ({ ...shared, title: typeof options.success === "function" ? options.success(value) : options.success }),
      error: (error) => ({ ...shared, title: typeof options.error === "function" ? options.error(error) : options.error }),
      position: options.position,
    });
  },
});

export function useToast() { return toast; }
export function ToastProvider({ children }: { children: ReactNode }) { return <>{children}<Toaster /></>; }

/** Viewport that renders notifications created with {@link toast}. */
export function Toaster({ position }: { position?: ToastPosition }) {
  return <SileoToaster position={position} options={{ fill: "var(--ui-secondary)" }} />;
}

export function ToastViewport({ position, visiblePosition, className }: { position: ToastPosition; visiblePosition?: ToastPosition; className?: string }) {
  void className;
  if (visiblePosition && visiblePosition !== position) return null;
  return <Toaster position={position} />;
}

export function Toast({ id, title, description, variant = "default", action, state = "open", duration = 0, position, onDismiss }: ToastData & { onDismiss?: () => void }) {
  useEffect(() => {
    if (state !== "open") return;
    const toastId = create({ title, description, variant, action, duration, position });
    return () => {
      sileo.dismiss(toastId);
      onDismiss?.();
    };
  }, [action, description, duration, id, onDismiss, position, state, title, variant]);
  return null;
}
