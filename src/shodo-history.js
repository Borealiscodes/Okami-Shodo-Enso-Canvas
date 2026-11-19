/**
 * src/shodo-history.js — Six Historical Eras of Japanese Calligraphy & Mineral Pigment Palette
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const JAPANESE_PIGMENTS = [
  { id: "sumi", name: "Sumi Black", jp: "墨", hex: "#1c1917" },
  { id: "shu", name: "Vermilion Shu", jp: "朱", hex: "#dc2626" },
  { id: "ai", name: "Awa Indigo", jp: "藍", hex: "#1e3a8a" },
  { id: "kinpaku", name: "Gold Leaf", jp: "金箔", hex: "#d97706" },
  { id: "rokusho", name: "Malachite", jp: "緑青", hex: "#15803d" },
  { id: "murasaki", name: "Imperial Violet", jp: "紫", hex: "#6b21a8" },
];

export const SHODO_ERAS = [
  {
    id: "enso-zen",
    title: "0. Zen Ensō Circle (円相 • One-Breath Brush)",
    period: "Kamakura–Edo Zen Tradition (13th–18th Century)",
    glyph: "〇",
    reading: "Ensō — Circle of Togetherness & Emptiness",
    history:
      "In Zen Buddhism, painting an Ensō in a single unhesitating breath expresses the state of mind at that exact moment. Draw a continuous circle on the washi paper to trigger an Ōkami-style Celestial Brush sakura bloom!",
  },
  {
    id: "tensho",
    title: "1. Seal Script — Tensho (篆書)",
    period: "Shang/Zhou to Qin Dynasty (c. 1200 BCE – 200 CE)",
    glyph: "山",
    reading: "Yama (Mountain) — Pictographic Seal Geometry",
    history:
      "Descended from oracle-bone carvings and bronze ritual vessels, Tensho uses balanced, architectural strokes of even thickness. It survives today on red vermilion Hanko artist seals.",
  },
  {
    id: "reisho",
    title: "2. Clerical Script — Reisho (隷書)",
    period: "Han Dynasty (c. 200 BCE – 200 CE)",
    glyph: "川",
    reading: "Kawa (River) — Horizontal Wave Flaring",
    history:
      "Developed by scribes writing rapidly on bamboo and wooden slips, Reisho introduced the dramatic horizontal flare (hataku) that transformed rigid engravings into expressive brush art.",
  },
  {
    id: "kaisho",
    title: "3. Regular Script — Kaisho (楷書)",
    period: "Nara & Early Heian Periods (7th–9th Century)",
    glyph: "永",
    reading: "Ei (Eternity) — Contains All 8 Fundamental Brush Strokes",
    history:
      "Brought to Japan alongside Buddhist sutras by masters like Kūkai (one of the Sanpitsu, 'Three Brushes'), Kaisho is the foundational standard script. The character 永 ('Eternity') teaches all eight classic brush techniques.",
  },
  {
    id: "gyosho",
    title: "4. Semi-Cursive — Gyōsho (行書)",
    period: "Heian Court Period (9th–12th Century)",
    glyph: "風",
    reading: "Kaze (Wind) — Walking Script Rhythm",
    history:
      "Meaning 'walking script,' Gyōsho softens sharp Kaisho corners into continuous rhythmic motion while remaining clearly readable—ideal for letters, diaries, and poetic inscriptions.",
  },
  {
    id: "sosho-kana",
    title: "5. Grass Script & Kana — Sōsho / Onnade (草書・仮名)",
    period: "Mid-Heian Golden Age (10th–11th Century)",
    glyph: "あ",
    reading: "A (Hiragana) — Flowing Poetry Ribbon",
    history:
      "Court women writers—including Murasaki Shikibu (The Tale of Genji) and Sei Shōnagon (The Pillow Book)—distilled cursive Sōsho characters into fluid phonetic Hiragana (Onnade, 'women's hand') that flows like silk across illustrated scrolls.",
  },
];
