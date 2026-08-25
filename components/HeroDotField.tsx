"use client";

import { useEffect, useRef } from "react";

const SHAPES = ["star", "sparkle", "ring", "plus", "circle"] as const;
type Shape = (typeof SHAPES)[number];

function shapeAt(row: number, col: number): Shape {
  return SHAPES[(row * 7 + col * 13) % SHAPES.length];
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const inner = r * 0.45;
  const points = 5;
  const step = Math.PI / points;
  let rot = -Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(cx + r * Math.cos(rot), cy + r * Math.sin(rot));
  for (let i = 0; i < points; i++) {
    rot += step;
    ctx.lineTo(cx + inner * Math.cos(rot), cy + inner * Math.sin(rot));
    rot += step;
    ctx.lineTo(cx + r * Math.cos(rot), cy + r * Math.sin(rot));
  }
  ctx.closePath();
  ctx.fill();
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, cx: number, cy: number, r: number) {
  switch (shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "ring":
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(1, r * 0.32);
      ctx.stroke();
      break;
    case "plus": {
      const w = Math.max(1, r * 0.32);
      ctx.fillRect(cx - w / 2, cy - r, w, r * 2);
      ctx.fillRect(cx - r, cy - w / 2, r * 2, w);
      break;
    }
    case "sparkle":
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.quadraticCurveTo(cx, cy, cx + r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + r);
      ctx.quadraticCurveTo(cx, cy, cx - r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - r);
      ctx.closePath();
      ctx.fill();
      break;
    case "star":
      drawStar(ctx, cx, cy, r);
      break;
  }
}

// A quiet, clearly-visible field of plain dots that, right under the
// cursor, transform into small colored figures — stars, sparkles, rings,
// pluses — each cell always showing the same figure so the field feels
// consistent as you move through it. A tight, precise interaction rather
// than a broad cluster. Never draws inside the content area — the text is
// a no-go zone, not a backdrop.
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

    const cellSize = 34;
    const interactionRadius = 70;
    const exclusionPad = 14;
    const mouse = { x: -9999, y: -9999 };
    let cols = 0;
    let rows = 0;
    let pending = false;
    let raf = 0;

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
      draw();
    }

    function draw() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      // Exclude per direct child (heading, meta row, button row, …) instead
      // of one box around the whole block — a single bounding box would
      // also swallow the empty margins beside short rows (like the button
      // row) and the gaps between them, leaving dots missing where there's
      // nothing to actually avoid.
      const canvasRect = canvas!.getBoundingClientRect();
      const excludeRects = Array.from(content!.children).map((child) => {
        const r = (child as HTMLElement).getBoundingClientRect();
        return {
          left: r.left - canvasRect.left - exclusionPad,
          right: r.right - canvasRect.left + exclusionPad,
          top: r.top - canvasRect.top - exclusionPad,
          bottom: r.bottom - canvasRect.top + exclusionPad,
        };
      });

      const style = getComputedStyle(container!);
      const dotColor = style.getPropertyValue("--ink-soft").trim() || "#666";
      const accent = style.getPropertyValue("--accent").trim() || "#3452e1";
      const lensA = style.getPropertyValue("--lens-a").trim() || "#ff7a45";
      const lensB = style.getPropertyValue("--lens-b").trim() || "#a855f7";
      const colors = [accent, lensA, lensB, accent, lensA];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize;
          const cy = row * cellSize;

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

          if (proximity < 0.15) {
            ctx!.globalAlpha = 0.5;
            ctx!.fillStyle = dotColor;
            ctx!.beginPath();
            ctx!.arc(cx, cy, 2.2, 0, Math.PI * 2);
            ctx!.fill();
            continue;
          }

          // Transform into a small figure — grows and brightens as the
          // cursor gets closer, replacing the plain dot rather than just
          // enlarging it. Each cell always resolves to the same figure and
          // color, so the field feels consistent rather than random noise.
          const t = (proximity - 0.15) / 0.85;
          const shapeIdx = (row * 7 + col * 13) % SHAPES.length;
          const shape = shapeAt(row, col);
          const color = colors[shapeIdx];
          ctx!.fillStyle = color;
          ctx!.strokeStyle = color;
          ctx!.globalAlpha = 0.35 + t * 0.65;
          drawShape(ctx!, shape, cx, cy, 2 + t * 7);
        }
      }
      ctx!.restore();
    }

    function scheduleDraw() {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(() => {
        pending = false;
        draw();
      });
    }

    function handleMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      scheduleDraw();
    }
    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      scheduleDraw();
    }

    resize();
    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);

    const ro = new ResizeObserver(resize);
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
