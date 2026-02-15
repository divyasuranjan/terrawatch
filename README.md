# TerraWatch — Real-Time Climate & Environmental Dashboard

See how climate affects your area: air quality, temperature anomalies, 7-day forecast, and AI-powered climate briefs.

## What’s in this project

| Part | What it does |
|------|----------------|
| **Landing page** | Search any city (Nominatim), 6 featured cities, dark theme with dot grid |
| **City dashboard** | Current weather, AQI, temp vs historical average, 7-day forecast, AI brief, map |
| **Compare page** | Pick two cities, see side-by-side metrics and bar chart |
| **API routes** | `/api/weather`, `/api/air-quality`, `/api/forecast`, `/api/historical`, `/api/climate-brief` |

## Step-by-step: run it locally

### 1. Install dependencies

```bash
cd terrawatch
npm install
```

**What this does:** Installs Next.js, React, Tailwind, Framer Motion, Recharts, Leaflet, and TypeScript. No global install needed.

---

### 2. Add your API keys (optional but recommended)

Create a file named `.env.local` in the project root (same folder as `package.json`):

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

- **OPENWEATHER_API_KEY** — [openweathermap.org/api](https://openweathermap.org/api) (free tier: 1000 calls/day)
- **AQICN_API_TOKEN** — [aqicn.org/data-platform/token](https://aqicn.org/data-platform/token) (free)
- **GROQ_API_KEY** — [console.groq.com](https://console.groq.com) (free)

**What this does:** Weather and AQI work better with keys; Open-Meteo and Nominatim work without keys. The AI climate brief needs Groq.

---

### 3. Start the dev server

```bash
npm run dev
```

**What this does:** Starts Next.js on [http://localhost:3000](http://localhost:3000). You can search a city, open a dashboard, and use Compare.

---

### 4. Build for production (e.g. before deploying)

```bash
npm run build
npm start
```

**What this does:** `npm run build` compiles the app; `npm start` runs the production server.

---

## Step-by-step: create more projects the same way

You can repeat this pattern for the other 7 projects (PaperLens, VoiceForge, NutriScan, etc.):

1. **Create a new folder**  
   e.g. `paperlens` next to `terrawatch`.

2. **Scaffold the app**  
   - Either run `npx create-next-app@14 paperlens --typescript --tailwind --eslint --app --src-dir --use-npm` in Terminal (from your projects folder),  
   - Or create the same core files by hand: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, and `src/app/layout.tsx`, `globals.css`, `page.tsx`.

3. **Add dependencies**  
   In the new project folder: `npm install framer-motion recharts` (and whatever the project needs, e.g. `pdf-parse`, `@xyflow/react` for PaperLens).

4. **Paste the Cursor prompt**  
   Open the “Divya’s Project Builder” doc, copy the **full Cursor prompt** for that project (e.g. PaperLens), paste it into Cursor Composer (Cmd+I), and send. Cursor will generate the pages, components, and API routes.

5. **Add env and run**  
   Create `.env.local` with the keys that project needs (e.g. `GROQ_API_KEY`), then `npm run dev` and test.

6. **Deploy**  
   Push the repo to GitHub, import the project on [vercel.com](https://vercel.com), add the same env vars in the Vercel dashboard, and deploy.

---

## Project layout (TerraWatch)

```
terrawatch/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts
│   │   ├── page.tsx       # Landing: search + featured cities
│   │   ├── globals.css    # Tailwind + dot grid, glass
│   │   ├── city/[name]/   # City dashboard page
│   │   ├── compare/       # Compare two cities
│   │   └── api/          # weather, air-quality, forecast, historical, climate-brief
│   ├── components/
│   │   └── Map.tsx        # Leaflet map (client-only)
│   └── lib/
│       └── types.ts       # Shared TypeScript types
├── package.json
├── tailwind.config.ts
├── .env.local.example
└── README.md
```

---

## Troubleshooting

- **“Command not found: npm”**  
  Restart the terminal or run `source ~/.zshrc` so Node (from Homebrew) is on your PATH.

- **City not loading / “City not found”**  
  Make sure you have `OPENWEATHER_API_KEY` in `.env.local` for current weather. For featured cities, the app uses Nominatim to get lat/lon, then calls the APIs.

- **AI brief empty**  
  Add `GROQ_API_KEY` to `.env.local`. The brief is generated in `/api/climate-brief`.

- **Map not showing**  
  The map loads Leaflet tiles from the internet. If you’re offline or behind a strict firewall, it may not load.

You now have TerraWatch from scratch and a repeatable process to create and run the other projects.
