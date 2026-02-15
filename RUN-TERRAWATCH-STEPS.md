# Run TerraWatch — Every Single Step (from zero to app running)

Follow these steps in order. Do each step before moving to the next.

---

## Step 1: Open Terminal

- **On Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**.  
  Or: open **Finder → Applications → Utilities → Terminal**.
- **Inside Cursor:** Menu **Terminal → New Terminal**, or press **Ctrl+`** (backtick) or **Cmd+`**.

You should see a window with a prompt like `%` or `username@MacBook terrawatch %`.

---

## Step 2: Load your env (so npm is available)

In that same Terminal window, type this exactly and press **Enter**:

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

- Nothing will seem to happen except maybe the prompt appears again. That’s correct.
- This makes `npm` and `node` available in this terminal session.

---

## Step 3: Check that npm works

Type this and press **Enter**:

```bash
npm -v
```

- You should see a number (e.g. `10.2.3`). If you do, npm is available. Continue to Step 4.
- If you see `command not found: npm`, run Step 2 again in the same terminal, then try Step 3 again.

---

## Step 4: Go to the TerraWatch project folder

Type this and press **Enter**:

```bash
cd ~/Desktop/projects/terrawatch
```

- Your prompt may change to show `terrawatch` at the end. You are now inside the project folder.

---

## Step 5: Create `.env.local` (if you haven’t already)

Type this and press **Enter**:

```bash
cp .env.local.example .env.local
```

- This creates a file named `.env.local` in the project. If the file already exists, this overwrites it (you can skip this step if you already have `.env.local` with your keys).

---

## Step 6: Open `.env.local` and add your API keys

**6a. Open the file**

- In Cursor: in the left sidebar (file explorer), open the **terrawatch** folder, then click **`.env.local`**.
- Or in Terminal (from the terrawatch folder): run `open -e .env.local` to open it in TextEdit.

**6b. You’ll see something like:**

```
# Copy this file to .env.local and fill in your keys.
# Get free keys from:
# - OpenWeatherMap: https://openweathermap.org/api
# - AQICN: https://aqicn.org/data-platform/token
# - Groq: https://console.groq.com

OPENWEATHER_API_KEY=
AQICN_API_TOKEN=
GROQ_API_KEY=
```

**6c. Get each key and paste it after the `=` on the correct line.**

- **OPENWEATHER_API_KEY**  
  1. Go to https://openweathermap.org/api  
  2. Sign up / Sign in (free).  
  3. Go to https://openweathermap.org/api-keys (or: your name top right → My API keys).  
  4. Copy your API key.  
  5. In `.env.local`, click after the `=` on the `OPENWEATHER_API_KEY=` line and paste. No spaces, no quotes.

- **AQICN_API_TOKEN**  
  1. Go to https://aqicn.org/data-platform/token  
  2. Sign up / log in (free).  
  3. Copy the token shown on the page.  
  4. In `.env.local`, paste it after `AQICN_API_TOKEN=`.

- **GROQ_API_KEY**  
  1. Go to https://console.groq.com  
  2. Sign up / log in (free).  
  3. In the sidebar, open **API Keys** (or Keys).  
  4. Click **Create API Key**, name it, then Create.  
  5. Copy the key (often shown only once).  
  6. In `.env.local`, paste it after `GROQ_API_KEY=`.

**6d. Save the file**

- In Cursor: **Cmd+S**.  
- In TextEdit: **Cmd+S**, then close the window if you want.

Your `.env.local` should look like (with your real keys):

```
OPENWEATHER_API_KEY=your_actual_key_here
AQICN_API_TOKEN=your_actual_token_here
GROQ_API_KEY=your_actual_groq_key_here
```

No spaces around `=`, no quotes. One key per line.

---

## Step 7: Install dependencies (first time only)

In Terminal, make sure you’re still in the project folder:

```bash
cd ~/Desktop/projects/terrawatch
```

Then run:

```bash
npm install
```

- Wait until it finishes (you’ll see “added XXX packages” and the prompt again). You only need to do this once per project, or when we add new packages.

---

## Step 8: Start the app

In the **same** Terminal window, run:

```bash
npm run dev
```

- You should see something like:
  - `▲ Next.js 14.x.x`
  - `- Local: http://localhost:3000`
- The terminal will stay “busy” (no new prompt). That’s normal — the app is running.

---

## Step 9: Open the app in your browser

- Open your web browser (Chrome, Safari, etc.).
- In the address bar, type: **http://localhost:3000**
- Press **Enter**.
- You should see the TerraWatch landing page (search bar, “Enter any city in the world…”, featured cities). Try searching a city or clicking a featured city to open the dashboard.

---

## Step 10: If you add or change API keys later — restart the app

If you edit `.env.local` **after** the app is already running, the app won’t see the new keys until you restart it.

**10a. Stop the app**

- Click the **Terminal** window (or tab) where you ran `npm run dev` (where you see “Local: http://localhost:3000”).
- Press **Ctrl+C** (Control and C together; not Cmd+C).
- The server stops and you’ll get your prompt back (e.g. `%` or `terrawatch %`).

**10b. Start the app again**

- In that **same** terminal, type:

```bash
npm run dev
```

- Press **Enter**. Wait until “Local: http://localhost:3000” appears again.
- In your browser, go to (or refresh) **http://localhost:3000**. The app will now use the updated keys from `.env.local`.

---

## Quick reference (after first-time setup)

Once you’ve done Steps 1–9 once, you usually only need:

1. Open Terminal.
2. Run: `eval "$(/opt/homebrew/bin/brew shellenv)"`
3. Run: `cd ~/Desktop/projects/terrawatch`
4. Run: `npm run dev`
5. Open http://localhost:3000 in your browser.

To stop: in that terminal, press **Ctrl+C**.  
To start again: in the same terminal, run **`npm run dev`** again.

---

That’s every step from “Open Terminal and load your env” through running the app and restarting it with new keys.
