import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface FormRowProps {
  /** Visible label associated with the form control. */
  label: ReactNode;
  /** Identifier of the labelled form control. */
  htmlFor: string;
  /** Marks the label as required for assistive technology. */
  required?: boolean;
  /** Supplementary guidance displayed below the control. */
  hint?: ReactNode;
  /** Validation message announced to the user. */
  error?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Labelled form-control row with optional help text and validation feedback. */
export function FormRow({ label, htmlFor, required, hint, error, className, children }: FormRowProps) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errorId = error ? `${htmlFor}-error` : undefined;
  return <div data-slot="form-row" className={cn("flex flex-col gap-1.5", className)}>
    <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">{label}{required && <><span aria-hidden="true" className="ml-0.5 text-destructive">*</span><span className="sr-only"> (obligatorio)</span></>}</label>
    {children}
    {hint && <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p id={errorId} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
  </div>;
}
