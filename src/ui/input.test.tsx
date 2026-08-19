import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("forwards its ref to the native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Nombre" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});