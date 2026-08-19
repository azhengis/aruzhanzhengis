"use client";

import { useEffect, useRef } from "react";

// Solidness loop: 1 = crisp solid name, 0 = scattered halftone dots. Briefly
// holds each state, then a plain linear opacity dissolve between them — a
// steady fade, not an eased snap.
function solidness(tNorm: number) {
  const holdSolid = 0.15;
  const transOut = 0.35;
  const holdDots = 0.15;
  if (tNorm < holdSolid) return 1;
  if (tNorm < holdSolid + transOut) {
    return 1 - (tNorm - holdSolid) / transOut;
  }
  if (tNorm < holdSolid + transOut + holdDots) return 0;
  const transIn = 1 - (holdSolid + transOut + holdDots);
  return (tNorm - (holdSolid + transOut + holdDots)) / transIn;
}

// Renders `text` edge-to-edge, crossfading between a crisp solid render (the
// real font, full resolution) and a halftone dot scatter — a name that
// periodically dissolves into dots and reforms, with dots swelling near the
// cursor on top of that loop.
export function HalftoneName({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let cellSize = 10;
    let cols = 0;
    let rows = 0;
    let mask: Float32Array = new Float32Array(0);
    let fontPxSolid = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const PERIOD_MS = 9000;

    function buildMask() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = container!.clientWidth;
      canvasHeight = Math.max(180, Math.round(canvasWidth * 0.32));
      canvas!.width = canvasWidth * dpr;
      canvas!.height = canvasHeight * dpr;
      canvas!.style.width = `${canvasWidth}px`;
      canvas!.style.height = `${canvasHeight}px`;

      cellSize = Math.max(5, Math.round(canvasWidth / 160));
      cols = Math.ceil(canvasWidth / cellSize);
      rows = Math.ceil(canvasHeight / cellSize);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d")!;
      octx.clearRect(0, 0, cols, rows);
      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = "center";
      let fontSizeCells = rows * 0.86;
      octx.font = `900 ${fontSizeCells}px -apple-system, BlinkMacSystemFont, sans-serif`;
      while (octx.measureText(text).width > cols * 0.96 && fontSizeCells > 4) {
        fontSizeCells -= 1;
        octx.font = `900 ${fontSizeCells}px -apple-system, BlinkMacSystemFont, sans-serif`;
      }
      octx.fillText(text, cols / 2, rows / 2);
      fontPxSolid = fontSizeCells * cellSize;

      const data = octx.getImageData(0, 0, cols, rows).data;
      mask = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        mask[i] = data[i * 4 + 3] / 255;
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      const style = getComputedStyle(container!);
      const inkColor = style.getPropertyValue("--ink").trim() || "#111";
      ctx!.fillStyle = inkColor;

      const tNorm = reduceMotion ? 0 : (time % PERIOD_MS) / PERIOD_MS;
      const s = reduceMotion ? 1 : solidness(tNorm);

      if (s > 0.01) {
        ctx!.globalAlpha = s;
        ctx!.textBaseline = "middle";
        ctx!.textAlign = "center";
        ctx!.font = `900 ${fontPxSolid}px -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx!.fillText(text, canvasWidth / 2, canvasHeight / 2);
      }

      if (s < 0.99) {
        const dotAlpha = 1 - s;
        const minR = cellSize * 0.12;
        const maxR = cellSize * 0.46;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const m = mask[row * cols + col];
            if (m < 0.12) continue;

            const cx = col * cellSize + cellSize / 2;
            const cy = row * cellSize + cellSize / 2;

            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const proximity = Math.max(0, 1 - dist / 110);

            // Dot size tracks ink density, so the dotted state reads at the
            // same weight/shape as the solid render, not a thinner outline.
            const radius = minR + (maxR - minR) * m + proximity * cellSize * 0.35;
            ctx!.globalAlpha = Math.min(1, m * dotAlpha * (0.85 + proximity * 0.15));
            ctx!.beginPath();
            ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx!.fill();
          }
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

    buildMask();
    draw(0);
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    window.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);

    const ro = new ResizeObserver(() => {
      buildMask();
      if (reduceMotion) draw(0);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerleave", handleLeave);
      ro.disconnect();
    };
  }, [text]);

  return (
    <div ref={containerRef} className="w-full">
      <h2 className="sr-only">{text}</h2>
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
