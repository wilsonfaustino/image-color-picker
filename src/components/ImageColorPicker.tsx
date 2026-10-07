import { useEffect, useRef, useState, type PointerEvent } from "react";
import { clientToImageCoords, toHex } from "../lib/color";

type Props = { src: string; onPick: (hex: string) => void };

export function ImageColorPicker({ src, onPick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [hoverHex, setHoverHex] = useState<string | null>(null);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // remote images without CORS headers taint the canvas
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0);
      contextRef.current = context;
    };
    image.src = src;
  }, [src]);

  const colorAt = (event: PointerEvent<HTMLCanvasElement>): string | null => {
    const context = contextRef.current;
    if (!context) return null;
    const canvas = event.currentTarget;
    const { x, y } = clientToImageCoords(
      event.clientX,
      event.clientY,
      canvas.getBoundingClientRect(),
      canvas.width,
      canvas.height,
    );
    const [red, green, blue] = context.getImageData(x, y, 1, 1).data;
    return toHex(red, green, blue);
  };

  return (
    <div className="picker">
      <canvas
        ref={canvasRef}
        className="picker-canvas"
        onPointerMove={(event) => setHoverHex(colorAt(event))}
        onPointerLeave={() => setHoverHex(null)}
        onPointerDown={(event) => {
          const hex = colorAt(event);
          if (hex) onPick(hex);
        }}
      />
      <div className="picker-preview">
        <span className="swatch" style={{ background: hoverHex ?? "transparent" }} />
        <code>{hoverHex ?? "Hover the image"}</code>
      </div>
    </div>
  );
}
