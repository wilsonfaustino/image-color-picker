type Props = {
  slots: (string | null)[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onClear: (index: number) => void;
};

export function PaletteSlots({ slots, activeIndex, onSelect, onClear }: Props) {
  return (
    <ul className="slots">
      {slots.map((hex, index) => (
        <li key={index} className={index === activeIndex ? "slot slot-active" : "slot"}>
          <button
            type="button"
            className={hex ? "slot-swatch" : "slot-swatch slot-empty"}
            style={{ background: hex ?? "transparent" }}
            aria-label={`Select slot ${index + 1}`}
            aria-pressed={index === activeIndex}
            onClick={() => onSelect(index)}
          >
            {hex ? null : "Empty"}
          </button>
          {hex && (
            <div className="slot-info">
              <code>{hex}</code>
              <button type="button" onClick={() => navigator.clipboard.writeText(hex)}>
                Copy
              </button>
              <button type="button" onClick={() => onClear(index)}>
                Clear
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
