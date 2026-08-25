// Shared figure set for interactive dot fields — the hero's cursor field and
// any decorative dot dividers draw from the same shapes so the motif reads
// as one system across the page.
export const DOT_SHAPES = ["star", "sparkle", "ring", "plus", "circle"] as const;
export type DotShape = (typeof DOT_SHAPES)[number];

export function shapeAt(row: number, col: number): DotShape {
  return DOT_SHAPES[(row * 7 + col * 13) % DOT_SHAPES.length];
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

export function drawDotShape(
  ctx: CanvasRenderingContext2D,
  shape: DotShape,
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
