import type * as React from "react";
import { Button } from "../button/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../dialog/dialog";

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
};

/** Controlled confirmation dialog for irreversible actions. */
export function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Confirmar", cancelLabel = "Cancelar", destructive = false, pending = false, onConfirm }: ConfirmDialogProps) {
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent showCloseButton={false}>
      <DialogHeader><DialogTitle>{title}</DialogTitle>{description && <DialogDescription>{description}</DialogDescription>}</DialogHeader>
      <DialogFooter>
        <Button variant="outline" isDisabled={pending} onPress={() => onOpenChange(false)}>{cancelLabel}</Button>
        <Button variant={destructive ? "destructive" : "default"} isDisabled={pending} onPress={onConfirm}>{confirmLabel}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
