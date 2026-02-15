"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

const Map = dynamic(
  () => import("@/components/Map").then((m) => m.Map),
  { ssr: false }
);

function useGeocode(name: string) {
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(null);
  useEffect(() => {
    if (!name) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1`
    )
      .then((r) => r.json())
      .then((arr: Array<{ lat: string; lon: string }>) => {
        if (arr?.[0]) setCoords({ lat: arr[0].lat, lon: arr[0].lon });
      })
      .catch(() => setCoords(null));
  }, [name]);
  return coords;
}

function AQIColor(aqi: number) {
  if (aqi <= 50) return "text-emerald-400";
  if (aqi <= 100) return "text-amber-400";
  if (aqi <= 150) return "text-orange-500";
  if (aqi <= 200) return "text-red-500";
  if (aqi <= 300) return "text-purple-500";
  return "text-red-800";
}

function AQILabel(aqi: number) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default function CityPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { lat?: string; lon?: string };
}) {
  const name = decodeURIComponent((params?.name ?? "").replace(/-/g, " "));
  const urlLat = searchParams?.lat;
  const urlLon = searchParams?.lon;
  const geocode = useGeocode(urlLat && urlLon ? "" : name);
  const lat = urlLat ?? geocode?.lat ?? "";
  const lon = urlLon ?? geocode?.lon ?? "";

  const [weather, setWeather] = useState<Record<string, unknown> | null>(null);
  const [airQuality, setAirQuality] = useState<{ aqi?: number; components?: Record<string, number> } | null>(null);
  const [forecast, setForecast] = useState<{
    daily?: { time?: string[]; temperature_2m_max?: number[]; temperature_2m_min?: number[]; precipitation_sum?: number[]; uv_index_max?: number[] };
  } | null>(null);
  const [historical, setHistorical] = useState<{
    daily?: { time?: string[]; temperature_2m_max?: number[]; temperature_2m_min?: number[] };
  } | null>(null);
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      if (geocode === null && !urlLat) setError("City not found.");
      return;
    }
    setLoading(true);
    setError(null);
    const base = `${typeof window !== "undefined" ? window.location.origin : ""}`;
    Promise.all([
      fetch(`${base}/api/weather?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}/api/air-quality?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}/api/forecast?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}/api/historical?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([w, aq, fc, hist]) => {
        setWeather(w);
        setAirQuality(aq);
        setForecast(fc);
        setHistorical(hist);
        const dataForBrief = {
          city: name,
          weather: w,
          airQuality: aq,
          forecast: fc?.daily,
          historical: hist?.daily,
        };
        return fetch(`${base}/api/climate-brief`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: dataForBrief }),
        }).then((r) => (r.ok ? r.json() : { brief: null }));
      })
      .then((b) => setBrief(b?.brief ?? null))
      .catch(() => setError("Failed to load data."))
      .finally(() => setLoading(false));
  }, [lat, lon, name, urlLat]);

  if (loading && !weather) {
    return (
      <main className="min-h-screen dot-grid flex items-center justify-center">
        <motion.p animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
          Loading {name}...
        </motion.p>
      </main>
    );
  }

  if (error || (!lat && !loading)) {
    return (
      <main className="min-h-screen dot-grid flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || "City not found."}</p>
        <Link href="/" className="text-emerald-400 hover:underline">← Back to search</Link>
      </main>
    );
  }

  const daily = forecast?.daily;
  const histDaily = historical?.daily;
  const anomalyData: Array<{ date: string; current: number; historical?: number; anomaly?: number }> = [];
  if (daily?.time && daily.temperature_2m_max && histDaily?.temperature_2m_max) {
    const len = Math.min(daily.time.length, histDaily.time?.length ?? 0);
    for (let i = 0; i < len; i++) {
      const curr = daily.temperature_2m_max[i];
      const hist = histDaily.temperature_2m_max?.[i];
      anomalyData.push({
        date: daily.time[i].slice(5),
        current: curr,
        historical: hist,
        anomaly: hist != null ? Math.round((curr - hist) * 10) / 10 : undefined,
      });
    }
  }
  const avgAnomaly =
    anomalyData.length > 0
      ? anomalyData.reduce((s, d) => s + (d.anomaly ?? 0), 0) / anomalyData.length
      : null;

  const aqi = airQuality?.aqi ?? 0;

  return (
    <main className="min-h-screen dot-grid pb-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link href="/" className="text-emerald-400 hover:underline text-sm mb-6 inline-block">
          ← Back to search
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white">
            {name}
          </h1>

          {/* Current conditions */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current conditions</h2>
            {weather && (
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-4xl font-bold text-white">
                    {Math.round((weather.main as { temp?: number })?.temp ?? 0)}°C
                  </span>
                  <span className="text-gray-400 ml-2">
                    Feels like {Math.round((weather.main as { feels_like?: number })?.feels_like ?? 0)}°C
                  </span>
                </div>
                <div className="text-gray-300">
                  {(weather.weather as Array<{ main: string; description: string }>)?.[0]?.description}
                </div>
                <div className="text-gray-400 text-sm">
                  Humidity: {(weather.main as { humidity?: number })?.humidity}% · Wind: {(weather.wind as { speed?: number })?.speed} m/s
                </div>
              </div>
            )}
          </section>

          {/* Air quality */}
          <section className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Air quality</h2>
            <div className="flex items-center gap-6 flex-wrap">
              <div className={`text-4xl font-bold ${AQIColor(aqi)}`}>{aqi}</div>
              <div>
                <p className="text-white font-medium">AQI · {AQILabel(aqi)}</p>
                <p className="text-gray-400 text-sm">
                  {aqi <= 50 && "Good for outdoor activities."}
                  {aqi > 50 && aqi <= 100 && "Acceptable; sensitive people may be affected."}
                  {aqi > 100 && "Consider reducing prolonged outdoor exertion."}
                </p>
              </div>
            </div>
          </section>

          {/* Temperature anomaly */}
          {anomalyData.length > 0 && (
            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Temperature vs 30-year average</h2>
              {avgAnomaly != null && (
                <p className="text-amber-400 mb-4">
                  {avgAnomaly >= 0 ? "+" : ""}{avgAnomaly.toFixed(1)}°C above historical average this period
                </p>
              )}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={anomalyData}>
                    <defs>
                      <linearGradient id="current" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151" }} />
                    <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="current" stroke="#10b981" fill="url(#current)" name="Current °C" />
                    <Line type="monotone" dataKey="historical" stroke="#6b7280" dot={false} name="Historical °C" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {/* 7-day forecast */}
          {daily?.time && (
            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">7-day forecast</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {daily.time.slice(0, 7).map((date, i) => (
                  <div
                    key={date}
                    className="flex-shrink-0 glass rounded-xl p-4 min-w-[120px] text-center"
                  >
                    <p className="text-gray-400 text-sm">{date.slice(5)}</p>
                    <p className="text-white font-semibold">
                      {daily.temperature_2m_max?.[i] ?? "—"}° / {daily.temperature_2m_min?.[i] ?? "—"}°
                    </p>
                    {daily.uv_index_max?.[i] != null && (
                      <p className="text-amber-400 text-xs mt-1">UV {daily.uv_index_max[i]}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI brief */}
          {brief && (
            <section className="glass rounded-2xl p-6 border-emerald-500/30 border-2">
              <h2 className="text-lg font-semibold text-emerald-400 mb-3">AI Climate Intelligence Brief</h2>
              <p className="text-gray-200 leading-relaxed">{brief}</p>
            </section>
          )}

          {/* Map */}
          <section className="glass rounded-2xl overflow-hidden h-80">
            <Map lat={parseFloat(lat)} lon={parseFloat(lon)} name={name} />
          </section>
        </motion.div>
      </div>
    </main>
  );
}
