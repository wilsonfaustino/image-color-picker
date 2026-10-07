import { useState } from "react";
import { ImageColorPicker } from "./components/ImageColorPicker";
import { PaletteSlots } from "./components/PaletteSlots";
import "./App.css";

const SLOT_COUNT = 4;
type Slot = string | null; // hex or empty

function App() {
  const [slots, setSlots] = useState<Slot[]>(Array<Slot>(SLOT_COUNT).fill(null));
  const [activeIndex, setActiveIndex] = useState(0);

  function handlePick(hex: string) {
    const nextSlots = slots.map((slot, index) => (index === activeIndex ? hex : slot));
    setSlots(nextSlots);
    const nextEmptyIndex = [...Array(SLOT_COUNT).keys()]
      .map((offset) => (activeIndex + 1 + offset) % SLOT_COUNT)
      .find((index) => nextSlots[index] === null);
    setActiveIndex(nextEmptyIndex ?? (activeIndex + 1) % SLOT_COUNT);
  }

  function handleClear(clearedIndex: number) {
    setSlots(slots.map((slot, index) => (index === clearedIndex ? null : slot)));
    setActiveIndex(clearedIndex);
  }

  return (
    <main className="app">
      <ImageColorPicker src="/sample.jpg" onPick={handlePick} />
      <PaletteSlots
        slots={slots}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        onClear={handleClear}
      />
    </main>
  );
}

export default App;
