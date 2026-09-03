/**
 * Oversized horizontal ticker. The track holds the phrase list twice and
 * slides exactly -50%, so the loop is seamless. Type is set large enough to
 * crop at both edges, which is what makes it read as a band of motion
 * rather than a line of text.
 */
export function Marquee({
  text,
  seconds = 95,
  repeat = 4,
}: {
  text: string;
  seconds?: number;
  repeat?: number;
}) {
  const Track = () => (
    <>
      {Array.from({ length: repeat }, (_, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap font-display text-[17vw] font-medium uppercase leading-[0.95] tracking-[-0.03em]">
            {text}
          </span>
          <span aria-hidden="true" className="mx-[2.5vw] text-[7vw] text-accent">
            ✳
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className="relative w-full overflow-hidden" aria-label={text}>
      <div
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
        style={{ animationDuration: `${seconds}s` }}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
}
