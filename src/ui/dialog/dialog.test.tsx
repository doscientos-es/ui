import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

describe("Dialog", () => {
  it("opens from an asChild trigger and closes from an asChild action", () => {
    render(
      <Dialog>
        <DialogTrigger asChild><button type="button">Abrir</button></DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader><DialogTitle>Editar cliente</DialogTitle><DialogDescription>Actualiza sus datos.</DialogDescription></DialogHeader>
          <DialogFooter><DialogClose asChild><button type="button">Cancelar</button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog", { name: "Editar cliente" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("notifies controlled consumers when its close button is pressed", () => {
    const onOpenChange = vi.fn();
    render(<Dialog open onOpenChange={onOpenChange}><DialogContent><DialogTitle>Enviar factura</DialogTitle></DialogContent></Dialog>);

    fireEvent.click(screen.getByRole("button", { name: "Cerrar diálogo" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});