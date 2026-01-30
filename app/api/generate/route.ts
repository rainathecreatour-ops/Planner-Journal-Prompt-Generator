import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  prompt: z.string().min(20)
});

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());

    const provider = process.env.LLM_PROVIDER || "openai";
    if (provider !== "openai") {
      return NextResponse.json(
        { error: "Only OPENAI is wired in this starter. Set LLM_PROVIDER=openai." },
        { status: 400 }
      );
    }

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY. If you only want Prompt Only mode, ignore this and don't click Generate Text." },
        { status: 400 }
      );
    }

    // Minimal OpenAI chat call (no SDK needed)
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You output strictly valid JSON only. No markdown." },
          { role: "user", content: body.prompt }
        ],
        temperature: 0.7
      })
    });

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json({ error: `Provider error: ${errText}` }, { status: 500 });
    }

    const data = await r.json();
    const output = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 400 });
  }
}
