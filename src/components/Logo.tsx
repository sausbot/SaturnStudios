// Original mark for Saturn Studios: an eight-spoke asterisk with round caps.
// Single currentColor, so it inverts cleanly on dark grounds.
//
// `weight` is the spoke stroke width in a 32-unit viewBox.
// `open` lifts the spokes off the centre — worth turning on above ~2.4,
// where the eight round caps otherwise merge into a solid dot.
const SPOKES = 8;
const OUTER = 13;

export function Mark({
  className = "h-6 w-6",
  weight = 2,
  open = false,
}: {
  className?: string;
  weight?: number;
  open?: boolean;
}) {
  const inner = open ? 3.2 : 0;

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      {Array.from({ length: SPOKES }, (_, i) => {
        const a = ((i * 360) / SPOKES) * (Math.PI / 180);
        const sin = Math.sin(a);
        const cos = Math.cos(a);
        return (
          <line
            key={i}
            x1={16 + sin * inner}
            y1={16 - cos * inner}
            x2={16 + sin * OUTER}
            y2={16 - cos * OUTER}
            stroke="currentColor"
            strokeWidth={weight}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-black ${className}`}>
      <Mark className="h-[21px] w-[21px] shrink-0" weight={2} />
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.09em]">
        Saturn Studios
      </span>
    </span>
  );
}
