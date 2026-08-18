import { createContext, useContext } from "react";
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
  Text,
  type DialogProps as AriaDialogProps,
  type ModalOverlayProps,
} from "react-aria-components";
import { cn } from "../lib/cn";
import { Button } from "./button";

const DialogCloseContext = createContext<(() => void) | null>(null);

export type DialogProps = Omit<ModalOverlayProps, "children" | "className" | "isOpen"> & {
  children: React.ReactNode;
  open: boolean;
};

/** Controlled overlay root. Use `DialogContent` for its accessible surface. */
export function Dialog({ open, children, ...props }: DialogProps) {
  return <ModalOverlay isOpen={open} className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4 backdrop-blur-[1px]" {...props}>
    {children}
  </ModalOverlay>;
}

export function DialogClose({ onPress, ...props }: React.ComponentProps<typeof Button>) {
  const close = useContext(DialogCloseContext);
  return <Button onPress={(event) => { onPress?.(event); close?.(); }} {...props} />;
}

export function DialogContent({ className, children, showCloseButton = true, ...props }: AriaDialogProps & { showCloseButton?: boolean }) {
  return <Modal className="w-full max-w-md outline-none">
    <AriaDialog data-slot="dialog-content" className={cn("relative grid max-h-[calc(100dvh-2rem)] gap-4 overflow-y-auto rounded-xl bg-background p-5 text-foreground shadow-xl outline-none", className)} {...props}>
      {({ close }) => <DialogCloseContext.Provider value={close}>
        {typeof children === "function" ? children({ close }) : children}
        {showCloseButton && <DialogClose aria-label="Cerrar diálogo" variant="ghost" size="icon" className="absolute top-2 right-2">×</DialogClose>}
      </DialogCloseContext.Provider>}
    </AriaDialog>
  </Modal>;
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}
export function DialogTitle({ className, ...props }: React.ComponentProps<typeof Heading>) {
  return <Heading slot="title" className={cn("text-base font-semibold", className)} {...props} />;
}
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text slot="description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
