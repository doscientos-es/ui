import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../button/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
describe("DropdownMenu", () => { it("opens and exposes menu items", async () => { const user = userEvent.setup(); render(<DropdownMenuTrigger><Button>Acciones</Button><DropdownMenuContent><DropdownMenu><DropdownMenuItem id="edit">Editar</DropdownMenuItem></DropdownMenu></DropdownMenuContent></DropdownMenuTrigger>); await user.click(screen.getByRole("button", { name: "Acciones" })); expect(await screen.findByRole("menuitem", { name: "Editar" })).toBeTruthy(); }); });
