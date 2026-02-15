import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
  }
  try {
    const body = await req.json();
    const systemPrompt =
      "You are TerraWatch, an environmental intelligence AI. Given the following real-time environmental data for a city, generate a concise, personalized climate intelligence brief in 4-5 sentences. Cover: current air quality and health advice, temperature trends vs historical norms, upcoming weather risks, and one actionable recommendation. Be specific with numbers. Be direct and useful, not generic.";
    const userContent =
      typeof body.data === "string"
        ? body.data
        : JSON.stringify(body.data || body);

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 400,
        temperature: 0.6,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "Groq request failed");
    const text = data?.choices?.[0]?.message?.content ?? "";
    return Response.json({ brief: text });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Climate brief failed" },
      { status: 502 }
    );
  }
}
