import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "../../lib/cn";

export type AvatarProps = React.ComponentProps<"div"> & { size?: "xs" | "sm" | "default" | "lg" };

const sizes = { xs: "size-5 text-[10px]", sm: "size-6 text-xs", default: "size-8 text-sm", lg: "size-10 text-base" };

type AvatarStatus = "idle" | "loading" | "loaded" | "error";
const AvatarContext = createContext<{
  status: AvatarStatus;
  setStatus: (status: AvatarStatus) => void;
} | null>(null);

export function Avatar({ className, size = "default", children, ...props }: AvatarProps) {
  const [status, setStatus] = useState<AvatarStatus>("idle");
  return <AvatarContext.Provider value={{ status, setStatus }}><div data-slot="avatar" data-size={size} className={cn("group/avatar relative flex shrink-0 overflow-hidden rounded-full bg-muted text-muted-foreground", sizes[size], className)} {...props}>{children}</div></AvatarContext.Provider>;
}

export function AvatarImage({ className, src, onError, onLoad, ...props }: React.ComponentProps<"img">) {
  const avatar = useContext(AvatarContext);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    avatar?.setStatus(src ? "loading" : "idle");
  }, [avatar?.setStatus, src]);

  if (failed || avatar?.status === "error") return null;
  return <img data-slot="avatar-image" src={src} className={cn("aspect-square size-full object-cover", className)} onLoad={(event) => { avatar?.setStatus("loaded"); onLoad?.(event); }} onError={(event) => { setFailed(true); avatar?.setStatus("error"); onError?.(event); }} {...props} />;
}

export function AvatarFallback({ className, ...props }: React.ComponentProps<"span">) {
  const avatar = useContext(AvatarContext);
  if (avatar?.status === "loaded") return null;
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
