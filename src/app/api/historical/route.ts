import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lng");
  if (!lat || !lon) {
    return Response.json({ error: "Missing lat or lng" }, { status: 400 });
  }
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const startStr = start.toISOString().slice(0, 10);
  const endStr = end.toISOString().slice(0, 10);
  try {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startStr}&end_date=${endStr}&daily=temperature_2m_max,temperature_2m_min`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error("Historical fetch failed");
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Historical fetch failed" },
      { status: 502 }
    );
  }
}
