import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
describe("Accordion", () => { it("opens content with keyboard interaction", async () => { const user = userEvent.setup(); render(<Accordion><AccordionItem><AccordionTrigger>Detalles</AccordionTrigger><AccordionContent>Contenido</AccordionContent></AccordionItem></Accordion>); const trigger = screen.getByRole("button", { name: "Detalles" }); await user.click(trigger); expect(screen.getByText("Contenido").getAttribute("data-visible") !== "false").toBe(true); }); });
