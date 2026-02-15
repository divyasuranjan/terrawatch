import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lng");
  if (!lat || !lon) {
    return Response.json({ error: "Missing lat or lng" }, { status: 400 });
  }
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,weather_code&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error("Forecast fetch failed");
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Forecast fetch failed" },
      { status: 502 }
    );
  }
}
