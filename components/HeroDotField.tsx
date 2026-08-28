"use client";

import { useEffect, useRef } from "react";
import { DOT_SHAPES, shapeAt, drawDotShape } from "@/lib/dotFigures";

// Deterministic pseudo-random in [0, 1) — stable per cell across frames, so
// each dot's drift phase and size jitter stay put rather than flickering.
function hash(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type Sparkle = { row: number; col: number; start: number; duration: number };

// A field of tiny figures — stars, ovals, multi-point bursts, rings,
// circles — that read as plain dots at rest but are alive: a gentle
// per-dot floating drift, occasional dots that spontaneously bloom and
// fade on their own, and the nearest one growing further under the
// cursor. Never draws inside the content area — the text is a no-go
// zone, not a backdrop.
export function HeroDotField({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!container || !canvas || !content) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cellSize = 30;
    const interactionRadius = 70;
    const exclusionPad = 14;
    const driftAmount = 2.2;
    const mouse = { x: -9999, y: -9999 };
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let sparkles: Sparkle[] = [];
    let nextSpawn = 0;
    let excludeRects: { left: number; right: number; top: number; bottom: number }[] = [];

    // Exclude per direct child (heading, meta row, button row, …) instead of
    // one box around the whole block — a single bounding box would also
    // swallow the empty margins beside short rows (like the button row) and
    // the gaps between them. Measured only on resize (not every frame) since
    // canvas and content scroll together — their relative offsets don't
    // change with scroll position, only with actual layout changes.
    function measureExclusions() {
      const canvasRect = canvas!.getBoundingClientRect();
      excludeRects = Array.from(content!.children).map((child) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        return {
          left: r.left - canvasRect.left - exclusionPad,
          right: r.right - canvasRect.left + exclusionPad,
          top: r.top - canvasRect.top - exclusionPad,
          bottom: r.bottom - canvasRect.top + exclusionPad,
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
      measureExclusions();
    }

    function draw(time: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      const style = getComputedStyle(container!);
      const dotColor = style.getPropertyValue("--ink-soft").trim() || "#666";
      const accent = style.getPropertyValue("--accent").trim() || "#3452e1";
      const lensA = style.getPropertyValue("--lens-a").trim() || "#ff7a45";
      const lensB = style.getPropertyValue("--lens-b").trim() || "#a855f7";
      const colors = [accent, lensA, lensB, accent, lensA, lensB, accent];

      // Ambient life: every so often, a random visible cell blooms into its
      // shape and fades back on its own — the field feels alive even before
      // anyone touches it, not just reactive to the cursor.
      if (!reduceMotion && time >= nextSpawn && sparkles.length < 4 && cols > 0 && rows > 0) {
        sparkles.push({
          row: Math.floor(Math.random() * rows),
          col: Math.floor(Math.random() * cols),
          start: time,
          duration: 1100 + Math.random() * 900,
        });
        nextSpawn = time + 500 + Math.random() * 900;
      }
      sparkles = sparkles.filter((s) => time - s.start < s.duration);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const seed = row * 928.7 + col * 371.3;
          const cx = reduceMotion
            ? col * cellSize
            : col * cellSize + Math.sin(time / 2200 + seed) * driftAmount;
          const cy = reduceMotion
            ? row * cellSize
            : row * cellSize + Math.cos(time / 2600 + seed * 1.3) * driftAmount;

          const insideContent = excludeRects.some(
            (rect) => cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom
          );
          if (insideContent) continue;

          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = reduceMotion
            ? 0
            : Math.max(0, 1 - dist / interactionRadius);
          const cursorT = proximity > 0.15 ? (proximity - 0.15) / 0.85 : 0;

          const sparkle = sparkles.find((s) => s.row === row && s.col === col);
          let sparkleT = 0;
          if (sparkle) {
            const local = (time - sparkle.start) / sparkle.duration;
            sparkleT = Math.sin(local * Math.PI);
          }

          const t = Math.max(cursorT, sparkleT);

          const shapeIdx = (row * 7 + col * 13) % DOT_SHAPES.length;
          const shape = shapeAt(row, col);
          const jitter = 0.75 + hash(seed) * 0.5;

          // At rest, every cell is already its real shape — star, oval,
          // burst, ring — just tiny enough to read as a plain dot. Growth
          // (from the cursor or an ambient sparkle) reveals it, it never
          // swaps shape.
          const baseR = 1.4 * jitter;
          const grownR = 9 * jitter;
          const radius = baseR + (grownR - baseR) * t;

          if (t < 0.02) {
            ctx!.globalAlpha = 0.5;
            ctx!.fillStyle = dotColor;
            ctx!.strokeStyle = dotColor;
            drawDotShape(ctx!, shape, cx, cy, radius);
            continue;
          }

          const color = colors[shapeIdx];
          ctx!.fillStyle = color;
          ctx!.strokeStyle = color;
          ctx!.globalAlpha = 0.5 + t * 0.5;
          drawDotShape(ctx!, shape, cx, cy, radius);
        }
      }
      ctx!.restore();
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    function handleMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    draw(0);
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(container);
    ro.observe(content);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      />
      <div ref={contentRef} className="relative z-10 w-fit max-w-full">
        {children}
      </div>
    </div>
  );
}
