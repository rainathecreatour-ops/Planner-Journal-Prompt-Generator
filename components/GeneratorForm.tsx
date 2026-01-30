"use client";

import { useMemo, useState } from "react";
import PreviewCard from "./PreviewCard";
import { buildPlannerDesignImagePrompts } from "@/lib/prompt";
import { BACKGROUNDS, COLOR_PRESETS, FONT_PRESETS, FORMAT_PRESETS, OCCASIONS, THEMES, TOPIC_SUGGESTIONS } from "@/lib/presets";

export default function GeneratorForm() {
  const [mode, setMode] = useState<"prompt" | "generate">("prompt");

  const [font, setFont] = useState(FONT_PRESETS[0].value);
  const [format, setFormat] = useState(FORMAT_PRESETS[0].value);
  const [occasion, setOccasion] = useState(OCCASIONS[0].value);
  const [theme, setTheme] = useState(THEMES[0].value);
  const [background, setBackground] = useState(BACKGROUNDS[0].value);
  const [colorPreset, setColorPreset] = useState(COLOR_PRESETS[0].value);

  const [topics, setTopics] = useState<string[]>(["Gratitude", "Goals"]);
  const [audience, setAudience] = useState("Adults");
  const [pages, setPages] = useState(30);
  const [size, setSize] = useState<"Letter" | "A4" | "A5">("Letter");
  const [extraNotes, setExtraNotes] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedFont = useMemo(() => FONT_PRESETS.find(f => f.value === font)!, [font]);
  const selectedBg = useMemo(() => BACKGROUNDS.find(b => b.value === background)!, [background]);
  const selectedColor = useMemo(() => COLOR_PRESETS.find(c => c.value === colorPreset)!, [colorPreset]);

 const imagePrompts = useMemo(() => {
  return buildPlannerDesignImagePrompts({
    format,
    occasion,
    theme,
    background,
    font,
    colorPreset,
    topics,
    audience,
    pages,
    size,
    extraNotes
  });
}, [format, occasion, theme, background, font, colorPreset, topics, audience, pages, size, extraNotes]);



  async function onGenerate() {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      setResult(data.output || "");
    } catch (e: any) {
      setResult(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function toggleTopic(t: string) {
    setTopics(prev => (prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]));
  }

  const bgStyle = `bg-pattern ${selectedBg.className}`;
  const fontClass = selectedFont.className;
  const accent = selectedColor.accent;

  return (
   <div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Cover Image Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.coverPrompt}</pre>
</div>

<div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Interior Background Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.interiorPrompt}</pre>
</div>

<div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Icon / Sticker Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.iconsPrompt}</pre>
</div>
            <button
              className={`px-3 py-1 rounded-full border ${mode === "prompt" ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300"}`}
              onClick={() => setMode("prompt")}
              type="button"
            >
              Prompt Only
            </button>
            <button
              className={`px-3 py-1 rounded-full border ${mode === "generate" ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300"}`}
              onClick={() => setMode("generate")}
              type="button"
            >
              Generate Text
            </button>
          </div>
        </div>

        <div className="grid gap-3 mt-4">
          <Field label="Format">
            <select className="w-full border rounded-lg p-2" value={format} onChange={(e) => setFormat(e.target.value)}>
              {FORMAT_PRESETS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Occasion">
              <select className="w-full border rounded-lg p-2" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                {OCCASIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>

            <Field label="Theme">
              <select className="w-full border rounded-lg p-2" value={theme} onChange={(e) => setTheme(e.target.value)}>
                {THEMES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Font">
              <select className="w-full border rounded-lg p-2" value={font} onChange={(e) => setFont(e.target.value)}>
                {FONT_PRESETS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>

            <Field label="Background">
              <select className="w-full border rounded-lg p-2" value={background} onChange={(e) => setBackground(e.target.value)}>
                {BACKGROUNDS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Color Preset">
            <select className="w-full border rounded-lg p-2" value={colorPreset} onChange={(e) => setColorPreset(e.target.value)}>
              {COLOR_PRESETS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Pages">
              <input
                className="w-full border rounded-lg p-2"
                type="number"
                min={5}
                max={365}
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value || "30", 10))}
              />
            </Field>

            <Field label="Size">
              <select className="w-full border rounded-lg p-2" value={size} onChange={(e) => setSize(e.target.value as any)}>
                {["Letter", "A4", "A5"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <Field label="Audience">
              <input className="w-full border rounded-lg p-2" value={audience} onChange={(e) => setAudience(e.target.value)} />
            </Field>
          </div>

          <div>
            <div className="text-sm font-medium">Topics</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {TOPIC_SUGGESTIONS.map(t => {
                const active = topics.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTopic(t)}
                    className={`px-3 py-1 rounded-full border text-xs ${active ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-300"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Extra Notes (optional)">
            <textarea
              className="w-full border rounded-lg p-2 min-h-[90px]"
              value={extraNotes}
              onChange={(e) => setExtraNotes(e.target.value)}
              placeholder="Example: include habit tracker, mood tracker, and minimalist icons. Keep it print-friendly."
            />
          </Field>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg px-4 py-2 border border-neutral-300 hover:bg-neutral-50"
             onClick={() =>
  navigator.clipboard.writeText(
    `COVER PROMPT:\n${imagePrompts.coverPrompt}\n\nINTERIOR BACKGROUND PROMPT:\n${imagePrompts.interiorPrompt}\n\nICON PROMPT:\n${imagePrompts.iconsPrompt}`
  )
}

            >
              Copy Prompt
            </button>

            <button
              type="button"
              className="rounded-lg px-4 py-2 bg-neutral-900 text-white disabled:opacity-60"
              disabled={loading || mode !== "generate"}
              onClick={onGenerate}
              title={mode !== "generate" ? "Switch to Generate Text" : ""}
            >
              {loading ? "Generating..." : "Generate Text"}
            </button>
          </div>

          <div className="text-xs text-neutral-500">
            “Prompt Only” = you copy/paste into any AI.  
            “Generate Text” = the app calls the API route and returns output.
          </div>
        </div>
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="grid gap-4">
        <PreviewCard
          title="Live Preview"
          subtitle="This is a style preview + prompt output preview"
          fontClass={fontClass}
          bgStyle={bgStyle}
          accent={accent}
        >
          <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Style:</span>{" "}
              {format} • {occasion} • {theme} • {size} • {pages} pages
            </div>

            <div className="text-xs text-neutral-600">
              <span className="font-medium">Topics:</span> {topics.join(", ")}
            </div>

           <div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Cover Image Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.coverPrompt}</pre>
</div>

<div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Interior Background Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.interiorPrompt}</pre>
</div>

<div className="rounded-lg border border-neutral-200 bg-white p-3">
  <div className="text-xs font-semibold mb-2">Icon / Sticker Prompt</div>
  <pre className="whitespace-pre-wrap text-xs">{imagePrompts.iconsPrompt}</pre>
</div>


            {mode === "generate" && (
              <div className="rounded-lg border border-neutral-200 bg-white p-3">
                <div className="text-xs font-semibold mb-2">Generated Output</div>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed">
                  {result || "Click “Generate Text” to produce output here."}
                </pre>
              </div>
            )}
          </div>
        </PreviewCard>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
