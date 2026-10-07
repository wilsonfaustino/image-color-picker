# Image color picker

A small proof of concept that picks colors from an image. It is a reduced version of the "pick colors from an image" tool on coolors.co.

The page shows one preloaded image and 4 palette slots. Click the image to put the color under the pointer into the active slot.

## How it works

- Move the pointer over the image to see a live swatch and the hex value of the pixel under it.
- Click (or tap) the image to fill the active slot. The active slot then moves to the next empty slot. When all slots are full, it moves to the next slot in order and wraps from 4 to 1.
- Click a slot to make it active, so the next pick replaces that color.
- Each filled slot has a Copy button (puts the uppercase hex, for example `#A1B2C3`, on the clipboard) and a Clear button (empties the slot and makes it active).

The app draws the image on a canvas at its natural size, and CSS scales the canvas down. It maps pointer coordinates back to image pixels and reads the color with `getImageData`. There are no runtime dependencies other than `react` and `react-dom`.

## Run it

```sh
bun install
bun run dev
```

Other scripts:

| Script | Action |
|---|---|
| `bun run build` | Type-check with `tsc -b`, then build with Vite |
| `bun run test` | Run the Vitest tests for the color helpers |
| `bun run lint` | Run oxlint |
| `bun run preview` | Serve the production build |

## Project structure

```
src/
  lib/color.ts                    toHex, clientToImageCoords
  lib/color.test.ts               tests for the helpers, including edge clamping
  components/ImageColorPicker.tsx canvas, hover preview, emits onPick(hex)
  components/PaletteSlots.tsx     the 4 slots, active state, copy and clear
  App.tsx                         slot state and pick logic
public/
  sample.jpg                      preloaded image
```

## Notes

- The image is in `public/`, so it has the same origin as the page. A remote image without an `Access-Control-Allow-Origin` header taints the canvas, and `getImageData` then throws a `SecurityError`.
- `navigator.clipboard` needs a secure context. `localhost` is secure.

## Out of scope

Automatic palette extraction, a zoom loupe, image upload, export, persistence and the native EyeDropper API.

## Image credit

`public/sample.jpg` is a [photo by veeterzy on Unsplash](https://unsplash.com/photos/OJJIaFZOeX4), downloaded through [Lorem Picsum](https://picsum.photos/id/1080/info) at 1200x800. The Unsplash license applies.
