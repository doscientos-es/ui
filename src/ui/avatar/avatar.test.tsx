import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders fallback content without an image", () => {
    render(<Avatar aria-label="Ana"><AvatarFallback>AN</AvatarFallback></Avatar>);
    expect(screen.getByText("AN")).toBeTruthy();
  });

  it("hides the fallback after the image loads", () => {
    render(<Avatar><AvatarImage src="/ana.jpg" alt="Ana" /><AvatarFallback>AN</AvatarFallback></Avatar>);
    fireEvent.load(screen.getByRole("img", { name: "Ana" }));
    expect(screen.queryByText("AN")).toBeNull();
  });

  it("shows the fallback when the image fails", () => {
    render(<Avatar><AvatarImage src="/missing.jpg" alt="Ana" /><AvatarFallback>AN</AvatarFallback></Avatar>);
    fireEvent.error(screen.getByRole("img", { name: "Ana" }));
    expect(screen.queryByRole("img", { name: "Ana" })).toBeNull();
    expect(screen.getByText("AN")).toBeTruthy();
  });
});
