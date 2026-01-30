type PromptInput = {
  format: string;          // Daily Planner, Weekly Planner, Journal, etc.
  occasion: string;        // Self-Care, Business, Wedding...
  theme: string;           // Minimal, Boho, Floral...
  background: string;      // plain, grid, dots, lines
  font: string;            // inter, playfair, space
  colorPreset: string;     // neutral, lavender, tealGold...
  topics: string[];
  audience: string;
  pages: number;
  size: "Letter" | "A4" | "A5";
  extraNotes: string;
};

function list(items: string[]) {
  return items.length ? items.join(", ") : "general planning and journaling";
}

function backgroundDesc(bg: string) {
  if (bg === "grid") return "very faint grid paper, print-friendly";
  if (bg === "dots") return "very faint dotted paper, print-friendly";
  if (bg === "lines") return "very faint ruled lines, print-friendly";
  return "clean plain white paper";
}

function themeStyle(theme: string) {
  const t = theme.toLowerCase();
  if (t.includes("boho")) return "boho minimalist aesthetic, soft organic shapes, warm neutrals";
  if (t.includes("floral")) return "minimal floral line art, delicate botanical accents";
  if (t.includes("luxury")) return "luxury minimal aesthetic, elegant spacing, subtle gold-style accents";
  if (t.includes("cute")) return "cute clean aesthetic, rounded shapes, simple doodles";
  if (t.includes("modern")) return "modern clean aesthetic, crisp lines, geometric accents";
  return "minimal clean aesthetic with lots of white space";
}

function colorPalette(color: string) {
  if (color === "lavender") return "lavender, soft lilac, white, light gray";
  if (color === "tealGold") return "teal, warm cream, subtle gold accents";
  if (color === "rose") return "rose, blush, white, light gray";
  if (color === "forest") return "forest green, sage, warm cream";
  return "black, white, light gray neutral palette";
}

function fontVibe(font: string) {
  if (font === "playfair") return "elegant serif headings with clean sans-serif body text";
  if (font === "space") return "modern geometric typography with clean sans-serif body text";
  return "clean modern sans-serif typography";
}

function sizeSpec(size: "Letter" | "A4" | "A5") {
  if (size === "A4") return "A4 portrait layout";
  if (size === "A5") return "A5 portrait layout";
  return "US Letter portrait layout";
}

/**
 * MAIN EXPORT — THIS IS WHAT YOUR APP CALLS
 * Generates IMAGE PROMPTS for planner & journal DESIGN ASSETS
 */
export function buildPlannerDesignImagePrompts(input: PromptInput) {
  const baseStyle = `
Design style: ${themeStyle(input.theme)}
Color palette: ${colorPalette(input.colorPreset)}
Typography: ${fontVibe(input.font)}
Paper style: ${backgroundDesc(input.background)}
Audience: ${input.audience}
Product: ${input.format}
Occasion: ${input.occasion}
Topics: ${list(input.topics)}
Canvas size: ${sizeSpec(input.size)}
Rules: printable, clean layout, lots of white space, no logos, no watermarks
`.trim();

  // FRONT COVER
  const frontCoverPrompt = `
Create a PRINTABLE PLANNER / JOURNAL FRONT COVER DESIGN.

${baseStyle}

LAYOUT:
- Portrait orientation
- Centered title area
- Minimal decorative elements that match the theme
- Include placeholder text exactly:
  Title: "${input.format}"
  Subtitle: "${input.occasion} • ${input.theme} Edition"

STYLE NOTES:
- Professional, clean, modern
- No photos of real people
`.trim();

  // BACK COVER
  const backCoverPrompt = `
Create a MATCHING PRINTABLE BACK COVER DESIGN.

${baseStyle}

LAYOUT:
- Minimal, clean
- Subtle decorative accents
- Space for a short description (placeholder area only)
`.trim();

  // INTERIOR PAGE DESIGN
  const interiorPageTemplatePrompt = `
Create a PRINTABLE INTERIOR PAGE DESIGN TEMPLATE.

${baseStyle}

PAGE LAYOUT:
- Header area (date / week / section title)
- Writing sections with lines or boxes
- Optional small habit tracker or notes box
- Very light background so text is readable when printed

IMPORTANT:
- This should look like a REAL planner or journal page design
- Use placeholder labels only (no long text)
`.trim();

  // DIVIDER PAGE
  const dividerPagePrompt = `
Create a PRINTABLE SECTION DIVIDER PAGE DESIGN.

${baseStyle}

DIVIDER STYLE:
- Bold section title area (placeholder text: "SECTION TITLE")
- Minimal decorative accents
- Clean, premium feel
`.trim();

  // STICKER / ICON SHEET
  const stickerSheetPrompt = `
Create a PRINTABLE PLANNER STICKER / ICON SHEET.

${baseStyle}

INCLUDE ICONS:
calendar, checklist, habit, water, workout, meal, notes, goals,
appointment, reminder, self-care, heart, star, clock, flag

STYLE:
- Flat vector icons
- Consistent stroke width
- White or transparent background
`.trim();

  return {
    frontCoverPrompt,
    backCoverPrompt,
    interiorPageTemplatePrompt,
    dividerPagePrompt,
    stickerSheetPrompt
  };
}
