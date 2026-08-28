"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
  Text,
} from "react-aria-components";
import { cn } from "../../lib/cn";
import { Button } from "../button/button";

type DialogContextValue = { open: boolean; setOpen: (open: boolean) => void };
type SlottableProps = React.HTMLAttributes<HTMLElement> & { "data-slot"?: string };
const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("Dialog components must be rendered within Dialog.");
  return context;
}

type DialogProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

function Dialog({ children, defaultOpen = false, onOpenChange, open: controlledOpen }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange],
  );

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

type DialogTriggerProps = Omit<React.ComponentProps<typeof Button>, "onPress"> & { asChild?: boolean };

function DialogTrigger({ asChild = false, children, onClick, ...props }: DialogTriggerProps) {
  const { setOpen } = useDialogContext();
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(true);
  };

  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>;
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      "data-slot": "dialog-trigger",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event);
        handleClick(event);
      },
    });
  }

  return (
    <Button data-slot="dialog-trigger" onPress={() => setOpen(true)} {...props}>
      {children}
    </Button>
  );
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

type DialogOverlayProps = Omit<ModalOverlayProps, "children" | "className" | "isOpen" | "onOpenChange"> & {
  children?: React.ReactNode;
  className?: string;
};

function DialogOverlay({ children, className, ...props }: DialogOverlayProps) {
  const { open, setOpen } = useDialogContext();
  if (!open) return null;

  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      isDismissable
      isOpen={open}
      onOpenChange={setOpen}
      className={cn(
        "fixed inset-0 isolate z-50 grid place-items-center bg-black/10 p-4 duration-100 supports-backdrop-filter:backdrop-blur-xs data-entering:animate-ui-overlay-in data-exiting:animate-ui-overlay-out",
        className,
      )}
      {...props}
    >
      {children}
    </ModalOverlay>
  );
}

type DialogContentProps = Omit<React.ComponentProps<typeof AriaDialog>, "children" | "className"> & {
  children?: React.ReactNode;
  className?: string;
  onOverlayClick?: React.MouseEventHandler<HTMLDivElement>;
  showCloseButton?: boolean;
};

function DialogContent({
  children,
  className,
  onOverlayClick,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { setOpen } = useDialogContext();

  return (
    <DialogPortal>
      <DialogOverlay
        onClick={(event) => {
          if (event.target === event.currentTarget) onOverlayClick?.(event);
        }}
      >
        <Modal
          className={cn(
            "w-full max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] outline-none sm:max-w-sm",
            className,
          )}
        >
          <AriaDialog
            data-slot="dialog-content"
            className={cn(
              "grid max-h-[calc(100dvh-2rem)] gap-4 overflow-y-auto rounded-xl bg-background p-4 text-sm text-foreground ring-1 ring-foreground/10 outline-none",
              className,
            )}
            {...props}
          >
            {children}
            {showCloseButton ? (
              <Button
                aria-label="Cerrar diálogo"
                data-slot="dialog-close"
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
                onPress={() => setOpen(false)}
              >
                <XIcon />
              </Button>
            ) : null}
          </AriaDialog>
        </Modal>
      </DialogOverlay>
    </DialogPortal>
  );
}

type DialogCloseProps = Omit<React.ComponentProps<typeof Button>, "onPress"> & { asChild?: boolean };

function DialogClose({ asChild = false, children, onClick, ...props }: DialogCloseProps) {
  const { setOpen } = useDialogContext();
  if (asChild && React.isValidElement<SlottableProps>(children)) {
    const child = children as React.ReactElement<SlottableProps>;
    return React.cloneElement(child, {
      ...(props as React.HTMLAttributes<HTMLElement>),
      "data-slot": "dialog-close",
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        child.props.onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      },
    });
  }

  return (
    <Button data-slot="dialog-close" onPress={() => setOpen(false)} {...props}>
      {children}
    </Button>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function DialogFooter({ className, showCloseButton = false, children, ...props }: React.ComponentProps<"div"> & { showCloseButton?: boolean }) {
  return (
    <div data-slot="dialog-footer" className={cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:flex-wrap sm:justify-end", className)} {...props}>
      {children}
      {showCloseButton ? <DialogClose variant="outline">Cerrar</DialogClose> : null}
    </div>
  );
}

function DialogTitle({ className, ...props }: Omit<React.ComponentProps<typeof Heading>, "slot">) {
  return <Heading slot="title" data-slot="dialog-title" className={cn("font-heading text-base leading-none font-medium", className)} {...props} />;
}

function DialogDescription({ className, ...props }: Omit<React.ComponentProps<typeof Text>, "slot">) {
  return <Text slot="description" data-slot="dialog-description" className={cn("text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className)} {...props} />;
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger };
