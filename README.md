> ### 🚧 UNDER CONSTRUCTION — ŌKAMI-INSPIRED SHODŌ & ENSŌ CALLIGRAPHY STUDIO (PRE-ALPHA)
> **Status:** Active Architectural Scaffolding & Celestial Brush Prototyping • Zero-Float `Q16.16` • Zero Dependencies  
> 
> **Project Scope:** An interactive Japanese calligraphy (*Shodō*) and *Ensō* brush painting studio combining velocity-sensitive *sumi* and mineral ink bristles, *Ōkami*-inspired Celestial Brush circle recognition, and an interactive historical journey through the six foundational scripts of Japanese calligraphy.

# 🖌️ Ōkami Shodō & Ensō Canvas — Japanese Calligraphy History & Celestial Brush Studio

**An interactive, zero-dependency Japanese calligraphy (*Shodō* / 書道) and *Ensō* (円相) painting studio on textured *washi* paper—featuring velocity-sensitive *sumi* and mineral ink brushes, *Ōkami*-inspired Celestial Brush loop recognition that blooms golden *sakura* blossoms when you close an *Ensō* circle, and an interactive timeline teaching the history of Japanese calligraphy.**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: Pre-Alpha Scaffolding](https://shields.io)](#-build-roadmap-v01--v10)
[![Math: Q16.16 Fixed-Point](https://shields.io)](#-ōkami-celestial-brush--q1616-bristle-physics)
[![Audio: Koto & Brush Whisper](https://shields.io)](#-repository-scaffolding)

---

## 📜 Historical Journey: Six Eras of Japanese Calligraphy (*Shodō*)

Japanese calligraphy (*Shodō*, literally *"The Way of Writing"*) evolved over more than two millennia from ancient carved bone inscriptions into one of East Asia's highest contemplative visual arts. Each selectable era in the studio teaches its history and offers an optional faint *washi* tracing watermark:

| # | Script / Style | Kanji | Historical Era & Cultural Story |
| :- | :--- | :--- | :--- |
| **1** | **Seal Script (*Tensho*)** | 篆書 | **Shang/Zhou to Qin Dynasty (c. 1200 BCE – 200 CE):** Uniform, architectural strokes descended from oracle-bone and bronze vessel engravings—still used today on red vermilion *Hanko* artist seals. |
| **2** | **Clerical Script (*Reisho*)** | 隷書 | **Han Dynasty (c. 200 BCE – 200 CE):** Invented by scribes needing faster brush rhythm on wooden slips; introduced dramatic horizontal flaring (*hataku*) that gave brush writing its living pulse. |
| **3** | **Regular Script (*Kaisho*)** | 楷書 | **Nara & Early Heian Periods (7th–9th Century):** Brought to Japan alongside Buddhist sutras and Tang-dynasty diplomacy (*Sanpitsu* / Three Brushes, including Kūkai); crisp, balanced architectural structure. |
| **4** | **Semi-Cursive (*Gyōsho*)** | 行書 | **Heian Court Period (9th–12th Century):** "Walking script"—softens sharp corners into flowing, connected energy while keeping every character clearly legible. |
| **5** | **Grass Script (*Sōsho*)** | 草書 | **Kamakura & Muromachi Zen Eras (12th–16th Century):** "Running/grass script"—distills characters into single sweeping gestures of pure breath and momentum, favored by Zen calligraphers painting *Ensō* circles. |
| **6** | **Hiragana & *Onnade* (*Kana*)** | 仮名 | **Mid-Heian Literature Golden Age (10th–11th Century):** Developed predominantly by court women—including Murasaki Shikibu (*The Tale of Genji*) and Sei Shōnagon (*The Pillow Book*)—transforming fluid *Sōsho* forms into delicate phonetic poetry ribbons. |

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

* **Velocity-Sensitive Bristle Tapering (`Ledger 1`):** Every pointer/touch coordinate is recorded in signed 32-bit `Q16.16` integers (`1.0 === 65536`). Moving slowly widens the brush (`18 px`) as ink soaks into the *washi* fibers; swift sweeps taper down to `2 px` with subtle dry-brush bristle streaks.
* **Celestial *Ensō* Circle Miracle:** Drawing a single continuous loop whose end meets its start (`closureRatio >= 0.72` with circular aspect balance) triggers an *Ōkami*-style Celestial Brush bloom—scattering golden *sakura* blossoms along the circle and ringing a *Yo-scale* *Koto* + *Bonshō* temple bell chord (`Ledger 2`).
* **Vermilion *Hanko* Stamp & `SHA-256` Scroll Receipt:** Stamp your finished calligraphy scroll with a traditional red *Hanko* seal and generate a deterministic `SHA-256` receipt.

---

## 📁 Repository Scaffolding

```text
Okami-Shodo-Enso-Canvas/
├── index.html                    # Washi paper viewport, pigment palette, era selector & Hanko stamp button
├── style.css                     # Handmade warm washi parchment & sumi-ink exhibition framing
├── package.json                  # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                       # MIT License
├── README.md                     # History of Shodō, mineral pigments, Celestial Brush & scaffolding
├── src/
│   ├── core.js                   # Zero-float Q16.16 fixed-point arithmetic & synchronous SHA-256
│   ├── shodo-history.js          # 6 historical Japanese calligraphy eras, cultural essays & tracing paths
│   ├── enso-kernel.js            # Q16.16 stroke recorder, velocity bristle tapering & Ensō circle detector
│   ├── shodo-audio.js            # Mute-by-default WebAudio brush-on-paper whisper & Koto/Bell harmonics
│   ├── washi-renderer.js         # Textured washi paper, tapered multi-bristle ink strokes, sakura & Hanko seal
│   └── shodo-app.js              # Pointer/touch calligraphy tracker, era switcher & scroll reset/stamp
└── test/
    └── enso-kernel.test.mjs      # Built-in `node --test` suite verifying Q16.16 tapering & Ensō closure
```

---

## 🛠️ Build Roadmap (`v0.1` → `v1.0`)

* **`v0.1` (Velocity-Sensitive `Q16.16` Brush & *Ensō* Detector):** Record pointer paths in `Q16.16`, compute inverse-speed bristle width, and verify closed-loop *Ensō* recognition (`Ledger 1`).
* **`v0.2` (Six-Era *Shodō* History & Tracing Watermarks):** Add the interactive historical essays and faint *washi* tracing guides for *Tensho*, *Reisho*, *Kaisho*, *Gyōsho*, *Sōsho*, and *Kana*.
* **`v0.3` (Multi-Bristle *Washi* Renderer & *Hanko* Seal):** Render dry-brush *kasure* streaks, six traditional mineral pigments, golden *sakura* blooms, and vermilion *Hanko* stamps (`Ledger 2`).
* **`v1.0` (Brush Whisper & *Koto* Audio + Full Test Suite):** Wire mute-by-default brush-on-paper WebAudio synthesis and `node --test` verification.

---

## 🤝 Provenance & License

* **Architectural Lineage:** Built on the deterministic `Q16.16` substrate and strict `Ledger 1` / `Ledger 2` separation from [`Borealiscodes/ndh-game-dev-kit`](https://github.com) and [`Borealiscodes/Zen-Parable-Geometry-Odyssey`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • County Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`.
