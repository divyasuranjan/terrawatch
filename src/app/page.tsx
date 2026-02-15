"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FEATURED_CITIES = [
  { name: "Delhi", country: "India" },
  { name: "London", country: "United Kingdom" },
  { name: "Tokyo", country: "Japan" },
  { name: "São Paulo", country: "Brazil" },
  { name: "Cairo", country: "Egypt" },
  { name: "Sydney", country: "Australia" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [loading, setLoading] = useState(false);

  const searchCities = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      setSuggestions(
        (data || []).map((r: { display_name: string; lat: string; lon: string }) => ({
          display_name: r.display_name,
          lat: r.lat,
          lon: r.lon,
        }))
      );
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    const t = setTimeout(() => searchCities(v), 300);
    return () => clearTimeout(t);
  };

  const slug = (name: string) => encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());

  return (
    <main className="min-h-screen dot-grid">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl md:text-5xl font-bold text-white mb-2">
            TerraWatch
          </h1>
          <p className="text-emerald-400/90 text-lg mb-10">
            Real-time climate risk & environmental intelligence
          </p>

          <div className="relative max-w-xl mx-auto mb-6">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => query.length >= 2 && searchCities(query)}
              placeholder="Enter any city in the world..."
              className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 mt-1 rounded-lg glass overflow-hidden z-10">
                {suggestions.map((s, i) => (
                  <li key={i}>
                    <Link
                      href={`/city/${slug(s.display_name)}?lat=${s.lat}&lon=${s.lon}`}
                      className="block px-4 py-3 hover:bg-white/10 text-left text-sm"
                    >
                      {s.display_name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {loading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                Searching...
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm mb-4">Try a featured city below</p>
          <Link href="/compare" className="text-emerald-400 hover:underline text-sm mb-8 inline-block">
            Compare two cities →
          </Link>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {FEATURED_CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={`/city/${slug(city.name)}`}
                  className="block glass rounded-xl p-4 text-center hover:border-emerald-500/50 hover:bg-white/10 transition"
                >
                  <span className="font-semibold text-white">{city.name}</span>
                  <span className="text-gray-400 text-sm block">{city.country}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="glass rounded-xl px-6 py-4 inline-block">
            <p className="text-gray-400 text-sm">
              Monitoring cities worldwide · Data updated hourly · Powered by Open-Meteo, OpenWeatherMap, AQICN & Groq
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
