import { useState } from "react";
import { cn } from "../../lib/cn";

export type AvatarProps = React.ComponentProps<"div"> & { size?: "xs" | "sm" | "default" | "lg" };

const sizes = { xs: "size-5 text-[10px]", sm: "size-6 text-xs", default: "size-8 text-sm", lg: "size-10 text-base" };

export function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return <div data-slot="avatar" data-size={size} className={cn("group/avatar relative flex shrink-0 overflow-hidden rounded-full bg-muted text-muted-foreground", sizes[size], className)} {...props} />;
}

export function AvatarImage({ className, ...props }: React.ComponentProps<"img">) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <img data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} onError={() => setFailed(true)} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center font-medium", className)} {...props} />;
}

export function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="avatar-badge" className={cn("absolute right-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-background", className)} {...props} />;
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={cn("flex -space-x-2 [&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-background", className)} {...props} />;
}

export function AvatarGroupCount({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="avatar-group-count" className={cn("flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background", className)} {...props} />;
}
