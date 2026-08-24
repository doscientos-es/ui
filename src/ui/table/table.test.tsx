import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

describe("Table", () => {
  it("preserves native table semantics and regions", () => {
    render(
      <Table>
        <TableCaption>Facturas recientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Acme</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total: 1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );
    expect(screen.getByRole("table", { name: "Facturas recientes" })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Cliente" })).toBeTruthy();
    expect(screen.getByText("Total: 1").closest("tfoot")?.getAttribute("data-slot")).toBe(
      "table-footer",
    );
  });
});
