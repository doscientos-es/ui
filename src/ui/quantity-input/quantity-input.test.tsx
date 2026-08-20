import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { QuantityInput } from "./quantity-input";

describe("QuantityInput", () => {
  it("changes the value with its stepper buttons and respects limits", async () => {
    const user = userEvent.setup();
    render(<QuantityInput aria-label="Instancias" defaultValue={1} minValue={0} maxValue={2} />);

    const input = screen.getByRole("textbox", { name: "Instancias" }) as HTMLInputElement;
    const decrement = screen.getByRole("button", { name: "Disminuir cantidad" });
    const increment = screen.getByRole("button", { name: "Aumentar cantidad" });

    await user.click(decrement);
    expect(input.value).toBe("0");
    expect(decrement).toHaveProperty("disabled", true);

    await user.click(increment);
    await user.click(increment);
    expect(input.value).toBe("2");
    expect(increment).toHaveProperty("disabled", true);
  });

  it("supports ArrowUp and ArrowDown on the numeric input", async () => {
    const user = userEvent.setup();
    render(<QuantityInput aria-label="Instancias" defaultValue={2} step={2} />);

    const input = screen.getByRole("textbox", { name: "Instancias" }) as HTMLInputElement;
    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(input.value).toBe("4");
    await user.keyboard("{ArrowDown}");
    expect(input.value).toBe("2");
  });
});
