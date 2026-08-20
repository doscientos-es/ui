import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Switch } from "./switch";

describe("Switch", () => {
  it("keeps accessible switch semantics and supports keyboard interaction", async () => {
    const user = userEvent.setup();
    render(<Switch>Activar notificaciones</Switch>);

    const switchControl = screen.getByRole("switch", { name: "Activar notificaciones" });
    expect(switchControl).toHaveProperty("checked", false);

    await user.click(switchControl);
    expect(switchControl).toHaveProperty("checked", true);

    await user.keyboard(" ");
    expect(switchControl).toHaveProperty("checked", false);
  });

  it("does not allow interaction when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Switch isDisabled defaultSelected>
        Función activa
      </Switch>,
    );

    const switchControl = screen.getByRole("switch", { name: "Función activa" });
    expect(switchControl).toHaveProperty("disabled", true);
    expect(switchControl).toHaveProperty("checked", true);

    await user.click(switchControl);
    expect(switchControl).toHaveProperty("checked", true);
  });
});
