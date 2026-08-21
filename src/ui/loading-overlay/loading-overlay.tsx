import type * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";
export function LoadingOverlay({ label = "Cargando", className, ...props }: React.ComponentProps<"div"> & { label?: string }) { return <div role="status" aria-live="polite" className={cn("absolute inset-0 z-10 flex items-center justify-center bg-background/70 backdrop-blur-[2px]", className)} {...props}><div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-sm"><LoaderCircle className="animate-spin" aria-hidden="true" /><span>{label}</span></div></div>; }
