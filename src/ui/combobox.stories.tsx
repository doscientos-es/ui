import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, HighlightMatch } from "./combobox";

const fruits = ["Manzana", "Mandarina", "Melocotón", "Pera", "Plátano"].map((name) => ({ id: name.toLowerCase(), name }));
const meta = { title: "Forms/Combobox", tags: ["test:ui"] } satisfies Meta;
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
