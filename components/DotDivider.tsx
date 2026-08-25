"use client";

import { useEffect, useRef } from "react";
import { DOT_SHAPES, shapeAt, drawDotShape } from "@/lib/dotFigures";

type Sparkle = { row: number; col: number; start: number; duration: number };

// A quiet decorative strip of the same dot figures as the hero — cursor
// still transforms the nearest one, and every so often, on its own, a
// random dot elsewhere briefly sparkles to life and fades — so the strip
// feels alive even before anyone touches it.
export function DotDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cellSize = 26;
    const interactionRadius = 60;
    const mouse = { x: -9999, y: -9999 };
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let sparkles: Sparkle[] = [];
    let nextSpawn = 0;

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
      const colors = [accent, lensA, lensB, accent, lensA];

      if (!reduceMotion && time >= nextSpawn && sparkles.length < 3 && cols > 0) {
        sparkles.push({
          row: Math.floor(Math.random() * rows),
          col: Math.floor(Math.random() * cols),
          start: time,
          duration: 1300 + Math.random() * 900,
        });
        nextSpawn = time + 900 + Math.random() * 1500;
      }
      sparkles = sparkles.filter((s) => time - s.start < s.duration);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * cellSize;
          const cy = row * cellSize;

          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = reduceMotion
            ? 0
            : Math.max(0, 1 - dist / interactionRadius);

          const sparkle = sparkles.find((s) => s.row === row && s.col === col);
          let sparkleT = 0;
          if (sparkle) {
            const local = (time - sparkle.start) / sparkle.duration;
            sparkleT = Math.sin(local * Math.PI);
          }

          const t = Math.max(proximity > 0.15 ? (proximity - 0.15) / 0.85 : 0, sparkleT);

          if (t <= 0.02) {
            ctx!.globalAlpha = 0.4;
            ctx!.fillStyle = dotColor;
            ctx!.beginPath();
            ctx!.arc(cx, cy, 1.8, 0, Math.PI * 2);
            ctx!.fill();
            continue;
          }

          const shapeIdx = (row * 7 + col * 13) % DOT_SHAPES.length;
          const shape = shapeAt(row, col);
          const color = colors[shapeIdx];
          ctx!.fillStyle = color;
          ctx!.strokeStyle = color;
          ctx!.globalAlpha = 0.3 + t * 0.7;
          drawDotShape(ctx!, shape, cx, cy, 1.5 + t * 5.5);
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

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-24 sm:h-28 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
    </div>
  );
}
