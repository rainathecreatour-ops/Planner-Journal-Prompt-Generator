type PromptInput = {
  format: string;          // Daily Planner, Weekly Planner, etc.
  occasion: string;        // Self-Care, Business, Wedding...
  theme: string;           // Minimal, Boho, Floral...
  background: string;      // plain, grid, dots, lines
  font: string;            // inter, playfair, space
  colorPreset: string;     // neutral, lavender, tealGold...
  topics: string[];        // Gratitude, Goals...
  audience: string;        // Adults, Teens...
  pages: number;           // reference only
  size: "Letter" | "A4" | "A5";
  extraNotes: string;      // user notes
};

function list(items: string[]) {
  return items.length ? items.join(", ") : "general productivity and wellness";
}

function backgroundDesc(bg: string) {
  if (bg === "grid") return "subtle light gray grid paper (very faint, print-friendly)";
  if (bg === "dots") return "subtle dotted paper (very faint, print-friendly)";
  if (bg === "lines") return "subtle ruled lines (very faint, print-friendly)";
  return "clean plain white paper (print-friendly)";
}

function themeStyle(theme: string) {
  const t = theme.toLowerCase();
  if (t.includes("boho")) return "boho minimalist aesthetic, soft organic shapes, warm neutral textures, airy spacing";
  if (t.includes("floral")) return "minimal floral line art, delicate botanical accents, lots of white space";
  if (t.includes("luxury")) return "luxury minimal aesthetic, elegant spacing, subtle gold-foil style accents (printed look, not metallic)";
  if (t.includes("cute")) return "cute clean aesthetic, rounded shapes, simple doodles, friendly minimal icons";
  if (t.includes("modern")) return "modern clean aesthetic, geometric accents, crisp thin lines";
  return "minimal clean aesthetic with lots of white space";
}

function colorPalette(color: string) {
  if (color === "lavender") return "lavender, soft lilac, white, light gray, charcoal text";
  if (color === "tealGold") return "teal, warm cream, subtle gold accents, charcoal text";
  if (color === "rose") return "rose, blush, white, light gray, charcoal text";
  if (color === "forest") return "forest green, sage, warm cream, charcoal text";
  return "black, white, light gray neutral palette";
}

function fontVibe(font: string) {
  if (font === "playfair") return "typography vibe: elegant serif headings + clean sans-serif body text";
  if (font === "space") return "typography vibe: modern geometric headings + clean sans-serif body text";
  return "typography vibe: clean modern sans-serif typography";
}

function sizeSpec(size: "Letter" | "A4" | "A5") {
  if (size === "A4") return "A4 portrait ratio";
  if (size === "A5") return "A5 portrait ratio";
  return "US Letter portrait ratio";
}

function notesBlock(extraNotes: string) {
  const n = extraNotes?.trim();
  return n ? `\nEXTRA NOTES:\n- ${n}\n` : "";
}

/**
 * These prompts are designed to be pasted into:
 * Midjourney / DALL·E / ImageFX / Leonardo.
 * They generate planner/journal DESIGN ASSETS.
 */
export function buildPlannerDesignImagePrompts(input: PromptInput) {
  const base = `
Design style: ${themeStyle(input.theme)}
Color palette: ${colorPalette(input.colorPreset)}
${fontVibe(input.font)}
Paper/background: ${backgroundDesc(input.background)}
Audience: ${input.audience}
Product type: ${input.format}
Occasion: ${input.occasion}
Topics: ${list(input.topics)}
Canvas: ${sizeSpec(input.size)}
Rules: print-friendly, clean layout, lots of whitespace, no watermarks, no logos, no copyrighted brands
`.trim();

  // 1) FRONT COVER
  const frontCoverPrompt = `
Create a PRINTABLE FRONT COVER design for a planner/journal.
${base}

COMPOSITION:
- Portrait cover, centered title area
- Minimal decorative elements that match the theme
- Include placeholder text EXACTLY:
  Title: "${input.format}"
  Subtitle: "${input.occasion} • ${input.theme} Edition"
- Optional small motif related to topics: ${list(input.topics)}

PRINT RULES:
- High resolution, crisp lines, clean margins
- No photos of real people, no busy textures
${notesBlock(input.extraNotes)}
`.trim();

  // 2) BACK COVER
  const backCoverPrompt = `
Create a matching PRINTABLE BACK COVER design for the same planner/journal.
${base}

COMPOSITION:
- Matching theme + palette to front cover
- Very minimal
- Include a small “About this planner” text block area as a placeholder (no actual text required)
- Add a subtle border or corner accents (optional)

PRINT RULES:
- High resolution, clean margins, no watermarks
${notesBlock(input.extraNotes)}
`.trim();

  // 3) INTERIOR PAGE TEMPLATE (DESIGN LOOK)
  // This is the key: you want a prompt that produces a page layout *design*.
  const interiorPageTemplatePrompt = `
Create a PRINTABLE INTERIOR PAGE TEMPLATE design for a ${input.format}.
${base}

LAYOUT REQUIREMENTS (make it look like a real planner page):
- Header area (date/week/month label area)
- Section blocks and lines for writing space
- A small sidebar area for notes or priorities
- A minimal habit tracker mini-box (optional)
- Use ${backgroundDesc(input.background)} very faintly so text remains readable
- Keep accents subtle and minimal ink usage

RULES:
- No long paragraphs, no heavy fills
- No watermarks, no logos
${notesBlock(input.extraNotes)}
`.trim();

  // 4) DIVIDER PAGE (SECTION)
  const dividerPagePrompt = `
Create a PRINTABLE SECTION DIVIDER PAGE design for a planner/journal.
${base}

DIVIDER REQUIREMENTS:
- Bold section title area with placeholder text:
  "SECTION TITLE"
- Decorative theme elements (very minimal)
- Optional tab look on the side (subtle)
- Clean whitespace and premium feel

RULES:
- No branding, no watermarks
${notesBlock(input.extraNotes)}
`.trim();

  // 5) ICON / STICKER SHEET
  const stickerSheetPrompt = `
Create a PRINTABLE planner sticker sheet (icons) matching the same planner design.
${base}

CONTENT:
- 30–50 small icons and labels styled consistently (minimal)
- Include icons: calendar, checklist, habit, water, workout, meal, notes, goals, appointment, reminder, self-care
- Add a few decorative mini elements matching the theme (tiny leaves, dots, stars, florals depending on theme)

OUTPUT LOOK:
- Sticker sheet layout on white background
- Consistent stroke width, flat vector look, print-friendly

RULES:
- No watermark, no logos
${notesBlock(input.extraNotes)}
`.trim();

  // 6) ETSY LISTING MOCKUP (OPTIONAL BUT HIGH VALUE)
  const listingMockupPrompt = `
Create an ETSY-STYLE PRODUCT MOCKUP image for a planner/journal listing.
${base}

SCENE:
- Flat-lay desk scene or neutral tabletop
- Show the planner cover as the hero item (front cover visible)
- Add subtle props that match theme (pen, coffee cup, flowers for floral theme, etc.)
- Soft natural lighting, minimal, premium

RULES:
- No brand names, no logos, no watermark
- The cover design should match the front cover prompt style
${notesBlock(input.extraNotes)}
`.trim();

  return {
    frontCoverPrompt,
    backCoverPrompt,
    interiorPageTemplatePrompt,
    dividerPagePrompt,
    stickerSheetPrompt,
    listingMockupPrompt
  };
}
