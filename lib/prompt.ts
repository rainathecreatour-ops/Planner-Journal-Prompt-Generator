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

export function buildPrompt(input: PromptInput) {
  const topicsLine = input.topics.length ? input.topics.join(", ") : "General";
  const notes = input.extraNotes?.trim();

  return `
You are a professional planner & journal designer.

Create a ${input.pages}-page ${input.format} for: ${input.audience}.
Occasion: ${input.occasion}
Theme: ${input.theme}
Paper size: ${input.size}
Background style: ${input.background}
Font preference: ${input.font}
Color preset: ${input.colorPreset}
Topics to include: ${topicsLine}

REQUIREMENTS:
- Print-friendly (black text works; accent color used lightly)
- Clean hierarchy: headings, subheadings, writing space
- Include page variety (do not repeat the same layout too often)
- Provide a clear page-by-page outline and the actual text for each page
- Add 3 cover title ideas + subtitle ideas
- Include 10 “bonus prompts” pages spread across the book (short writing prompts)

OUTPUT FORMAT (IMPORTANT):
Return JSON with keys:
{
  "coverIdeas": [{"title":"","subtitle":""}],
  "styleGuide": {"fonts":"","colors":"","background":"","themeNotes":""},
  "pages": [
    {"pageNumber": 1, "title": "", "layout": "", "content": ""}
  ]
}

${notes ? `EXTRA NOTES:\n- ${notes}\n` : ""}
`.trim();
}
