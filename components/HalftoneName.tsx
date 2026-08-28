"use client";

import { useEffect, useRef } from "react";

function smoothstep(x: number) {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

// Solidness loop: 1 = fully solid, 0 = small distinct bubbles. Briefly holds
// each state, eased growth between.
function solidness(tNorm: number) {
  const holdSolid = 0.15;
  const transOut = 0.35;
  const holdDots = 0.15;
  if (tNorm < holdSolid) return 1;
  if (tNorm < holdSolid + transOut) {
    return 1 - smoothstep((tNorm - holdSolid) / transOut);
  }
  if (tNorm < holdSolid + transOut + holdDots) return 0;
  const transIn = 1 - (holdSolid + transOut + holdDots);
  return smoothstep((tNorm - (holdSolid + transOut + holdDots)) / transIn);
}

// Separable box blur, two passes reused by the caller for a near-Gaussian
// falloff — this is what turns a hard glyph edge into the multi-cell size
// gradient the reference shows (dots shrink gradually over several cells
// near a boundary, not just the outermost one).
function boxBlur(data: Float32Array, w: number, h: number, radius: number) {
  const size = radius * 2 + 1;
  const tmp = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    let sum = 0;
    const rowOff = y * w;
    for (let x = -radius; x <= radius; x++) {
      sum += data[rowOff + Math.min(w - 1, Math.max(0, x))];
    }
    for (let x = 0; x < w; x++) {
      tmp[rowOff + x] = sum / size;
      const addX = Math.min(w - 1, x + radius + 1);
      const subX = Math.max(0, x - radius);
      sum += data[rowOff + addX] - data[rowOff + subX];
    }
  }
  const out = new Float32Array(w * h);
  for (let x = 0; x < w; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      sum += tmp[Math.min(h - 1, Math.max(0, y)) * w + x];
    }
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / size;
      const addY = Math.min(h - 1, y + radius + 1);
      const subY = Math.max(0, y - radius);
      sum += tmp[addY * w + x] - tmp[subY * w + x];
    }
  }
  return out;
}

// Satoshi is self-hosted (see globals.css) so canvas can draw the same
// typeface as the reference — a real Black weight, not a faked-bold stroke.
const FONT_STACK = "'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_WEIGHT = 900;
const LETTER_SPACING = "-0.03em";
const MASK_SUPERSAMPLE = 4;

