/**
 * src/shodo-app.js — Interactive Shodō & Ensō Studio Controller
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { JAPANESE_PIGMENTS, SHODO_ERAS } from "./shodo-history.js";
import {
  CANVAS_W,
  CANVAS_H,
  createShodoCanvasState,
  beginBrushStroke,
  extendBrushStroke,
  endBrushStroke,
  buildScrollReceipt,
} from "./enso-kernel.js";
import { createShodoAudio } from "./shodo-audio.js";
import { renderWashiCanvas } from "./washi-renderer.js";

function initShodoStudio() {
  const canvas = document.getElementById("washi-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const audio = createShodoAudio();

  const eraTitleEl = document.getElementById("era-title");
  const eraPeriodEl = document.getElementById("era-period");
  const eraGlyphEl = document.getElementById("era-glyph");
  const eraHistoryEl = document.getElementById("era-history");
  const ensoBadgeEl = document.getElementById("hud-enso");
  const audioBtn = document.getElementById("btn-audio");
  const watermarkBtn = document.getElementById("btn-watermark");
  const receiptBox = document.getElementById("receipt-output");

  let state = createShodoCanvasState();

  const redraw = () => {
    if (ctx) renderWashiCanvas(ctx, state);
  };

  const syncUi = () => {
    if (eraTitleEl) eraTitleEl.textContent = state.era.title;
    if (eraPeriodEl) eraPeriodEl.textContent = `${state.era.period} • ${state.era.reading}`;
    if (eraGlyphEl) eraGlyphEl.textContent = state.era.glyph;
    if (eraHistoryEl) eraHistoryEl.textContent = state.era.history;
    if (ensoBadgeEl) ensoBadgeEl.textContent = `Celestial Ensō Blooms: ${state.ensoCount}`;
    redraw();
  };

  syncUi();

  const toCanvasCoords = (ev) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((ev.clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  canvas?.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    canvas.setPointerCapture?.(ev.pointerId);
    const { x, y } = toCanvasCoords(ev);
    state = beginBrushStroke(state, x, y);
    redraw();
  });

  canvas?.addEventListener("pointermove", (ev) => {
    if (!state.activeStroke) return;
    const { x, y } = toCanvasCoords(ev);
    state = extendBrushStroke(state, x, y);
    redraw();
  });

  const finishStroke = () => {
    if (!state.activeStroke) return;
    const prevEnso = state.ensoCount;
    state = endBrushStroke(state);

    if (state.ensoCount > prevEnso) {
      audio.playEnsoBloom();
    } else {
      audio.playStrokeComplete();
    }
    syncUi();
  };

  canvas?.addEventListener("pointerup", finishStroke);
  canvas?.addEventListener("pointercancel", finishStroke);

  // Pigment Swatch Buttons
  document.querySelectorAll("[data-pigment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-pigment");
      const found = JAPANESE_PIGMENTS.find((p) => p.id === id);
      if (found) {
        state = { ...state, pigment: found };
        document.querySelectorAll("[data-pigment]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
    });
  });

  // Historical Era Selector Buttons
  document.querySelectorAll("[data-era]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-era")) || 0;
      const era = SHODO_ERAS.at(idx) || SHODO_ERAS.at(0);
      state = { ...state, eraIndex: idx, era };
      syncUi();
    });
  });

  watermarkBtn?.addEventListener("click", () => {
    state = { ...state, showWatermark: !state.showWatermark };
    watermarkBtn.textContent = state.showWatermark ? "Tracing Guide: On" : "Tracing Guide: Off";
    redraw();
  });

  document.getElementById("btn-hanko")?.addEventListener("click", () => {
    state = { ...state, stampedHanko: true };
    audio.playHankoStamp();
    redraw();
  });

  document.getElementById("btn-undo")?.addEventListener("click", () => {
    if (state.strokes.length > 0) {
      state = { ...state, strokes: state.strokes.slice(0, -1) };
      redraw();
    }
  });

  document.getElementById("btn-clear")?.addEventListener("click", () => {
    state = {
      ...createShodoCanvasState(),
      eraIndex: state.eraIndex,
      era: state.era,
      pigment: state.pigment,
      showWatermark: state.showWatermark,
    };
    syncUi();
  });

  audioBtn?.addEventListener("click", () => {
    const muted = audio.toggleMute();
    audioBtn.textContent = muted ? "Sound: Muted" : "Sound: Koto & Bloom (On)";
  });

  document.getElementById("btn-receipt")?.addEventListener("click", () => {
    const receipt = buildScrollReceipt(state);
    if (receiptBox) receiptBox.value = JSON.stringify(receipt, null, 2);
  });
}

window.addEventListener("DOMContentLoaded", initShodoStudio);
