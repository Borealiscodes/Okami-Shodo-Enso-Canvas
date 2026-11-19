# Deterministic Fixed-Point Rheology and Topological Loop Recognition in Interactive Japanese Calligraphy (*Shodō*) and *Ensō* Simulation

**Author:** Borealis Serenity Hedling  
**Affiliation:** Independent Researcher, NDH-Research-Pilot, County Dublin, Ireland  
**Date:** November 19, 2026  
**Version:** v1.0.0 (Companion Preprint for `Borealiscodes/Okami-Shodo-Enso-Canvas`)  
**License:** CC BY 4.0 (Preprint Text) / MIT License (Reference Implementation)  

---

## Abstract

Digital simulations of East Asian brush calligraphy (*Shodō*) and Zen *Ensō* circle painting frequently suffer from two architectural flaws: non-deterministic floating-point drift across heterogeneous hardware architectures and opaque heuristic stroke classifiers that decouple visual gesture recognition from verifiable mathematical invariants. This paper presents a zero-dependency, deterministic computational architecture implemented in signed 32-bit `Q16.16` fixed-point arithmetic (`1.0 === 65536`). We formalize (1) an inverse-velocity bristle-tapering function modeling *sumi* ink absorption and dry-brush *kasure* filament separation on *washi* paper; (2) a bounded geometric loop-closure predicate identifying closed *Ensō* trajectories via aspect-ratio bounds, arc-length-to-circumference ratios, and endpoint breath-gap tolerances; and (3) a strict dual-ledger separation (`Ledger 1` deterministic state transitions vs. `Ledger 2` read-only WebAudio and HTML5 Canvas synthesis) anchored across six historical paleographic eras (*Tensho*, *Reisho*, *Kaisho*, *Gyōsho*, *Sōsho*, and *Kana*). All invariants are verified via automated unit tests (`node --test`: 3/3 passing) and bit-exact `SHA-256` scroll receipts.

**Keywords:** *Shodō*, *Ensō*, fixed-point arithmetic (`Q16.16`), computational paleography, geometric loop recognition, deterministic simulation, WebAudio synthesis.

---

## 1. Introduction & Paleographic Foundations

East Asian brush calligraphy (*Shodō*, 書道) treats the calligraphic line not merely as a phonetic signifier, but as an irreversible temporal record of velocity, pressure, and breath (Nakata, 1973; Stevens, 1995). Across more than two millennia of East Asian paleographic evolution, script styles progressed from uniform architectural engravings to fluid cursive ribbons:

1. **Seal Script (*Tensho*, 篆書; c. 1200 BCE – 200 CE):** Uniform stroke width derived from Shang/Zhou oracle-bone inscriptions (*kōkotsubun*) and Qin dynasty bronze standards, preserved in modern vermilion *Hanko* seals.
2. **Clerical Script (*Reisho*, 隷書; c. 200 BCE – 200 CE):** Introduced dramatic horizontal wave flaring (*hataku*) suited to rapid brush execution on wooden slips.
3. **Regular Script (*Kaisho*, 楷書; 7th–9th Century CE):** Codified during the Tang dynasty and transmitted to Nara/Heian Japan by masters such as Kūkai (*Sanpitsu*), exemplified by the eight foundational strokes of 永 (*ei*, "eternity").
4. **Semi-Cursive Script (*Gyōsho*, 行書; 9th–12th Century CE):** Softened corner transitions maintaining legibility while introducing continuous rhythmic linkage.
5. **Grass Script (*Sōsho*, 草書) & *Kana* (*Onnade*, 仮名; 10th–16th Century CE):** Distilled complex characters into continuous momentum gestures, giving rise both to Zen *Ensō* (円相) single-breath circles (Seo, 2007) and to phonetic *Hiragana* developed by Heian court writers such as Murasaki Shikibu and Sei Shōnagon.

