import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button/button";
import { ModalDialog } from "./modal-dialog";

const meta = {
  title: "Components/Overlays/Modal Dialog",
  component: ModalDialog,
  args: { open: false, onOpenChange: () => undefined, title: "Diálogo" },
} satisfies Meta<typeof ModalDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithDescriptionAndFooter: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onPress={() => setOpen(true)}>Enviar factura</Button>
        <ModalDialog
          open={open}
          onOpenChange={setOpen}
          title="Enviar factura al cliente"
          description="El cliente recibirá un enlace seguro para consultar la factura."
          footer={<Button onPress={() => setOpen(false)}>Enviar</Button>}
        >
          <p className="text-sm text-muted-foreground">Puedes añadir un mensaje personal antes del envío.</p>
        </ModalDialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole("button", { name: "Enviar factura" });

    await userEvent.click(trigger);
    await waitFor(() => expect(page.getByRole("dialog", { name: "Enviar factura al cliente" })).toBeVisible());
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("dialog", { name: "Enviar factura al cliente" })).not.toBeInTheDocument());
    await expect(trigger).toHaveFocus();
  },
};