// Renders `text` as a grid of bubbles sized by a blurred density map of the
// real glyphs (big in letter interiors, tapering gradually near edges — a
// halftone screen, not random noise), then clips the whole field against
// the actual font with destination-in so edge bubbles are cut by the true
// letter boundary. Once bubbles grow large enough, the clipped result
// converges to ordinary solid type.
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
    let cellSize = 20;
    let cols = 0;
    let rows = 0;
    let fontPxSolid = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let density: Float32Array = new Float32Array(0);
    let maskCols = 0;
    let maskRows = 0;

    const PERIOD_MS = 4000;

    function buildDensity() {
      const maskPixel = cellSize / MASK_SUPERSAMPLE;
      maskCols = Math.ceil(canvasWidth / maskPixel);
      maskRows = Math.ceil(canvasHeight / maskPixel);
      if (maskCols <= 0 || maskRows <= 0) return;

      const off = document.createElement("canvas");
      off.width = maskCols;
      off.height = maskRows;
      const octx = off.getContext("2d")!;
      octx.clearRect(0, 0, maskCols, maskRows);
      octx.fillStyle = "#fff";
      octx.textBaseline = "middle";
      octx.textAlign = "center";
      octx.letterSpacing = LETTER_SPACING;
      octx.font = `${FONT_WEIGHT} ${fontPxSolid / maskPixel}px ${FONT_STACK}`;
      octx.fillText(text, maskCols / 2, maskRows / 2);

      const data = octx.getImageData(0, 0, maskCols, maskRows).data;
      let raw = new Float32Array(maskCols * maskRows);
      for (let i = 0; i < raw.length; i++) raw[i] = data[i * 4 + 3] / 255;

      // A couple of blur passes turn the hard glyph edge into a smooth,
      // multi-cell taper.
      raw = boxBlur(raw, maskCols, maskRows, MASK_SUPERSAMPLE);
      raw = boxBlur(raw, maskCols, maskRows, MASK_SUPERSAMPLE);
      density = raw;
    }

    function densityAt(cx: number, cy: number) {
      const maskPixel = cellSize / MASK_SUPERSAMPLE;
      const mx = Math.min(maskCols - 1, Math.max(0, Math.round(cx / maskPixel)));
      const my = Math.min(maskRows - 1, Math.max(0, Math.round(cy / maskPixel)));
      return density[my * maskCols + mx];
    }

    function measure() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = container!.clientWidth;
      // Container isn't laid out yet (0 width) — bail out rather than call
      // getImageData on a zero-sized canvas, which throws and can take the
      // whole render down. The ResizeObserver fires again once it has size.
      if (canvasWidth <= 0) return;
      canvasHeight = Math.max(220, Math.round(canvasWidth * 0.4));
      canvas!.width = canvasWidth * dpr;
      canvas!.height = canvasHeight * dpr;
      canvas!.style.width = `${canvasWidth}px`;
      canvas!.style.height = `${canvasHeight}px`;

      // Fine grid — a lot of bubbles, not a handful of big ones.
      cellSize = Math.max(6, Math.round(canvasWidth / 150));
      cols = Math.ceil(canvasWidth / cellSize) + 1;
      rows = Math.ceil(canvasHeight / cellSize) + 1;

      ctx!.textBaseline = "middle";
      ctx!.textAlign = "center";
      ctx!.letterSpacing = LETTER_SPACING;
      let fontPx = canvasHeight * 0.68;
      ctx!.font = `${FONT_WEIGHT} ${fontPx}px ${FONT_STACK}`;
      while (ctx!.measureText(text).width > canvasWidth * 0.99 && fontPx > 8) {
        fontPx -= 1;
        ctx!.font = `${FONT_WEIGHT} ${fontPx}px ${FONT_STACK}`;
      }
      fontPxSolid = fontPx;

      buildDensity();
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.save();
      ctx!.scale(dpr, dpr);

      const style = getComputedStyle(container!);
      const inkColor = style.getPropertyValue("--ink").trim() || "#111";

      const tNorm = reduceMotion ? 0 : (time % PERIOD_MS) / PERIOD_MS;
      const s = reduceMotion ? 1 : solidness(tNorm);

      const minR = cellSize * 0.45;
      const maxR = cellSize * 0.9;

      // Cheap row-level bound — skip the wide blank margins above/below the
      // text. Deliberately generous: at high s the growth term dominates
      // regardless of density, and a density-based skip here could leave a
      // true edge cell undrawn (the clip can only remove pixels, not add
      // them), so precision is left entirely to the destination-in clip.
      const padY = fontPxSolid * 0.8;
      const bandTop = canvasHeight / 2 - padY;
      const bandBottom = canvasHeight / 2 + padY;

      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = inkColor;
      ctx!.globalAlpha = 1;

      for (let row = 0; row < rows; row++) {
        const cy = row * cellSize;
        if (cy < bandTop || cy > bandBottom) continue;

        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize;

          const m = densityAt(cx, cy);

          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 110);

          // At s=0 radius is density-proportional (the halftone gradient —
          // big in letter interiors, tapering near edges). As s→1 every
          // cell converges to the same maxR regardless of density, so the
          // clip below resolves to a fully solid, uniformly-covered glyph
          // rather than leaving faint under-grown edges.
          const dotRadius = m * minR;
          const radius = dotRadius + s * (maxR - dotRadius) + proximity * cellSize * 0.25;
          if (radius < 0.5) continue;

          ctx!.beginPath();
          ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // The clip: only the pixels the real font actually covers survive —
      // this is what produces the scalloped edge as bubbles grow, and a
      // perfectly clean silhouette once they're big enough to be solid.
      ctx!.globalCompositeOperation = "destination-in";
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "center";
      ctx!.font = `${FONT_WEIGHT} ${fontPxSolid}px ${FONT_STACK}`;
      ctx!.letterSpacing = LETTER_SPACING;
      ctx!.fillText(text, canvasWidth / 2, canvasHeight / 2);

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

    measure();
    draw(0);
    if (!reduceMotion) raf = requestAnimationFrame(draw);

    // Canvas text doesn't wait for web fonts on its own — remeasure once
    // Satoshi actually finishes loading so the density map and clip aren't
    // built against the system fallback the whole time.
    Promise.all([
      document.fonts.load(`700 100px Satoshi`),
      document.fonts.load(`900 100px Satoshi`),
    ])
      .then(() => {
        measure();
        if (reduceMotion) draw(0);
      })
      .catch(() => {});

    window.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerleave", handleLeave);

    const ro = new ResizeObserver(() => {
      measure();
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