Interactive digital art systems inspired by calligraphic gesture—most notably Clover Studio's *Ōkami* (2006)—demonstrated that real-time stroke recognition can bridge painterly aesthetics and responsive ludic feedback. However, replicating fluid brush dynamics reliably on mobile ARM64 browsers requires exact integer arithmetic and explicit photosensitivity-safe rendering guarantees.

---

## 2. Mathematical Formulation (`Ledger 1`)

### 2.1 Signed 32-Bit `Q16.16` Fixed-Point Substrate

To eliminate IEEE-754 floating-point rounding divergence across devices, all spatial coordinates are projected onto the signed 32-bit fixed-point ring $\mathbb{Z}_{Q16.16}$ with scaling factor $S = 2^{16} = 65536$:

$$q(x) = \text{clamp}_{[-2^{31},\, 2^{31}-1]}\!\left(\lfloor x \cdot 2^{16} + 0.5 \rfloor\right)$$

Fixed-point multiplication is evaluated via 64-bit intermediate promotion (`BigInt`) prior to arithmetic right-shift by 16 bits, preventing intermediate overflow:

$$a \otimes_{Q} b = \text{clamp}_{[-2^{31},\, 2^{31}-1]}\!\left( \left\lfloor \frac{\text{int64}(a) \cdot \text{int64}(b)}{2^{16}} \right\rfloor \right)$$

### 2.2 Inverse-Velocity Bristle Rheology

Let $\mathbf{p}_k = (x_k, y_k) \in \mathbb{R}^2$ denote the dequantized canvas coordinates at sample index $k$, and let $\Delta s_k = \|\mathbf{p}_k - \mathbf{p}_{k-1}\|_2$ denote the Euclidean step displacement per sampling interval. When $\Delta s_k \ge \delta_{\min}$ ($\delta_{\min} = 1.2\text{ px}$), the target bristle diameter $w_{\text{target}}(\Delta s_k)$ is modeled as a bounded inverse-linear function of step velocity:

$$w_{\text{target}}(\Delta s_k) = \text{clamp}_{[w_{\min},\, w_{\max}]}\!\left( w_0 - \alpha \cdot \min(\Delta s_k, \Delta s_{\max}) \right)$$

with empirical constants $w_0 = 18.5\text{ px}$, $\alpha = 0.42$, $w_{\min} = 2.4\text{ px}$, $w_{\max} = 18.5\text{ px}$, and $\Delta s_{\max} = 45.0\text{ px}$. To prevent abrupt polygonal kinks while preserving crisp tip tapering (*harai*), the rendered stroke width $w_k$ evolves via first-order exponential smoothing:

$$w_k = \beta w_{k-1} + (1 - \beta)\, w_{\text{target}}(\Delta s_k), \qquad \beta = 0.55$$

When $w_k < 6.5\text{ px}$, secondary parallel dry-brush filaments (*kasure*) are emitted at fixed lateral offset $(\Delta x, \Delta y) = (+2.4, -1.8)\text{ px}$ with opacity $\gamma = 0.35$.

### 2.3 Geometric Loop-Closure Predicate for *Ensō* Recognition

Given a completed discrete trajectory $\Gamma = \{\mathbf{p}_0, \mathbf{p}_1, \dots, \mathbf{p}_{N-1}\}$ with $N \ge 14$, let the axis-aligned bounding dimensions and total polygonal arc length be defined as:

$$W = \max_i x_i - \min_i x_i, \qquad H = \max_i y_i - \min_i y_i, \qquad L(\Gamma) = \sum_{i=1}^{N-1} \|\mathbf{p}_i - \mathbf{p}_{i-1}\|_2$$

Let $\bar{D} = \frac{1}{2}(W + H)$ denote the mean bounding diameter, $C_{\text{ideal}} = \pi \bar{D}$ the ideal Euclidean circumference, and $g = \|\mathbf{p}_{N-1} - \mathbf{p}_0\|_2$ the terminal breath-gap distance. The trajectory $\Gamma$ is classified as a valid Celestial *Ensō* circle ($\text{IsEnso}(\Gamma) = \text{true}$) if and only if four simultaneous geometric invariants hold:

