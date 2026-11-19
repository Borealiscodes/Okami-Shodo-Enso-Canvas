/**
 * src/enso-kernel.js — Zero-Float Q16.16 Brush Stroke Recorder & Celestial Ensō Recognizer (Ledger 1)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { toQ16, fromQ16, sha256Hex } from "./core.js";
import { JAPANESE_PIGMENTS, SHODO_ERAS } from "./shodo-history.js";

export const CANVAS_W = 680;
export const CANVAS_H = 460;

export function createShodoCanvasState() {
  return {
    eraIndex: 0,
    era: SHODO_ERAS.at(0),
    pigment: JAPANESE_PIGMENTS.at(0),
    showWatermark: true,
    stampedHanko: false,
    strokes: [], // Completed strokes: { points: [{xQ16, yQ16, width}], color, isEnso }
    activeStroke: null,
    sakuraBlossoms: [], // { x, y, size, angle, alpha }
    ensoCount: 0,
  };
}

/**
 * Compute inverse-speed brush bristle width in pixels [2.5 .. 19.0].
 * Slow strokes pool rich ink; rapid flicks taper into fine dry-brush tips.
 */
export function computeBristleWidth(distPx) {
  const clamped = Math.max(0, Math.min(45, distPx));
  const width = 18.5 - clamped * 0.42;
  return Math.max(2.4, Math.min(18.5, width));
}

export function beginBrushStroke(state, x, y) {
  const pt = { xQ16: toQ16(x), yQ16: toQ16(y), width: 14.0 };
  return {
    ...state,
    activeStroke: {
      points: [pt],
      color: state.pigment.hex,
      isEnso: false,
    },
  };
}

export function extendBrushStroke(state, x, y) {
  if (!state.activeStroke) return state;
  const pts = state.activeStroke.points;
  const last = pts.at(-1);
  const lx = fromQ16(last.xQ16);
  const ly = fromQ16(last.yQ16);
  const dist = Math.hypot(x - lx, y - ly);

  if (dist < 1.2) return state;

  const targetWidth = computeBristleWidth(dist);
  // Smooth bristle taper transition
  const smoothWidth = last.width * 0.55 + targetWidth * 0.45;

  const nextPt = {
    xQ16: toQ16(x),
    yQ16: toQ16(y),
    width: smoothWidth,
  };

  return {
    ...state,
    activeStroke: {
      ...state.activeStroke,
      points: [...pts, nextPt],
    },
  };
}

/**
 * Evaluate whether a completed stroke forms a closed Celestial Ensō circle.
 */
export function evaluateEnsoClosure(points) {
  if (!points || points.length < 14) return { isEnso: false, centerX: 0, centerY: 0, radius: 0 };

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  let pathLen = 0;

  for (let i = 0; i < points.length; i++) {
    const px = fromQ16(points.at(i).xQ16);
    const py = fromQ16(points.at(i).yQ16);
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;

    if (i > 0) {
      const prevX = fromQ16(points.at(i - 1).xQ16);
      const prevY = fromQ16(points.at(i - 1).yQ16);
      pathLen += Math.hypot(px - prevX, py - prevY);
    }
  }

  const boxW = maxX - minX;
  const boxH = maxY - minY;
  if (boxW < 55 || boxH < 55) return { isEnso: false, centerX: 0, centerY: 0, radius: 0 };

  const aspect = Math.min(boxW, boxH) / Math.max(boxW, boxH);
  const startX = fromQ16(points.at(0).xQ16);
  const startY = fromQ16(points.at(0).yQ16);
  const endX = fromQ16(points.at(-1).xQ16);
  const endY = fromQ16(points.at(-1).yQ16);
  const gap = Math.hypot(endX - startX, endY - startY);

  const avgDiam = (boxW + boxH) * 0.5;
  const expectedCircumference = Math.PI * avgDiam;
  const lengthRatio = pathLen / expectedCircumference;

  // Closed circular loop check (allows traditional slight Zen breath gap up to 38% of diameter)
  const isEnso = aspect >= 0.62 && gap <= avgDiam * 0.38 && lengthRatio >= 0.72 && lengthRatio <= 1.45;

  return {
    isEnso,
    centerX: (minX + maxX) * 0.5,
    centerY: (minY + maxY) * 0.5,
    radius: avgDiam * 0.5,
  };
}

export function endBrushStroke(state) {
  if (!state.activeStroke) return state;
  const pts = state.activeStroke.points;
  const check = evaluateEnsoClosure(pts);

  const finalized = {
    ...state.activeStroke,
    isEnso: check.isEnso,
  };

  let nextSakura = state.sakuraBlossoms;
  let nextEnsoCount = state.ensoCount;

  if (check.isEnso) {
    nextEnsoCount += 1;
    // Scatter 10 Ōkami-style golden sakura petals around the newly completed Ensō ring
    const petals = Array.from({ length: 10 }, (_, i) => {
      const theta = (2 * Math.PI * i) / 10 + nextEnsoCount * 0.3;
      const r = check.radius + (i % 2 === 0 ? 12 : -10);
      return {
        x: check.centerX + Math.cos(theta) * r,
        y: check.centerY + Math.sin(theta) * r,
        size: 6 + (i % 3) * 2,
        angle: theta,
      };
    });
    nextSakura = [...state.sakuraBlossoms, ...petals];
  }

  return {
    ...state,
    activeStroke: null,
    strokes: [...state.strokes, finalized],
    sakuraBlossoms: nextSakura,
    ensoCount: nextEnsoCount,
  };
}

export function buildScrollReceipt(state) {
  const payload = {
    schema: "ndh.okami.shodo.enso.v1",
    eraId: state.era.id,
    pigmentId: state.pigment.id,
    strokeCount: state.strokes.length,
    ensoMiracles: state.ensoCount,
    hankoStamped: state.stampedHanko,
  };
  return {
    ...payload,
    sha256: sha256Hex(JSON.stringify(payload)),
  };
}
