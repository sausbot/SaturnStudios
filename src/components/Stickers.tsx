/**
 * Original sticker artwork, drawn as inline SVG.
 *
 * TO USE YOUR OWN IMAGES: drop files into `public/stickers/` and set `src`
 * on a sticker below (e.g. src: "/stickers/my-photo.png"). When `src` is
 * present the board renders that image and ignores `shape`. Use `frame:
 * "photo"` for a white polaroid-style border, or "none" for a cut-out.
 */

export type Shape =
  | "asterisk"
  | "smiley"
  | "badge"
  | "eye"
  | "orbits"
  | "squiggle"
  | "sparkle"
  | "blob"
  | "arch";

export type StickerDef = {
  id: string;
  shape?: Shape;
  src?: string;
  bg: string;
  fg: string;
  frame: "photo" | "none";
  size: number; // px width
  aspect?: number; // w/h, defaults to square
  x: number;
  y: number;
  rot: number;
  round: boolean;
  layer: "back" | "front"; // behind or in front of the scrolling type
};

const ORANGE = "#f4531f";
const CREAM = "#f7f4ee";
const INK = "#14161c";

// Placeholder comp art from public/stickers. `aspect` is the file's real
// w/h so the wide ones don't get letterboxed into a square.
export const STICKERS: StickerDef[] = [
  { id: "island", layer: "back",   src: "/stickers/island.jpg",   bg: CREAM, fg: INK, frame: "photo", size: 186, aspect: 1.55, x: 7,  y: 41, rot: -4, round: false },
  { id: "eye", layer: "front",      src: "/stickers/eye.jpg",      bg: CREAM, fg: INK, frame: "photo", size: 132, aspect: 0.66, x: 18, y: 76, rot: 3,  round: false },
  { id: "smiley", layer: "front",   src: "/stickers/smiley.png",   bg: "transparent", fg: INK, frame: "none", size: 112, aspect: 0.99, x: 13, y: 27, rot: -9, round: false },
  { id: "graphic", layer: "back",  src: "/stickers/graphic.png",  bg: "transparent", fg: INK, frame: "none", size: 124, aspect: 1,    x: 44, y: 20, rot: 6,  round: false },
  { id: "monogram", layer: "front", src: "/stickers/monogram.png", bg: "transparent", fg: INK, frame: "none", size: 148, aspect: 2.60, x: 66, y: 13, rot: 5,  round: false },
  { id: "badge", layer: "front",    src: "/stickers/badge.png",    bg: "transparent", fg: INK, frame: "none", size: 196, aspect: 1.04, x: 77, y: 53, rot: 9,  round: false },
  { id: "dolmen", layer: "back",   src: "/stickers/dolmen.png",   bg: "transparent", fg: INK, frame: "none", size: 146, aspect: 1.18, x: 91, y: 33, rot: -6, round: false },
  { id: "wordmark", layer: "back", src: "/stickers/wordmark.png", bg: "transparent", fg: INK, frame: "none", size: 208, aspect: 2.38, x: 57, y: 84, rot: -4, round: false },
  { id: "asterisk", layer: "front", shape: "asterisk", bg: ORANGE, fg: CREAM, frame: "none", size: 88, x: 34, y: 62, rot: -12, round: true },
];

export function ShapeArt({ shape, fg, id }: { shape: Shape; fg: string; id: string }) {
  const line = { stroke: fg, strokeWidth: 3, fill: "none", strokeLinecap: "round" } as const;

  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      {shape === "asterisk" &&
        Array.from({ length: 8 }, (_, i) => {
          const a = ((i * 360) / 8) * (Math.PI / 180);
          return (
            <line
              key={i}
              x1={32}
              y1={32}
              x2={32 + Math.sin(a) * 22}
              y2={32 - Math.cos(a) * 22}
              stroke={fg}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
          );
        })}

      {shape === "smiley" && (
        <>
          <circle cx="24" cy="25" r="4" fill={fg} />
          <circle cx="41" cy="25" r="4" fill={fg} />
          <path d="M20 38 Q32 50 45 38" {...line} strokeWidth={4.5} />
        </>
      )}

      {shape === "badge" && (
        <>
          <defs>
            <path id={`arc-${id}`} d="M32 32 m-23 0 a23 23 0 1 1 46 0 a23 23 0 1 1 -46 0" fill="none" />
          </defs>
          <text
            fill={fg}
            fontSize="7.4"
            fontWeight="700"
            letterSpacing="1.1"
            fontFamily="var(--font-display), sans-serif"
          >
            <textPath href={`#arc-${id}`} startOffset="0">
              SATURN STUDIOS · EXPERIMENTAL ART ·
            </textPath>
          </text>
          <text
            x="32"
            y="30"
            textAnchor="middle"
            fill={fg}
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-display), sans-serif"
          >
            COMING
          </text>
          <text
            x="32"
            y="40"
            textAnchor="middle"
            fill={fg}
            fontSize="8.5"
            fontWeight="700"
            fontFamily="var(--font-display), sans-serif"
          >
            SOON
          </text>
        </>
      )}

      {shape === "eye" && (
        <>
          <path d="M6 32 Q32 10 58 32 Q32 54 6 32 Z" fill="#fdfcf9" stroke={fg} strokeWidth={2.4} />
          <circle cx="32" cy="32" r="12" fill="#3f6f74" />
          <circle cx="32" cy="32" r="5.5" fill={fg} />
          <circle cx="28" cy="28" r="2.2" fill="#fff" />
        </>
      )}

      {shape === "orbits" && (
        <>
          <circle cx="32" cy="32" r="6.5" fill={fg} />
          <circle cx="32" cy="32" r="15" {...line} strokeWidth={2.6} />
          <circle cx="32" cy="32" r="23" {...line} strokeWidth={2.6} />
        </>
      )}

      {shape === "squiggle" && (
        <path d="M8 42 Q18 16 30 34 T52 26" {...line} strokeWidth={7} />
      )}

      {shape === "sparkle" && (
        <path d="M32 4 Q34 30 60 32 Q34 34 32 60 Q30 34 4 32 Q30 30 32 4 Z" fill={fg} />
      )}

      {shape === "blob" && (
        <path
          d="M32 7 C47 7 57 19 55 34 C53 48 42 57 29 56 C16 55 7 44 8 30 C9 17 18 7 32 7 Z"
          fill={fg}
        />
      )}

      {shape === "arch" && (
        <>
          <path d="M14 54 V30 A18 18 0 0 1 50 30 V54" fill={fg} />
          <rect x="8" y="52" width="48" height="5" rx="2.5" fill={fg} />
        </>
      )}
    </svg>
  );
}
