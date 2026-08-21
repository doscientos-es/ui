import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button, type ButtonProps } from "../button/button";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> { pendingLabel?: string; loading?: boolean; children: React.ReactNode; }

export function SubmitButton({ pendingLabel = "Guardando…", loading = false, children, isDisabled, size = "sm", ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const busy = pending || loading;
  return <Button type="submit" size={size} isDisabled={busy || isDisabled} aria-busy={busy || undefined} {...props}>{busy ? <><CircleNotchIcon aria-hidden="true" className="size-3.5 animate-spin" />{pendingLabel}</> : children}</Button>;
}
