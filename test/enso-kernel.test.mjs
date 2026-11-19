/**
 * test/enso-kernel.test.mjs — Verification of Velocity Bristle Tapering & Celestial Ensō Recognition
 * Run: node --test test/enso-kernel.test.mjs
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  createShodoCanvasState,
  computeBristleWidth,
  beginBrushStroke,
  extendBrushStroke,
  endBrushStroke,
  buildScrollReceipt,
} from "../src/enso-kernel.js";

test("1. Inverse-Speed Bristle Tapering (Slow Pool vs. Fast Dry-Brush Tip)", () => {
  const slowWidth = computeBristleWidth(2.0);
  const fastWidth = computeBristleWidth(35.0);
  assert.ok(slowWidth > 16.0);
  assert.ok(fastWidth < 5.0);
});

test("2. Celestial Ensō Circle Loop Closure triggers Sakura Blossom Bloom", () => {
  let state = createShodoCanvasState();
  const cx = 340, cy = 230, r = 95;
  const steps = 36;

  state = beginBrushStroke(state, cx + r, cy);
  for (let i = 1; i <= steps; i++) {
    const theta = (2 * Math.PI * i) / steps;
    state = extendBrushStroke(state, cx + Math.cos(theta) * r, cy + Math.sin(theta) * r);
  }
  state = endBrushStroke(state);

  assert.equal(state.ensoCount, 1);
  assert.equal(state.sakuraBlossoms.length, 10);
  assert.equal(state.strokes.at(0).isEnso, true);
});

test("3. Straight Line Stroke Does Not False-Trigger Ensō Bloom", () => {
  let state = createShodoCanvasState();
  state = beginBrushStroke(state, 120, 200);
  for (let x = 140; x <= 460; x += 20) {
    state = extendBrushStroke(state, x, 200);
  }
  state = endBrushStroke(state);

  assert.equal(state.ensoCount, 0);
  assert.equal(state.sakuraBlossoms.length, 0);
  assert.equal(buildScrollReceipt(state).sha256.length, 64);
});
