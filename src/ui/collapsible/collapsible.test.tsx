import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

describe("Collapsible", () => {
  it("toggles its content from an asChild trigger", async () => {
    const user = userEvent.setup();
    render(<Collapsible><CollapsibleTrigger asChild><button type="button">Detalles</button></CollapsibleTrigger><CollapsibleContent>Contenido</CollapsibleContent></Collapsible>);

    await user.click(screen.getByRole("button", { name: "Detalles" }));
    expect(screen.getByText("Contenido")).toBeTruthy();
  });
});