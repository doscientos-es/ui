import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Toast, ToastProvider, toast } from "./toast";
const meta = { title: "Application/Toast", component: Toast } satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() { return <div className="flex gap-2"><Button onPress={() => toast.success("Cambios guardados", { description: "El cliente se ha actualizado." })}>Éxito</Button><Button variant="outline" onPress={() => toast.error("No se ha podido guardar", { description: "Revisa los campos e inténtalo de nuevo." })}>Error</Button></div>; }
export const Default: Story = { args: { id: "story", title: "Cambios guardados", description: "El cliente se ha actualizado.", variant: "success", state: "open", duration: 0 }, render: () => <ToastProvider><Demo /></ToastProvider> };
export const Action: Story = { args: { id: "action", title: "Contrato archivado", state: "open", duration: 0 }, render: () => <ToastProvider><Button onPress={() => toast.success("Contrato archivado", { action: { label: "Deshacer", onPress: () => toast.info("Acción deshecha") } })}>Mostrar acción</Button></ToastProvider> };
export const PromiseToast: Story = { args: { id: "promise", title: "Guardando…", state: "open", duration: 0 }, render: () => <ToastProvider><Button onPress={() => toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), { loading: "Guardando…", success: "Guardado correctamente", error: "No se ha podido guardar" })}>Guardar</Button></ToastProvider> };
