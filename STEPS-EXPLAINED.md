# Every step explained — how TerraWatch was created from scratch

This document walks you through **what was done** and **why**, so you can do the same for the other 7 projects.

---

## Step 1: Create the project folder and config files

**What we did:** Created a `terrawatch` folder and added the files that tell Node, Next.js, and Tailwind how to build the app.

| File | Purpose |
|------|--------|
| **package.json** | Lists dependencies (next, react, framer-motion, recharts, leaflet, etc.) and scripts (`npm run dev`, `npm run build`). When you run `npm install`, npm reads this and downloads everything. |
| **tsconfig.json** | Tells TypeScript how to compile and that `@/*` means the `src` folder. |
| **next.config.js** | Next.js settings (we only set `reactStrictMode`). |
| **tailwind.config.ts** | Tailwind theme: custom colors (navy, emerald, amber), font names (Outfit, DM Sans). |
| **postcss.config.js** | Tells the build to run Tailwind and Autoprefixer on CSS. |

**Why:** Every Next.js + Tailwind + TypeScript app needs these. You can copy this set for PaperLens, NutriScan, etc. and change the project name in `package.json`.

---

## Step 2: Set up the app layout and global styles

**What we did:**

- **src/app/layout.tsx**  
  Root layout: loads Google Fonts (Outfit + DM Sans), applies them via CSS variables, sets the page title and description. All pages render inside this layout.

- **src/app/globals.css**  
  Imports Tailwind; defines the dot-grid background and a `.glass` class for glassmorphism cards.

**Why:** One place for fonts and theme so every page looks consistent.

---

## Step 3: Build the landing page (home)

**What we did in `src/app/page.tsx`:**

1. **Search with autocomplete**  
   When you type, we call Nominatim: `https://nominatim.openstreetmap.org/search?q=...`. No API key. Results become clickable links.

2. **Featured cities**  
   Six fixed cities (Delhi, London, Tokyo, etc.). Each link goes to `/city/delhi` (or the slug for that city).

3. **Link to Compare**  
   A link to `/compare` for the compare page.

4. **Stats ribbon**  
   Text line about “Monitoring cities worldwide”, etc.

**Why:** The prompt asked for a dramatic hero, search, featured cities, and dark theme. We implemented that in one page.

---

## Step 4: Create API routes (backend)

Next.js API routes live in `src/app/api/*/route.ts`. Each file exports `GET` or `POST`. When the frontend calls `/api/weather?lat=1&lng=2`, Next.js runs the corresponding route on the server.

| Route | What it does |
|-------|----------------|
| **/api/weather** | Calls OpenWeatherMap with `lat` and `lng` from the URL. Uses `OPENWEATHER_API_KEY` from `.env.local`. Returns current weather (temp, feels like, humidity, wind). |
| **/api/air-quality** | Calls OpenWeatherMap air pollution and/or AQICN with `lat` and `lng`. Returns AQI and components (PM2.5, etc.). |
| **/api/forecast** | Calls Open-Meteo (no key) for 7-day forecast: max/min temp, precipitation, UV. |
| **/api/historical** | Calls Open-Meteo archive for the last 30 days. Used to compute “temperature vs 30-year-style” comparison. |
| **/api/climate-brief** | Receives a JSON body with weather + AQI + forecast. Sends it to Groq with the TerraWatch system prompt. Returns the AI brief. |

**Why:** API keys stay on the server (in `.env.local`). The browser only talks to your own `/api/*` URLs, so keys are never exposed.

---

## Step 5: Build the city dashboard page

**What we did in `src/app/city/[name]/page.tsx`:**

1. **URL and geocoding**  
   The URL is `/city/delhi` or `/city/delhi?lat=28.6&lon=77.2`. If `lat` and `lon` are missing, we call Nominatim with the city name to get coordinates.

2. **Fetching data**  
   With `lat` and `lon`, we call our own APIs (weather, air-quality, forecast, historical) from the browser. Then we call `/api/climate-brief` with all that data so Groq can generate the brief.

3. **Sections**  
   - Current conditions (temp, feels like, humidity, wind)  
   - Air quality (AQI number + color + short advice)  
   - Temperature anomaly chart (Recharts: current vs historical)  
   - 7-day forecast strip (from Open-Meteo)  
   - AI Climate Brief (from Groq)  
   - Map (Leaflet, client-only via `dynamic(..., { ssr: false })`)

**Why:** The prompt asked for these sections. We split them into clear blocks and used the same APIs we defined earlier.

---

## Step 6: Add the map component

**What we did in `src/components/Map.tsx`:**

- Used `react-leaflet` with Leaflet’s default tiles (OpenStreetMap).
- The map receives `lat`, `lon`, and `name`; it centers on the city and shows one marker.
- The component is loaded with `dynamic(..., { ssr: false })` so it only runs in the browser (Leaflet needs `window`).

**Why:** Leaflet is a client-side library. Disabling SSR avoids “window is not defined” errors.

---

## Step 7: Build the compare page

**What we did in `src/app/compare/page.tsx`:**

- Two search inputs, each with Nominatim autocomplete.
- When both cities are selected, we fetch weather + AQI for both via our APIs.
- We build a small array of “metrics” (Temp, Humidity, AQI) and pass it to Recharts `BarChart`.
- We show a line like “Delhi’s AQI is 8.4x worse than Stockholm’s” when both AQIs are available.

**Why:** The prompt asked for a compare page with two searches and a bar chart. This implements that.

---

## Step 8: Env and README

- **.env.local.example**  
  Lists the three env vars (OpenWeather, AQICN, Groq). You copy to `.env.local` and fill in keys. Never commit `.env.local`.

- **README.md**  
  How to install, run, and deploy. Also a short “how to create the other projects” section.

- **STEPS-EXPLAINED.md**  
  This file — what each step does and why.

---

## How to repeat this for the other projects

1. **New folder**  
   e.g. `paperlens`, `voiceforge`, …

2. **Same base**  
   Copy or recreate: `package.json` (change name, add that project’s deps), `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `src/app/layout.tsx`, `src/app/globals.css`.

3. **Paste the Cursor prompt**  
   From the Project Builder doc, copy the **full** Cursor prompt for that project. In Cursor, open the new folder, open Composer (Cmd+I), paste the prompt, and send. Cursor will generate the pages, components, and API routes.

4. **Env and run**  
   Add the required keys to `.env.local`, run `npm install` and `npm run dev`, then fix any small errors (e.g. imports or types) with Cursor’s help.

5. **Deploy**  
   Push to GitHub, import on Vercel, add env vars, deploy.

You’ve now seen every step for TerraWatch and how to apply the same process to create the rest from scratch.
