import type * as React from "react";
import { Button } from "../button/button";
import { ModalDialog } from "../modal-dialog/modal-dialog";

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
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = false,
  pending = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      showCloseButton={false}
      footer={
        <>
          <Button variant="outline" isDisabled={pending} onPress={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button variant={destructive ? "destructive" : "default"} isDisabled={pending} onPress={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
