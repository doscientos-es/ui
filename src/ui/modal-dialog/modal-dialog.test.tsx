import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModalDialog } from "./modal-dialog";

describe("ModalDialog", () => {
  it("provides labelled dialog semantics, an optional footer and an accessible close action", () => {
    const onOpenChange = vi.fn();

    render(
      <ModalDialog
        open
        onOpenChange={onOpenChange}
        title="Enviar factura"
        description="El cliente recibirá un enlace seguro."
        footer={<button type="button">Enviar</button>}
      >
        <p>Mensaje opcional</p>
      </ModalDialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(screen.getByRole("heading", { name: "Enviar factura" })).toBeTruthy();
    expect(screen.getByText("El cliente recibirá un enlace seguro.")).toBeTruthy();
    expect(screen.getByText("Mensaje opcional")).toBeTruthy();
    expect(screen.getByText("Enviar").closest("footer")?.dataset.slot).toBe("modal-dialog-footer");
    expect(dialog.parentElement?.className).toContain("w-[min(calc(100dvw-2rem),24rem)]");

    fireEvent.click(screen.getByRole("button", { name: "Cerrar diálogo" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});