import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocPreview } from "./doc-preview";

describe("DocPreview", () => {
  it("explains when a signed URL is unavailable", () => {
    render(<DocPreview url={null} mimeType="application/pdf" name="factura.pdf" />);

    expect(screen.getByText("No se pudo generar la URL de preview.")).toBeTruthy();
  });

  it("renders images without coupling to an application image loader", () => {
    render(<DocPreview url="https://example.com/logo.png" mimeType="image/png" name="Logo" />);

    expect(screen.getByRole("img", { name: "Logo" })).toBeTruthy();
  });
});