export const toHex = (red: number, green: number, blue: number): string =>
  "#" +
  [red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

// Canvas is drawn at natural size and scaled down by CSS.
// Map screen coordinates back to image pixels and clamp to bounds.
export function clientToImageCoords(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
  imgWidth: number,
  imgHeight: number,
): { x: number; y: number } {
  const x = Math.floor(((clientX - rect.left) / rect.width) * imgWidth);
  const y = Math.floor(((clientY - rect.top) / rect.height) * imgHeight);
  return {
    x: Math.max(0, Math.min(imgWidth - 1, x)),
    y: Math.max(0, Math.min(imgHeight - 1, y)),
  };
}
