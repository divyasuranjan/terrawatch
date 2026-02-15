# Deploy TerraWatch to Vercel — Step-by-Step Demo

Follow these steps in order. At the end you’ll have a live link like `terrawatch-xxx.vercel.app` to share.

---

## Step 1: Open Vercel and sign in

1. Open your browser.
2. Go to **https://vercel.com**.
3. Click **Sign Up** or **Log In**.
4. Choose **Continue with GitHub** (so Vercel can see your repos).
5. If asked, authorize Vercel to access your GitHub account. Click **Authorize**.
6. You’ll land on the Vercel dashboard (e.g. “Add New…” or a list of projects).

---

## Step 2: Start importing your project

1. On the dashboard, click **Add New...** (or **New Project** / **Import Project**).
2. In the menu, click **Project** (not Team or Storage).
3. You’ll see “Import Git Repository” and a list of your GitHub repos.

---

## Step 3: Select the TerraWatch repo

1. In the list, find **divyasuranjan/terrawatch** (or your-username/terrawatch).
2. Click **Import** next to it.
3. If you don’t see it, click **Adjust GitHub App Permissions** and grant Vercel access to the repo that contains terrawatch, then try again.

---

## Step 4: Configure the project (leave defaults)

On the “Configure Project” page you’ll see:

- **Project Name:** Leave as **terrawatch** (or change if you want).
- **Framework Preset:** Should show **Next.js**. Leave it.
- **Root Directory:** Leave **empty** (so it uses the repo root).
- **Build and Output Settings:** Leave as is.

Scroll down to **Environment Variables**.

---

## Step 5: Add environment variables

Add the same three variables you have in `.env.local`. For each one:

**5a. OPENWEATHER_API_KEY**

1. In the **Key** field, type: **OPENWEATHER_API_KEY** (no spaces).
2. In the **Value** field, paste your OpenWeatherMap API key (from your `.env.local` file).
3. Click **Add** (or the button that adds the variable).

**5b. AQICN_API_TOKEN**

1. **Key:** **AQICN_API_TOKEN**
2. **Value:** Paste your AQICN token from `.env.local`.
3. Click **Add**.

**5c. GROQ_API_KEY**

1. **Key:** **GROQ_API_KEY**
2. **Value:** Paste your Groq API key from `.env.local`.
3. Click **Add**.

You should see all three listed. If there’s no “Environment” dropdown, that’s fine — they’ll be used for the deployment.

---

## Step 6: Deploy

1. Scroll to the bottom of the page.
2. Click the **Deploy** button (blue/green).
3. Vercel will build and deploy. You’ll see a progress screen (“Building…”, “Deploying…”).

---

## Step 7: Wait for the build to finish

1. Wait 1–3 minutes. You’ll see logs and a status like **Building** then **Deploying**.
2. When it’s done, you’ll see **Congratulations** (or similar) and a **Visit** or **Open** button.

---

## Step 8: Get your live link

1. Click **Visit** (or the project name/URL on the screen).
2. Your browser will open a URL like:
   - **https://terrawatch-xxxxx.vercel.app**  
   or  
   - **https://terrawatch-divyasuranjan.vercel.app**
3. You should see the TerraWatch landing page (search bar, “Enter any city in the world…”, featured cities).
4. **This URL is your live demo.** Copy it and share it (e.g. in your README, LinkedIn, or portfolio).

---

## Step 9: Add the link to your GitHub README (optional)

1. Open your TerraWatch repo on GitHub: **https://github.com/divyasuranjan/terrawatch**.
2. Click **README.md**, then the pencil icon (**Edit this file**).
3. Near the top, add a line like (use your real Vercel URL):

```markdown
## Live Demo

[**Try TerraWatch →**](https://terrawatch-xxxxx.vercel.app)
```

4. Scroll down, click **Commit changes** → **Commit changes**.
5. Your repo will now show the live link to anyone who visits.

---

## Step 10: Redeploy after future code changes (optional)

Whenever you push new code to GitHub:

1. Go to **https://vercel.com/dashboard**.
2. Click your **terrawatch** project.
3. Vercel usually **auto-deploys** when you push to `main`. Check the **Deployments** tab to see the new deployment.
4. If you need to redeploy manually: open the **Deployments** tab → click the **⋮** on the latest deployment → **Redeploy**.

---

## Quick checklist

- [ ] Signed in to Vercel with GitHub
- [ ] Add New… → Project → Import **divyasuranjan/terrawatch**
- [ ] Added OPENWEATHER_API_KEY, AQICN_API_TOKEN, GROQ_API_KEY
- [ ] Clicked Deploy
- [ ] Build finished, clicked Visit
- [ ] Copied live URL (e.g. terrawatch-xxx.vercel.app)
- [ ] (Optional) Added “Live Demo” link to README on GitHub

---

## Troubleshooting

**Build failed**  
- Check the build logs on Vercel (red error message). Often it’s a missing env var or a typo in the key name. Fix and redeploy.

**Site loads but “city not found” or no weather**  
- Confirm all three env vars are set in Vercel (Project → Settings → Environment Variables). Redeploy after adding or changing them.

**Want a custom domain (e.g. terrawatch.com)**  
- In the Vercel project: Settings → Domains → Add your domain and follow the DNS instructions.

---

That’s the full step-by-step demo from Vercel sign-in to a shareable live link.
