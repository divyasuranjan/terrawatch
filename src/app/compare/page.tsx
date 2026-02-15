"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const slug = (name: string) => encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());

export default function ComparePage() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [suggestions1, setSuggestions1] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [suggestions2, setSuggestions2] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [selected1, setSelected1] = useState<{ name: string; lat: string; lon: string } | null>(null);
  const [selected2, setSelected2] = useState<{ name: string; lat: string; lon: string } | null>(null);
  const [data1, setData1] = useState<{ weather?: { main?: { temp?: number; humidity?: number } }; airQuality?: { aqi?: number } } | null>(null);
  const [data2, setData2] = useState<{ weather?: { main?: { temp?: number; humidity?: number } }; airQuality?: { aqi?: number } } | null>(null);

  const fetchSuggestions = async (q: string, setter: (s: Array<{ display_name: string; lat: string; lon: string }>) => void) => {
    if (q.length < 2) { setter([]); return; }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
      { headers: { "Accept-Language": "en" } }
    );
    const arr = await res.json();
    setter((arr || []).map((r: { display_name: string; lat: string; lon: string }) => ({ display_name: r.display_name, lat: r.lat, lon: r.lon })));
  };

  useEffect(() => {
    const t = setTimeout(() => fetchSuggestions(city1, setSuggestions1), 300);
    return () => clearTimeout(t);
  }, [city1]);
  useEffect(() => {
    const t = setTimeout(() => fetchSuggestions(city2, setSuggestions2), 300);
    return () => clearTimeout(t);
  }, [city2]);

  const loadCityData = async (lat: string, lon: string) => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const [w, aq] = await Promise.all([
      fetch(`${base}/api/weather?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`${base}/api/air-quality?lat=${lat}&lng=${lon}`).then((r) => (r.ok ? r.json() : null)),
    ]);
    return { weather: w, airQuality: aq };
  };

  useEffect(() => {
    if (!selected1?.lat || !selected1?.lon) { setData1(null); return; }
    loadCityData(selected1.lat, selected1.lon).then(setData1);
  }, [selected1?.lat, selected1?.lon]);
  useEffect(() => {
    if (!selected2?.lat || !selected2?.lon) { setData2(null); return; }
    loadCityData(selected2.lat, selected2.lon).then(setData2);
  }, [selected2?.lat, selected2?.lon]);

  const c1Name = selected1?.name ?? "City 1";
  const c2Name = selected2?.name ?? "City 2";
  const chartData: Array<{ metric: string; [key: string]: string | number }> = [];
  if (selected1 && selected2 && (data1 || data2)) {
    const w1 = data1?.weather as { main?: { temp?: number; humidity?: number } } | undefined;
    const w2 = data2?.weather as { main?: { temp?: number; humidity?: number } } | undefined;
    chartData.push(
      { metric: "Temp (°C)", [c1Name]: w1?.main?.temp ?? 0, [c2Name]: w2?.main?.temp ?? 0 },
      { metric: "Humidity (%)", [c1Name]: w1?.main?.humidity ?? 0, [c2Name]: w2?.main?.humidity ?? 0 },
      { metric: "AQI", [c1Name]: data1?.airQuality?.aqi ?? 0, [c2Name]: data2?.airQuality?.aqi ?? 0 }
    );
  }

  const aqi1 = data1?.airQuality?.aqi ?? 0;
  const aqi2 = data2?.airQuality?.aqi ?? 0;
  const aqiRatio = aqi2 > 0 ? (aqi1 / aqi2).toFixed(1) : "—";

  return (
    <main className="min-h-screen dot-grid">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="text-emerald-400 hover:underline text-sm mb-6 inline-block">
          ← Back home
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-white mb-8"
        >
          Compare cities
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-4">
            <label className="block text-gray-400 text-sm mb-2">City 1</label>
            <input
              type="text"
              value={selected1 ? selected1.name : city1}
              onChange={(e) => { setSelected1(null); setCity1(e.target.value); }}
              placeholder="Search city..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
            />
            {suggestions1.length > 0 && !selected1 && (
              <ul className="mt-2 rounded-lg overflow-hidden glass">
                {suggestions1.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => { setSelected1({ name: s.display_name, lat: s.lat, lon: s.lon }); setSuggestions1([]); setCity1(""); }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                    >
                      {s.display_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="glass rounded-xl p-4">
            <label className="block text-gray-400 text-sm mb-2">City 2</label>
            <input
              type="text"
              value={selected2 ? selected2.name : city2}
              onChange={(e) => { setSelected2(null); setCity2(e.target.value); }}
              placeholder="Search city..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500"
            />
            {suggestions2.length > 0 && !selected2 && (
              <ul className="mt-2 rounded-lg overflow-hidden glass">
                {suggestions2.map((s, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => { setSelected2({ name: s.display_name, lat: s.lat, lon: s.lon }); setSuggestions2([]); setCity2(""); }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-white/10"
                    >
                      {s.display_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {chartData.length > 0 && (
          <>
            {aqi1 > 0 && aqi2 > 0 && (
              <p className="text-amber-400 mb-4">
                {selected1?.name} AQI is {aqiRatio}x {aqi1 > aqi2 ? "worse than" : "better than"} {selected2?.name}
              </p>
            )}
            <div className="glass rounded-2xl p-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="metric" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151" }} />
                  <Legend />
                  <Bar dataKey={c1Name} fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={c2Name} fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
