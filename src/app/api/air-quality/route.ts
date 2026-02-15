import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lng");
  const owKey = process.env.OPENWEATHER_API_KEY;
  const aqicnKey = process.env.AQICN_API_TOKEN;

  if (!lat || !lon) {
    return Response.json({ error: "Missing lat or lng" }, { status: 400 });
  }

  let openWeather: { list?: Array<{ main: { aqi: number }; components?: Record<string, number> }> } = {};
  let aqicn: { data?: { aqi?: number; iaqi?: Record<string, { v?: number }> } } = {};

  if (owKey) {
    try {
      const r = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${owKey}`
      );
      openWeather = await r.json();
    } catch {
      // ignore
    }
  }

  if (aqicnKey) {
    try {
      const r = await fetch(
        `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${aqicnKey}`
      );
      aqicn = await r.json();
    } catch {
      // ignore
    }
  }

  const owList = openWeather.list?.[0];
  const aqi = owList?.main?.aqi ?? aqicn.data?.aqi ?? null;
  const components = owList?.components ?? null;
  const iaqi = aqicn.data?.iaqi ?? null;

  return Response.json({
    aqi,
    source: aqi != null ? (owList ? "openweathermap" : "aqicn") : null,
    components,
    iaqi,
  });
}