1. **Minimum Scale:** $\min(W, H) \ge 55.0\text{ px}$
2. **Isotropic Aspect Balance:** $\dfrac{\min(W, H)}{\max(W, H)} \ge 0.62$
3. **Terminal Breath-Gap Tolerance:** $g \le 0.38\,\bar{D}$ (accommodating the traditional open Zen breath gap while rejecting open arcs)
4. **Isoperimetric Arc-Length Ratio:** $0.72 \le \dfrac{L(\Gamma)}{\pi \bar{D}} \le 1.45$ (rejecting straight segments and multi-loop scribbles)

When $\text{IsEnso}(\Gamma) = \text{true}$, ten golden *sakura* petals are distributed radially around centroid $\mathbf{c} = \left(\frac{\min x_i + \max x_i}{2},\, \frac{\min y_i + \max y_i}{2}\right)$ at alternating radii $r_m = \frac{\bar{D}}{2} + (-1)^m \cdot 11\text{ px}$.

---

## 3. Dual-Ledger Architecture & Photosensitivity Governance

Following the strict separation of concerns established in `ndh-game-dev-kit` (Hedling, 2026), runtime execution is partitioned into two non-interfering ledgers:

* **Ledger 1 (Deterministic State & Audit Kernel):** `enso-kernel.js` mutates pure state objects (`strokes`, `sakuraBlossoms`, `ensoCount`, `stampedHanko`) solely from quantized `Q16.16` pointer coordinates and emits a canonical 64-character `SHA-256` receipt (`buildScrollReceipt`).
* **Ledger 2 (Read-Only Presentation & Acoustic Synthesis):** `washi-renderer.js` renders an opaque warm *washi* gradient (`#f7f1e1` $\to$ `#ebe0c5`) with disabled mobile tap-highlight (`-webkit-tap-highlight-color: transparent`) to guarantee zero luminance strobing. `shodo-audio.js` operates mute-by-default and synthesizes Japanese *Yo*-scale pentatonic frequencies ($f \in \{293.66, 329.63, 392.00, 440.00, 493.88, 587.33\}\text{ Hz}$) via low-pass filtered triangle and sine oscillators.

---

## 4. Verification Results

Automated verification using the built-in Node.js test runner (`node --test test/enso-kernel.test.mjs`) on ARM64 hardware confirms all three formal invariants:

1. **Inverse-Speed Bristle Tapering:** Slow movement ($\Delta s = 2.0\text{ px}$) produces $w > 16.0\text{ px}$, whereas rapid movement ($\Delta s = 35.0\text{ px}$) tapers to $w < 5.0\text{ px}$.
2. **Closed-Loop *Ensō* Recognition:** A 36-step discrete circle ($r = 95\text{ px}$) satisfies all four geometric predicates, incrementing `ensoCount` and generating exactly 10 radial *sakura* blossoms.
3. **False-Positive Rejection & Receipt Determinism:** Linear strokes yield `ensoCount === 0` and produce deterministic 64-character hexadecimal `SHA-256` scroll digests.

---

## References (APA 7th Edition)

* Clover Studio. (2006). *Ōkami* [Video game]. Capcom.
* Earnshaw, C. J. (1988). *Sho: Japanese calligraphy*. Tuttle Publishing.
* Hedling, B. S. (2026). *Non-dual epistemic architectures and geometric stabilization in high-dimensional transformer systems (v3.1)*. Zenodo. https://doi.org
* Nakata, Y. (1973). *The art of Japanese calligraphy* (A. Woodhull, Trans.). Weatherhill.
* Okakura, K. (1906). *The book of tea*. Fox, Duffield & Company.
* Seo, A. Y. (2007). *Ensō: Zen circles of enlightenment*. Weatherhill.
* Stevens, J. (1995). *Sacred calligraphy of the East* (3rd ed.). Shambhala Publications.
* Ueda, M. (1967). *Literary and art theories in Japan*. Press of Western Reserve University.
