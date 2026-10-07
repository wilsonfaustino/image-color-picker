import { describe, expect, it } from "vitest";
import { clientToImageCoords, toHex } from "./color";

describe("toHex", () => {
  it("pads channels and uppercases", () => {
    expect(toHex(0, 10, 255)).toBe("#000AFF");
    expect(toHex(161, 178, 195)).toBe("#A1B2C3");
  });
});

describe("clientToImageCoords", () => {
  const rect = { left: 100, top: 50, width: 600, height: 400 };

  it("scales display coords to natural image size", () => {
    expect(clientToImageCoords(400, 250, rect, 1200, 800)).toEqual({ x: 600, y: 400 });
  });

  it("clamps the right and bottom edge to the last pixel", () => {
    expect(clientToImageCoords(700, 450, rect, 1200, 800)).toEqual({ x: 1199, y: 799 });
  });

  it("clamps negative offsets to 0", () => {
    expect(clientToImageCoords(90, 40, rect, 1200, 800)).toEqual({ x: 0, y: 0 });
  });
});
