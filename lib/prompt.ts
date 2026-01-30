type PromptInput = {
  format: string;
  occasion: string;
  theme: string;
  background: string;
  font: string;
  colorPreset: string;
  topics: string[];
  audience: string;
  pages: number;
  size: "Letter" | "A4" | "A5";
  extraNotes: string;
};

function list(items: string[]) {
  return items.length ? items.join(", ") : "general productivity and wellness";
}

function backgroundDesc(bg: string) {
  if (bg === "grid") return "very subtle light gray grid paper pattern";
  if (bg === "dots") return "very subtle evenly spaced dotted paper pattern";
  if (bg === "lines") return "very subtle ruled lines paper pattern";
  return "plain white paper background";
}

function themeStyle(theme: string) {
  const t = theme.toLowerCase();
  if (t.includes("boho")) return "boho minimalist aesthetic, soft organic shapes, neutral textures, airy spacing";
  if (t.includes("floral")) return "minimal floral line art, soft botanical accents, delicate stems and petals";
  if (t.includes("luxury")) return "luxury minimalist aesthetic, elegant spacing, subtle gold-style accents (printed look)";
  if (t.includes("cute")) return "cute minimal aesthetic, rounded shapes, friendly soft style, simple doodle accents";
  if (t.includes("modern")) return "modern clean aesthetic, geometric accents, crisp lines, minimal layout";
  return "minimal clean aesthetic with lots of white space";
}

function colorPalette(color: string) {
  if (color === "lavender") return "lavender, soft lilac, white, light gray, charcoal text";
  if (color === "tealGold") return "teal, warm cream, subtle gold accents, charcoal text";
  if (color === "rose") return "rose, blush, white, light gray, charcoal text";
  if (color === "forest") return "forest green, sage, warm cream, charcoal text";
  return "black, white, light gray neutral palette";
}

function fontStyle(font: string) {
  if (font === "playfair") return "elegant serif typography for headings with clean sans-serif body text";
  if (font === "space") return "modern geometric typography with clean sans-serif body text";
  return "clean modern sans-serif typography";
}

export function buildImagePrompts(input: PromptInput) {
  const coverPrompt = `
Create a high-resolution PRINTABLE planner/journal FRONT COVER design.

STYLE:
${themeStyle(input.theme)}
Color palette: ${colorPalette(input.colorPreset)}
Typography style: ${fontStyle(input.font)}

DETAILS:
Planner type: ${input.format}
Occasion: ${input.occasion}
Audience: ${input.audience}
Topics: ${list(input.topics)}

LAYOUT RULES:
- Portrait orientation
- Minimalist layout with generous white space
- Centered title area
- Decorative elements must be subtle and minimal
- NO people, NO photos, NO logos, NO watermarks

TEXT PLACEHOLDERS (exact text):
Title: "${input.format}"
Subtitle: "${input.occasion} • ${input.theme} Edition"

PRINT QUALITY:
- Clean edges
- Professional printable look
- White or very light background
`.trim();

  const interiorPrompt = `
Create a seamless interior planner page background.

BACKGROUND STYLE:
${backgroundDesc(input.background)}
Theme overlay: ${themeStyle(input.theme)}
Color palette: ${colorPalette(input.colorPreset)}

RULES:
- Extremely subtle (must not affect readability)
- No text, no words, no icons
- Seamless / tileable pattern
- Optimized for printing (minimal ink)
`.trim();

  const iconsPrompt = `
Create a cohesive set of 24 minimal planner icons/stickers.

STYLE:
${themeStyle(input.theme)}
Color palette: ${colorPalette(input.colorPreset)}

INCLUDE ICONS:
calendar, checklist, habit tracker, heart, star, water cup, dumbbell, book, lightbulb,
clock, shopping cart, meal, phone, envelope, location pin, smiley, moon, sun,
flower, leaf, target, piggy bank, pen

RULES:
- Flat vector line icons
- Consistent stroke width
- No text, no branding, no watermark
- Transparent background preferred (or white background)
`.trim();

  return {
    coverPrompt,
    interiorPrompt,
    iconsPrompt
  };
}
