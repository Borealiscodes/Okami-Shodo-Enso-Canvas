/**
 * src/washi-renderer.js — Washi Paper, Velocity-Tapered Bristles, Sakura Bloom & Hanko Seal Renderer (Ledger 2)
 * Zero-flicker handmade paper surface with dry-brush kasure bristle offsets,
 * faint historical script tracing watermarks, and vermilion Hanko seal stamping.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { fromQ16 } from "./core.js";

function drawSingleBrushStroke(ctx, stroke) {
  const pts = stroke.points;
  if (!pts || pts.length === 0) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Single-dot ink drop if user tapped without dragging
  if (pts.length === 1) {
    const p = pts.at(0);
    ctx.fillStyle = stroke.color;
    ctx.beginPath();
    ctx.arc(fromQ16(p.xQ16), fromQ16(p.yQ16), p.width * 0.5, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  for (let i = 1; i < pts.length; i++) {
    const a = pts.at(i - 1);
    const b = pts.at(i);
    const x1 = fromQ16(a.xQ16);
    const y1 = fromQ16(a.yQ16);
    const x2 = fromQ16(b.xQ16);
    const y2 = fromQ16(b.yQ16);
    const w = (a.width + b.width) * 0.5;

    // Core rich ink stroke
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Subtle dry-brush kasure bristle filaments on fast, thin sweeps
    if (w < 6.5) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(x1 + 2.4, y1 - 1.8);
      ctx.lineTo(x2 + 2.4, y2 - 1.8);
      ctx.stroke();
      ctx.restore();
    }
  }
}

function drawSakuraBlossom(ctx, x, y, size, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "#f59e0b"; // Kinpaku gold-blossom highlight
  for (let p = 0; p < 5; p++) {
    ctx.rotate((2 * Math.PI) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -size, size * 0.45, size * 0.85, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#fef3c7";
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function renderWashiCanvas(ctx, state) {
  const { width, height } = ctx.canvas;

  // 1. Warm, steady handmade Washi paper gradient (zero screen flash)
  const paper = ctx.createLinearGradient(0, 0, width, height);
  paper.addColorStop(0, "#f7f1e1");
  paper.addColorStop(0.5, "#f3ead3");
  paper.addColorStop(1, "#ebe0c5");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, width, height);

  // 2. Subtle mulberry paper fiber lines & traditional mounting border
  ctx.strokeStyle = "rgba(180, 162, 130, 0.24)";
  ctx.lineWidth = 1;
  for (let y = 24; y < height; y += 36) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(width - 16, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "#b49a67";
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, width - 24, height - 24);

  // 3. Optional Historical Script Tracing Watermark
  if (state.showWatermark && state.era) {
    ctx.save();
    ctx.fillStyle = "rgba(120, 102, 74, 0.14)";
    ctx.font = "260px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(state.era.glyph, width * 0.5, height * 0.52);
    ctx.restore();
  }

  // 4. Render all completed calligraphy strokes & active stroke
  for (const stroke of state.strokes) {
    drawSingleBrushStroke(ctx, stroke);
  }
  if (state.activeStroke) {
    drawSingleBrushStroke(ctx, state.activeStroke);
  }

  // 5. Render Ōkami Celestial Brush Sakura Blossoms around closed Ensō circles
  for (const b of state.sakuraBlossoms) {
    drawSakuraBlossom(ctx, b.x, b.y, b.size, b.angle);
  }

  // 6. Vermilion Hanko Artist Seal Stamp (bottom-left traditional placement)
  if (state.stampedHanko) {
    const sx = 46;
    const sy = height - 86;
    ctx.save();
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(sx, sy, 44, 44);
    ctx.strokeStyle = "#fef2f2";
    ctx.lineWidth = 1.6;
    ctx.strokeRect(sx + 3, sy + 3, 38, 38);

    ctx.fillStyle = "#fef2f2";
    ctx.font = "bold 14px serif";
    ctx.textAlign = "center";
    ctx.fillText("書道", sx + 22, sy + 20);
    ctx.fillText("円相", sx + 22, sy + 37);
    ctx.restore();
  }
}
