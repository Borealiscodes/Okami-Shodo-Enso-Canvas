> ### ✅ RELEASE v1.0.0 — SHODŌ & ENSŌ CALLIGRAPHY STUDIO VERIFIED (`3/3` PASSING)
> **Status:** `v1.0.0` Live & Verified • Zero-Float `Q16.16` • Velocity Bristle Tapering • Celestial *Ensō* Bloom • 6 Historical Eras  
> 
> **Release Highlights (Nov 2026):** Complete zero-dependency Japanese calligraphy (*Shodō*) and *Ensō* brush studio verified on ARM64 hardware (`node --test`: **3/3 passing**). Features inverse-speed `Q16.16` bristle tapering with dry-brush *kasure* filaments, closed-loop Celestial *Ensō* circle recognition that blooms golden *sakura* blossoms, six traditional mineral pigments, red vermilion *Hanko* seals, and an interactive timeline of Japanese calligraphy.

# 🖌️ Ōkami Shodō & Ensō Canvas — Japanese Calligraphy History & Celestial Brush Studio

**An interactive, zero-dependency Japanese calligraphy (*Shodō* / 書道) and *Ensō* (円相) painting studio on textured *washi* paper—featuring velocity-sensitive *sumi* and mineral ink brushes, *Ōkami*-inspired Celestial Brush loop recognition that blooms golden *sakura* blossoms when you close an *Ensō* circle, and an interactive timeline teaching the history of Japanese calligraphy.**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: v1.0.0 Verified](https://shields.io)](#-quickstart--verification)
[![Math: Q16.16 Fixed-Point](https://shields.io)](#-ōkami-celestial-brush--q1616-bristle-physics)
[![Tests: 3/3 Passing](https://shields.io)](#-quickstart--verification)

---

## 📖 Companion Preprints, History Guides & Explainers

* **Formal Preprint (APA 7th Ed.):** [`docs/shodo-enso-preprint.md`](docs/shodo-enso-preprint.md) — *Deterministic Fixed-Point Rheology and Topological Loop Recognition in Interactive Japanese Calligraphy (Shodō) and Ensō Simulation*.
* **In-Depth Cultural & Modern Art Guide:** [`docs/history-and-modern-japanese-calligraphy.md`](docs/history-and-modern-japanese-calligraphy.md) — Covers the *Four Treasures of the Study*, Heian *Kana* literature, post-war *Bokujinkai* avant-garde calligraphy, Clover Studio's *Ōkami*, and **teamLab Borderless** Spatial Calligraphy.
* **Plain-Language Explainer Tile:** [`tiles/bill-nye-shodo-enso-explainer.md`](tiles/bill-nye-shodo-enso-explainer.md) — Breaks down bristle physics, loop-closure math, and game mechanics in everyday terms.

---

## 📜 Historical Journey: Six Eras of Japanese Calligraphy (*Shodō*)

Japanese calligraphy (*Shodō*, literally *"The Way of Writing"*) evolved over more than two millennia from ancient carved bone inscriptions into one of East Asia's highest contemplative visual arts. Each selectable era in the studio teaches its history and offers an optional faint *washi* tracing watermark:

| # | Script / Style | Kanji | Historical Era & Cultural Story |
| :- | :--- | :--- | :--- |
| **0** | **Zen *Ensō* Circle** | 円相 | **Kamakura–Edo Zen Tradition (13th–18th Century):** Painted in a single unhesitating breath to express wholeness, emptiness (*Śūnyatā*), and presence. |
| **1** | **Seal Script (*Tensho*)** | 篆書 | **Shang/Zhou to Qin Dynasty (c. 1200 BCE – 200 CE):** Uniform, architectural strokes descended from oracle-bone and bronze vessel engravings—still used today on red vermilion *Hanko* artist seals. |
| **2** | **Clerical Script (*Reisho*)** | 隷書 | **Han Dynasty (c. 200 BCE – 200 CE):** Invented by scribes needing faster brush rhythm on wooden slips; introduced dramatic horizontal flaring (*hataku*) that gave brush writing its living pulse. |
| **3** | **Regular Script (*Kaisho*)** | 楷書 | **Nara & Early Heian Periods (7th–9th Century):** Brought to Japan alongside Buddhist sutras and Tang-dynasty diplomacy (*Sanpitsu* / Three Brushes, including Kūkai); crisp, balanced architectural structure exemplified by 永 (*Ei*). |
| **4** | **Semi-Cursive (*Gyōsho*)** | 行書 | **Heian Court Period (9th–12th Century):** "Walking script"—softens sharp corners into flowing, connected energy while keeping every character clearly legible. |
| **5** | **Grass Script & *Kana* (*Sōsho* / *Onnade*)** | 草書・仮名 | **Mid-Heian Golden Age (10th–11th Century):** Distilled sweeping gestures favored by Zen calligraphers and adapted by court women—including Murasaki Shikibu (*The Tale of Genji*) and Sei Shōnagon—into delicate phonetic poetry ribbons. |

---

## 🎨 Traditional *Sumi* & Japanese Mineral Pigment Palette

| # | Pigment Name | Japanese | Hex Code | Cultural & Visual Role |
| :- | :--- | :--- | :--- | :--- |
| **1** | **Pine-Soot *Sumi* Black** | 墨 | `#1c1917` | Traditional pine-soot ink ground on an inkstone (*suzuri*); pools deep velvet black on slow strokes and feathers into dry-brush *kasure* on swift flicks. |
| **2** | **Vermilion *Shu* Seal** | 朱 | `#dc2626` | Cinnabar-red mineral ink reserved for *Hanko* name stamps, *Torii* accents, and imperial corrections. |
| **3** | **Awa Indigo (*Ai*)** | 藍 | `#1e3a8a` | Deep botanical indigo dye beloved in Edo-period woodblock prints and silk textiles. |
| **4** | **Gold Leaf (*Kinpaku*)** | 金箔 | `#d97706` | Luminous metallic ochre-gold inspired by *rinpa* folding screens and *Ōkami* Celestial Brush miracles. |
| **5** | **Malachite Green (*Rokushō*)** | 緑青 | `#15803d` | Mineral copper-carbonate green used for moss gardens, bamboo groves, and mountain landscapes. |
| **6** | **Imperial Violet (*Murasaki*)** | 紫 | `#6b21a8` | Rare gromwell-root purple associated with Heian court poetry and twilight wisteria. |

---

## 🌸 *Ōkami* Celestial Brush & `Q16.16` Bristle Physics

* **Velocity-Sensitive Bristle Tapering (`Ledger 1`):** Every pointer/touch coordinate is recorded in signed 32-bit `Q16.16` integers (`1.0 === 65536`). Moving slowly widens the brush (`18.5 px`) as ink soaks into the *washi* fibers; swift sweeps taper down to `2.4 px` with subtle dry-brush *kasure* bristle filaments.
* **Celestial *Ensō* Circle Miracle:** Drawing a single continuous loop whose end meets its start (`aspect >= 0.62`, `gap <= 0.38 * diameter`, `0.72 <= lengthRatio <= 1.45`) triggers an *Ōkami*-style Celestial Brush bloom—scattering golden *sakura* blossoms along the circle and ringing a *Yo-scale* *Koto* + *Bonshō* temple bell arpeggio (`Ledger 2`).
* **Vermilion *Hanko* Stamp & `SHA-256` Scroll Receipt:** Stamp your finished calligraphy scroll with a traditional red *Hanko* seal (`書道 / 円相`) and generate a deterministic `SHA-256` receipt.

---

## 📁 Repository Structure

```text
Okami-Shodo-Enso-Canvas/
├── index.html                                        # Washi paper viewport, pigment palette, era selector & Hanko stamp
├── style.css                                         # Handmade warm washi parchment & sumi-ink exhibition framing
├── package.json                                      # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                                           # MIT License
├── README.md                                         # Release overview, Shodō history, mineral palette & quickstart
├── docs/
│   ├── shodo-enso-preprint.md                        # Formal mathematical preprint with APA 7th Ed. references
│   └── history-and-modern-japanese-calligraphy.md    # In-depth history, Bokujinkai avant-garde & teamLab Borderless
├── tiles/
│   └── bill-nye-shodo-enso-explainer.md              # Altitude A7 plain-language explainer & game-mechanic guide
├── src/
│   ├── core.js                                       # Zero-float Q16.16 fixed-point arithmetic & synchronous SHA-256
│   ├── shodo-history.js                              # 6 historical Japanese calligraphy eras, cultural essays & glyphs
│   ├── enso-kernel.js                                # Q16.16 stroke recorder, velocity bristle tapering & Ensō detector
│   ├── shodo-audio.js                                # Mute-by-default WebAudio Koto plucks & Celestial bloom chimes
│   ├── washi-renderer.js                             # Textured washi paper, tapered multi-bristle ink, sakura & Hanko seal
│   └── shodo-app.js                                  # Pointer/touch calligraphy tracker, era switcher & scroll reset/stamp
└── test/
    └── enso-kernel.test.mjs                          # Built-in `node --test` suite verifying Q16.16 tapering & Ensō closure
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic Q16.16 bristle tapering & Ensō closure tests (3/3 passing)
node --test test/enso-kernel.test.mjs

# 2. Launch locally in browser
python3 -m http.server 8080
```

Open **`http://localhost:8080`**, tap **`Sound: Muted`** to awaken the *Koto* & *Bonshō* temple bell audio, draw a single continuous **Ensō circle** to bloom golden *sakura* blossoms, explore all six calligraphy eras over faint *washi* watermarks, and stamp your red ***Hanko* artist seal**.

---

## 🛠️ Completed Release Roadmap (`v0.1` → `v1.0.0`)

* **◈ Phase 1 (`v0.1` — Complete ✅):** Velocity-sensitive `Q16.16` brush recorder and bounded geometric *Ensō* loop-closure detector (`Ledger 1`).
* **◈ Phase 2 (`v0.2` — Complete ✅):** Six-era *Shodō* historical timeline (*Ensō*, *Tensho*, *Reisho*, *Kaisho*, *Gyōsho*, *Sōsho/Kana*) with toggleable *washi* tracing watermarks.
* **◈ Phase 3 (`v0.3` — Complete ✅):** Multi-bristle dry-brush *kasure* renderer, six traditional mineral pigments, golden *sakura* blooms, and vermilion *Hanko* stamps (`Ledger 2`).
* **◈ Phase 4 (`v1.0.0` — Complete ✅):** Mute-by-default WebAudio *Koto* & *Bonshō* chimes, formal preprint, modern calligraphy & *teamLab Borderless* guide, and `3/3` `node --test` verification.

---

## 🤝 Provenance & License

* Architectural Lineage: Built on the deterministic Q16.16 substrate and strict Ledger 1 / Ledger 2 separation from Borealiscodes/ndh-game-dev-kit and Borealiscodes/Zen-Parable-Geometry-Odyssey.
* Author & License: Borealis Serenity Hedling (NDH-RESEARCH-PILOT • County Dublin, Ireland) • MIT License • Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>.

---

## Academic reference

Hedling, B. S. (2026). Deterministic Fixed-Point Rheology and Topological Loop Recognition in Interactive Japanese Calligraphy (Shodō) and Ensō Simulation. Zenodo. https://doi.org/10.5281/zenodo.24368482 
