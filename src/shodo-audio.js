/**
 * src/shodo-audio.js — Mute-by-Default WebAudio Brush Whisper, Koto Pluck & Celestial Bloom Chime (Ledger 2)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

const YO_KOTO_HZ = [293.66, 329.63, 392.00, 440.00, 493.88, 587.33]; // D4..D5

export function createShodoAudio() {
  let muted = true;
  let ctx = null;
  let pluckIdx = 0;

  const ensureCtx = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    }
    if (ctx && ctx.state === "suspended") ctx.resume();
    return ctx;
  };

  const playTone = (freq, type, peak, attack, decay, cutoff = 1200) => {
    const ac = ensureCtx();
    if (!ac || muted) return;

    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(260, now + decay);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    osc.stop(now + decay + 0.05);
  };

  return {
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      if (!muted) ensureCtx();
      return muted;
    },
    playStrokeComplete: () => {
      if (muted) return;
      const freq = YO_KOTO_HZ.at(pluckIdx % YO_KOTO_HZ.length);
      pluckIdx++;
      playTone(freq, "triangle", 0.05, 0.01, 0.85, 1350);
    },
    playEnsoBloom: () => {
      if (muted) return;
      // Ōkami-style Celestial Brush ascending pentatonic arpeggio + Bonshō bell
      YO_KOTO_HZ.forEach((freq, i) => {
        setTimeout(() => {
          playTone(freq, "sine", 0.055, 0.015, 1.6, 1800);
        }, i * 65);
      });
    },
    playHankoStamp: () => {
      if (muted) return;
      playTone(146.83, "sine", 0.09, 0.008, 0.45, 320); // Crisp seal thud (D3)
    },
  };
}
