import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectList, SelectTrigger, SelectValue } from "./select";

const priorities = [
  { id: "low", name: "Baja" },
  { id: "medium", name: "Media" },
  { id: "high", name: "Alta" },
];

const meta = { title: "Components/Forms/Select", component: Select } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [selectedKey, setSelectedKey] = useState("medium");
    return <Select aria-label="Prioridad" selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(String(key ?? "medium"))} className="w-72">
      <SelectTrigger><SelectValue /></SelectTrigger>
      <SelectContent><SelectList items={priorities}>{(priority) => <SelectItem id={priority.id} textValue={priority.name}>{priority.name}</SelectItem>}</SelectList></SelectContent>
    </Select>;
  },
};
