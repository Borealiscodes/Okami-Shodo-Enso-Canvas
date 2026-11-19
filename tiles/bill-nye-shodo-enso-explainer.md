# 🟧 Bill Nye Tile: Ōkami Shodō & Ensō Canvas (How Brush Speed & Geometry Turn Ink into Magic!)

**Altitude:** `A7` (Public-Facing Clarity Layer • Zero Jargon • Non-Activating)  
**Companion Runtime:** `Okami-Shodo-Enso-Canvas v1.0.0` (`Q16.16` • Washi Studio • `3/3` Tests Passing)  
**Companion Preprint:** [`docs/shodo-enso-preprint.md`](../docs/shodo-enso-preprint.md)  
**Maintainer:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` · County Dublin, Ireland)  

---

## ⭐ Bill Nye Says…

> “Kids!  
> 
> Grab a real bamboo calligraphy brush dipped in *sumi* ink and press it slowly onto handmade *washi* paper—the ink soaks outward into a thick, velvety pool! Now flick your wrist quickly across the page—the bristles lift and split into crisp, feathery dry-brush streaks!  
> 
> That isn't magic—that is **fluid physics and geometry**! And in **Ōkami Shodō & Ensō Canvas**, a few dozen lines of exact integer math measure your finger's speed and shape in real time—blooming golden *sakura* blossoms whenever you draw a balanced Zen *Ensō* circle!”

---

## 🖌️ Part 1: How the Digital Calligraphy Brush Works

Even though the entire studio runs in vanilla JavaScript with zero external libraries, three clever math tricks make the brush feel alive:

* **1. Speed-Sensitive Bristle Tapering (`computeBristleWidth`):**  
  Every time your finger or stylus moves, the engine measures how far you traveled since the last sample. When you move **slowly**, the brush widens up to `18.5 pixels` (just like ink soaking into absorbent mulberry paper). When you sweep **fast**, it tapers down to `2.4 pixels` and adds delicate parallel dry-brush filaments (*kasure*).
* **2. Four-Check *Ensō* Circle Detector (`evaluateEnsoClosure`):**  
  How does the computer know you drew an *Ensō* circle instead of a straight line or a scribble—without using heavy AI? It checks four simple geometry rules when you lift your finger:
  1. **Big Enough:** At least `55 pixels` wide and tall.
  2. **Round Enough:** Width and height are reasonably balanced (no skinny ovals).
  3. **Closed Loop (With a Zen Breath Gap!):** Your ending point lands close to your starting point—leaving room for the traditional slight gap where the brush lifts off the paper.
  4. **One Clean Circle:** The total stroke length matches $\pi \times \text{diameter}$ ($\approx 3.14\times$ the width), so scribbles don't falsely trigger it!
* **3. Traditional Mineral Pigments & *Hanko* Seal:**  
  Alongside pine-soot *Sumi* black (`墨`), you can paint with five historical Japanese mineral colors—*Shu* vermilion (`朱`), *Ai* indigo (`藍`), *Kinpaku* gold leaf (`金箔`), *Rokushō* malachite green (`緑青`), and *Murasaki* violet (`紫`)—and stamp your finished scroll with a red *Hanko* name seal!

---

## 📜 Part 2: Why the Six Historical Scripts Look Different

Calligraphy evolved because people needed **different tools for different jobs**:
* **Seal Script (*Tensho*, 篆書):** Carved into bronze and stone—even, architectural lines that still appear on red *Hanko* stamps today.
* **Clerical Script (*Reisho*, 隷書):** Written fast on wooden strips—introduced dramatic horizontal wave flares.
* **Regular Script (*Kaisho*, 楷書):** The gold standard of clarity—the character **永 (*Ei*, "Eternity")** contains all eight classic brush strokes in one character!
* **Semi-Cursive (*Gyōsho*, 行書) & Grass Script (*Sōsho*, 草書):** "Walking" and "running" scripts where strokes connect in one continuous breath.
* **Hiragana (*Kana* / *Onnade*, 仮名):** Developed in the Heian court by writers like Murasaki Shikibu (*The Tale of Genji*), turning flowing cursive shapes into delicate phonetic poetry ribbons.

---

## 🎮 Part 3: Game Design Mechanics This Studio Unlocks

Just like Clover Studio's classic adventure game ***Ōkami***, real-time shape recognition on a painted canvas opens up awesome game mechanics:

1. **Celestial Brush World Powers:** Draw a closed *Ensō* circle in the sky to summon a golden sun or bloom withered cherry trees; draw a swift horizontal slash to slice through bamboo obstacles.
2. **Calligraphy Rhythm & Breath Challenges:** Score strokes not just by tracing the shape, but by matching the historical rhythm—slow, steady strokes for *Tensho* seal script vs. swift, sweeping gestures for *Sōsho* grass script.
3. **Collectible Scroll & *Hanko* Gallery:** Export finished artworks along with their **`SHA-256` Scroll Receipt** to verify authentic player-drawn masterpieces.

---

## 🌍 Part 4: Other Real-World Domains That Use This Exact Math

| Real-World Domain | How It Uses This Exact Math |
| :--- | :--- |
| **✍️ Stylus & Digital Illustration Engines** | Maps pointer velocity and pressure curves to variable-width brush stamps and dry-brush bristle textures. |
| **📐 Computational Geometry & Shape Recognition** | Uses bounding-box aspect ratios and isoperimetric length-to-diameter ratios ($L / \pi D$) to classify circles and polygons in milliseconds. |
| **🏛️ Digital Heritage & Museum Interactives** | Lets museum visitors practice historical scripts over faint watermarks while reading the cultural story behind each era. |
| **🔒 Tamper-Evident Digital Signatures** | Records quantized `Q16.16` stroke trajectories and hashes session metadata with `SHA-256`. |

---

## 🧭 Provenance & Non-Activation Footer

* **Status:** Verified Educational Tile (`v1.0.0` Japanese Calligraphy & *Ensō* Studio • `3/3` Tests Passing)  
* **Non-Activation Clause:** Descriptive educational tile only; strictly non-activating.  
* **Signed-off-by:** `Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
