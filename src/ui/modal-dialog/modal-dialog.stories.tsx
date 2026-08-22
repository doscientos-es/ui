import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/button";
import { ModalDialog } from "./modal-dialog";

const meta = { title: "Components/Overlays/ModalDialog" } satisfies Meta;
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
};