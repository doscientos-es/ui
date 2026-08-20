import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { AutocompleteCombobox, Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, HighlightMatch } from "./combobox";

const fruits = ["Manzana", "Mandarina", "Melocotón", "Pera", "Plátano"].map((name) => ({ id: name.toLowerCase(), name }));
const meta = { title: "Components/Forms/Combobox", tags: ["test:ui"] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Suggestions: Story = {
  render: function Render() {
    const [query, setQuery] = useState("");
    const matchingFruits = fruits.filter((fruit) => fruit.name.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es")));

    return <Combobox aria-label="Buscar fruta" items={matchingFruits} inputValue={query} onInputChange={setQuery} onSelectionChange={(key) => {
      const selectedFruit = fruits.find((fruit) => fruit.id === key);
      if (selectedFruit) setQuery(selectedFruit.name);
    }} autoFocus>
      <ComboboxInput aria-label="Buscar fruta" placeholder="Busca una fruta…" className="w-80" />
      <ComboboxContent>
        <ComboboxList<{ id: string; name: string }> emptyState={<p className="px-3 py-7 text-center text-sm text-muted-foreground">No hay sugerencias.</p>}>{(fruit) => <ComboboxItem id={fruit.id} textValue={fruit.name}><HighlightMatch text={fruit.name} query={query} /></ComboboxItem>}</ComboboxList>
      </ComboboxContent>
    </Combobox>;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Buscar fruta" });

    await userEvent.click(input);
    await userEvent.type(input, "melo");

    const listbox = within(canvasElement.ownerDocument.body);
    await expect(listbox.getByRole("option", { name: "Melocotón" })).toBeVisible();
    await expect(listbox.queryByRole("option", { name: "Manzana" })).not.toBeInTheDocument();

    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("Melocotón");
  },
};

const users = [{ id: "ana", name: "Ana García", email: "ana@doscientos.com", role: "Administración" }, { id: "bruno", name: "Bruno López", email: "bruno@doscientos.com", role: "Ventas" }, { id: "carla", name: "Carla Martín", email: "carla@doscientos.com", role: "Operaciones" }];
export const EntitySearch: Story = { render: () => <div className="w-96"><AutocompleteCombobox aria-label="Asignar responsable" label="Responsable" description="Escribe un nombre, email o usa las flechas para navegar." placeholder="Busca una persona…" items={users} getItemKey={(user) => user.id} getItemLabel={(user) => user.name} renderItem={(user, query) => <div className="flex min-w-0 items-center gap-2"><div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">{user.name.split(" ").map((part) => part[0]).join("")}</div><div className="min-w-0"><p className="truncate font-medium"><HighlightMatch text={user.name} query={query} /></p><p className="truncate text-xs text-muted-foreground">{user.email} · {user.role}</p></div></div>} /></div> };
const contracts = [{ id: "1", number: "CON-2026-001", price: "1.250,00 €" }, { id: "2", number: "CON-2026-014", price: "4.800,00 €" }, { id: "3", number: "CON-2025-088", price: "950,00 €" }];
export const ContractSearch: Story = { render: () => <div className="w-96"><AutocompleteCombobox aria-label="Contrato" label="Contrato" placeholder="Número de contrato…" items={contracts} getItemKey={(contract) => contract.id} getItemLabel={(contract) => contract.number} renderItem={(contract, query) => <div className="flex w-full items-center justify-between gap-4"><HighlightMatch text={contract.number} query={query} /><span className="text-xs text-muted-foreground">{contract.price}</span></div>} /></div> };
