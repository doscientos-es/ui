import { forwardRef } from "react";
import { Input as AriaInput, type InputProps as AriaInputProps } from "react-aria-components";
import { cn } from "../lib/cn";

type CompatibleRef<T> = ((instance: T | null) => unknown) | { readonly current: T | null } | null;

export type InputProps = Omit<AriaInputProps, "ref"> & { ref?: CompatibleRef<HTMLInputElement> };

const InputImpl = forwardRef<HTMLInputElement, AriaInputProps>(function Input({ className, type, ...props }, ref) {
  return <AriaInput ref={ref} type={type} data-slot="input" className={cn("h-8 w-full min-w-0 rounded-lg border border-border bg-background px-2.5 py-1 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive", className)} {...props} />;
});

/** Forward-ref component with a ref type compatible across React 19 type releases. */
export const Input = InputImpl as unknown as (props: InputProps) => ReturnType<typeof InputImpl>;
