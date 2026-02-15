import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lng");
  const key = process.env.OPENWEATHER_API_KEY;
  if (!lat || !lon || !key) {
    return Response.json(
      { error: "Missing lat, lng, or OPENWEATHER_API_KEY" },
      { status: 400 }
    );
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Weather fetch failed");
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Weather fetch failed" },
      { status: 502 }
    );
  }
}
