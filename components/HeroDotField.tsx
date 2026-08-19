"use client";

import { useEffect, useRef } from "react";

const SHAPES = ["circle", "sparkle", "plus", "diamond", "ring"] as const;
type Shape = (typeof SHAPES)[number];

function shapeAt(row: number, col: number): Shape {
  return SHAPES[(row * 7 + col * 13) % SHAPES.length];
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  cx: number,
  cy: number,
  r: number
) {
  switch (shape) {
    case "circle":
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "ring":
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(1, r * 0.35);
      ctx.stroke();
      break;
    case "plus": {
      const w = Math.max(1, r * 0.34);
      ctx.fillRect(cx - w / 2, cy - r, w, r * 2);
      ctx.fillRect(cx - r, cy - w / 2, r * 2, w);
      break;
    }
    case "diamond":
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r, cy);
      ctx.closePath();
      ctx.fill();
      break;
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
  }
}

// A quiet field of dots that, near the cursor, blooms into a scatter of small
// shapes (stars, rings, diamonds…) rather than one uniform glow. Never draws
// inside the content area — the text is a no-go zone, not a backdrop.
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
    const interactionRadius = 130;
    const exclusionPad = 20;
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

      const canvasRect = canvas!.getBoundingClientRect();
      const contentRect = content!.getBoundingClientRect();
      const exclude = {
        left: contentRect.left - canvasRect.left - exclusionPad,
        right: contentRect.right - canvasRect.left + exclusionPad,
        top: contentRect.top - canvasRect.top - exclusionPad,
        bottom: contentRect.bottom - canvasRect.top + exclusionPad,
      };

      const style = getComputedStyle(container!);
      const muted = style.getPropertyValue("--muted").trim() || "#999";
      const accent = style.getPropertyValue("--accent").trim() || "#3452e1";
      const lensA = style.getPropertyValue("--lens-a").trim() || "#ff7a45";
      const lensB = style.getPropertyValue("--lens-b").trim() || "#a855f7";
      const colors = [accent, lensA, lensB, accent, lensA];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize;
          const cy = row * cellSize;

          if (
            cx >= exclude.left &&
            cx <= exclude.right &&
            cy >= exclude.top &&
            cy <= exclude.bottom
          ) {
            continue;
          }

          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = reduceMotion
            ? 0
            : Math.max(0, 1 - dist / interactionRadius);

          if (proximity < 0.08) {
            ctx!.globalAlpha = 0.25;
            ctx!.fillStyle = muted;
            ctx!.beginPath();
            ctx!.arc(cx, cy, 1.3, 0, Math.PI * 2);
            ctx!.fill();
            continue;
          }

          const shapeIdx = (row * 7 + col * 13) % SHAPES.length;
          const shape = shapeAt(row, col);
          const r = 2 + proximity * 9;
          ctx!.globalAlpha = 0.35 + proximity * 0.65;
          ctx!.fillStyle = colors[shapeIdx];
          ctx!.strokeStyle = colors[shapeIdx];
          drawShape(ctx!, shape, cx, cy, r);
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
      <div ref={contentRef} className="relative z-10 w-fit max-w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
