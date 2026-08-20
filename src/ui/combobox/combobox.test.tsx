import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AutocompleteCombobox } from "./combobox";
const users = [{ id: "1", name: "Ana García", email: "ana@doscientos.com" }, { id: "2", name: "Bruno López", email: "bruno@doscientos.com" }];
describe("AutocompleteCombobox", () => {
  it("filters and renders custom items", async () => { const user = userEvent.setup(); render(<AutocompleteCombobox aria-label="Asignar usuario" items={users} getItemKey={(item) => item.id} getItemLabel={(item) => item.name} renderItem={(item) => <><strong>{item.name}</strong><span>{item.email}</span></>} />); const input = screen.getByRole("combobox", { name: "Asignar usuario" }); await user.type(input, "bruno"); expect(screen.getByRole("option", { name: /Bruno López/ })).toBeTruthy(); expect(screen.queryByRole("option", { name: /Ana García/ })).toBeNull(); });
  it("accepts the inline suggestion with Tab", async () => { const user = userEvent.setup(); render(<AutocompleteCombobox aria-label="Contrato" items={[{ id: "c-2026", label: "CON-2026-001" }]} getItemKey={(item) => item.id} getItemLabel={(item) => item.label} />); const input = screen.getByRole("combobox", { name: "Contrato" }); await user.type(input, "con-2026"); await user.tab(); expect(input.getAttribute("value")).toBe("CON-2026-001"); });
});
