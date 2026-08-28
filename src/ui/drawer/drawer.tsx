import { Dialog as AriaDialog, Modal, ModalOverlay, type ModalOverlayProps } from "react-aria-components";
import { cn } from "../../lib/cn";

export interface DrawerProps extends Omit<ModalOverlayProps, "children" | "className"> {
  children: React.ReactNode;
  /** Screen edge from which the drawer enters. */
  side?: "left" | "right" | "bottom";
  className?: string;
}

const sideStyles = { left: "inset-y-0 left-0 h-full w-[min(22rem,calc(100%-2rem))] data-entering:animate-ui-surface-in", right: "inset-y-0 right-0 h-full w-[min(22rem,calc(100%-2rem))] data-entering:animate-ui-surface-in", bottom: "inset-x-0 bottom-0 max-h-[85vh] w-full data-entering:animate-ui-surface-in" };

/** Dismissable modal panel anchored to an edge of the viewport. */
export function Drawer({ children, side = "right", className, ...props }: DrawerProps) {
  return <ModalOverlay isDismissable className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[1px] motion-safe:data-entering:animate-ui-overlay-in motion-safe:data-exiting:animate-ui-overlay-out" {...props}><Modal className={cn("absolute grid gap-4 overflow-y-auto rounded-xl border border-border bg-background p-5 text-foreground shadow-xl outline-none", sideStyles[side], className)}><AriaDialog data-slot="drawer" className="outline-none">{children}</AriaDialog></Modal></ModalOverlay>;
}

export function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="drawer-header" className={cn("flex flex-col gap-1.5", className)} {...props} />; }
export function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) { return <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end", className)} {...props} />; }
export function DrawerTitle({ className, ...props }: React.ComponentProps<"h2">) { return <h2 data-slot="drawer-title" className={cn("text-base font-semibold", className)} {...props} />; }
export function DrawerDescription({ className, ...props }: React.ComponentProps<"p">) { return <p data-slot="drawer-description" className={cn("text-sm text-muted-foreground", className)} {...props} />; }
