import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback } from "./avatar";
describe("Avatar", () => { it("renders fallback content", () => { render(<Avatar aria-label="Ana"><AvatarFallback>AN</AvatarFallback></Avatar>); expect(screen.getByText("AN")).toBeTruthy(); }); });
