"use client";

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { STICKERS, ShapeArt } from "./Stickers";

type Body = {
  x: number;
  y: number;
  hx: number; // home position, for the gentle drift back
  hy: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  pinned: boolean; // true once the user has dragged it, so it stays put
};

const FRICTION = 0.93;
const SPIN_FRICTION = 0.92;
const BOUNCE = -0.42;
const THROW = 0.85;
const CURSOR_RADIUS = 190; // px — how close the pointer gets before stickers scatter
const CURSOR_PUSH = 1.5; // px/frame² at point-blank range
const HOMING = 0.0016; // weak pull back to the original spot
const MAX_V = 2.2; // %/frame speed cap

/**
 * Positions live in refs and are written straight to the DOM each frame, so
 * neither dragging nor cursor scatter triggers a React render.
 *
 * Coordinates are percentages of the board so the arrangement survives a
 * resize; forces are computed in pixels and converted, so the repulsion
 * field stays circular rather than stretching with the viewport.
 */
export function StickerBoard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef<{ i: number; dx: number; dy: number; px: number; py: number } | null>(null);
  const cursor = useRef<{ x: number; y: number } | null>(null);
  const topZ = useRef(50);

  const bodies = useRef<Body[]>(
    STICKERS.map((s) => ({
      x: s.x,
      y: s.y,
      hx: s.x,
      hy: s.y,
      vx: 0,
      vy: 0,
      rot: s.rot,
      vr: 0,
      pinned: false,
    })),
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: PointerEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      cursor.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      const board = boardRef.current;
      const list = bodies.current;

      if (board && !reduced) {
        const rect = board.getBoundingClientRect();
        const c = cursor.current;

        for (let i = 0; i < list.length; i++) {
          if (drag.current?.i === i) continue;
          const b = list[i];

          // Scatter away from the pointer, falling off with distance.
          if (c) {
            const cx = rect.left + (b.x / 100) * rect.width;
            const cy = rect.top + (b.y / 100) * rect.height;
            const dx = cx - c.x;
            const dy = cy - c.y;
            const dist = Math.hypot(dx, dy);

            if (dist < CURSOR_RADIUS && dist > 0.001) {
              const f = (1 - dist / CURSOR_RADIUS) * CURSOR_PUSH;
              b.vx += (dx / dist) * f * (100 / rect.width);
              b.vy += (dy / dist) * f * (100 / rect.height);
              b.vr += (dx / dist) * f * 0.35;
            }
          }

          // Untouched stickers ease back toward where they started.
          if (!b.pinned) {
            b.vx += (b.hx - b.x) * HOMING;
            b.vy += (b.hy - b.y) * HOMING;
          }

          b.vx = Math.max(-MAX_V, Math.min(MAX_V, b.vx));
          b.vy = Math.max(-MAX_V, Math.min(MAX_V, b.vy));

          b.x += b.vx;
          b.y += b.vy;
          b.vx *= FRICTION;
          b.vy *= FRICTION;

          if (b.x < 4) (b.x = 4), (b.vx *= BOUNCE);
          if (b.x > 96) (b.x = 96), (b.vx *= BOUNCE);
          if (b.y < 8) (b.y = 8), (b.vy *= BOUNCE);
          if (b.y > 92) (b.y = 92), (b.vy *= BOUNCE);

          b.rot += b.vr;
          b.vr *= SPIN_FRICTION;

          if (Math.abs(b.vx) < 0.0015) b.vx = 0;
          if (Math.abs(b.vy) < 0.0015) b.vy = 0;
          if (Math.abs(b.vr) < 0.01) b.vr = 0;
        }
      }

      for (let i = 0; i < list.length; i++) {
        const el = nodes.current[i];
        if (!el) continue;
        const b = list[i];
        el.style.left = `${b.x}%`;
        el.style.top = `${b.y}%`;
        el.style.transform = `translate3d(-50%, -50%, 0) rotate(${b.rot}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>, i: number) => {
    const board = boardRef.current;
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const b = bodies.current[i];
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;

    drag.current = { i, dx: px - b.x, dy: py - b.y, px, py };
    b.vx = b.vy = b.vr = 0;
    b.pinned = true;

    topZ.current += 1;
    const el = nodes.current[i];
    if (el) {
      el.style.zIndex = String(topZ.current);
      el.style.cursor = "grabbing";
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const board = boardRef.current;
    if (!d || !board) return;

    const rect = board.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const b = bodies.current[d.i];

    b.vx = px - d.px;
    b.vy = py - d.py;
    b.vr = b.vx * 0.6;
    b.rot += b.vr;

    b.x = Math.min(96, Math.max(4, px - d.dx));
    b.y = Math.min(92, Math.max(8, py - d.dy));

    d.px = px;
    d.py = py;
  }, []);

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d) {
      const b = bodies.current[d.i];
      b.vx *= THROW;
      b.vy *= THROW;
      const el = nodes.current[d.i];
      if (el) el.style.cursor = "grab";
    }
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const renderSticker = (s: (typeof STICKERS)[number], i: number) => (
    <div
      key={s.id}
      ref={(el) => {
        nodes.current[i] = el;
      }}
      role="img"
      aria-label={`Draggable sticker`}
      onPointerDown={(e) => onPointerDown(e, i)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="pointer-events-auto absolute touch-none select-none will-change-transform"
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        zIndex: i + 1,
        width: s.size,
        height: s.size / (s.aspect ?? 1),
        transform: `translate3d(-50%, -50%, 0) rotate(${s.rot}deg)`,
        cursor: "grab",
      }}
    >
      <div
        className="h-full w-full"
        style={{
          background: s.bg,
          borderRadius: s.round ? "50%" : s.frame === "photo" ? "3px" : "0",
          border: s.frame === "photo" ? "7px solid #fdfcf9" : "none",
          padding: s.src || s.frame === "photo" ? 0 : "13%",
          boxShadow: s.frame === "photo" ? "0 14px 34px rgba(20,22,28,0.20)" : "none",
          filter: s.frame === "photo" ? "none" : "drop-shadow(0 10px 18px rgba(20,22,28,0.22))",
        }}
      >
        {s.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.src}
            alt=""
            draggable={false}
            className={`h-full w-full ${s.frame === "photo" ? "object-cover" : "object-contain"}`}
          />
        ) : s.shape ? (
          <ShapeArt shape={s.shape} fg={s.fg} id={s.id} />
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      {/* Behind the type */}
      <div ref={boardRef} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        {STICKERS.map((s, i) => (s.layer === "back" ? renderSticker(s, i) : null))}
      </div>

      {/* In front of the type */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {STICKERS.map((s, i) => (s.layer === "front" ? renderSticker(s, i) : null))}
      </div>
    </>
  );
}
