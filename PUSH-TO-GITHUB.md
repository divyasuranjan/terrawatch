# Push TerraWatch to GitHub — Step by Step

Follow these in order. Your API keys in `.env.local` will **not** be uploaded (they're in `.gitignore`).

---

## Step 1: Create a GitHub account (if you don’t have one)

1. Go to **https://github.com**
2. Click **Sign up**
3. Enter email, password, username; verify; finish sign-up

---

## Step 2: Create a new repository on GitHub

1. Log in to GitHub
2. Click the **+** (top right) → **New repository**
3. Fill in:
   - **Repository name:** `terrawatch` (or `terrawatch-climate-dashboard`)
   - **Description (optional):** e.g. `Real-time climate & environmental dashboard — Next.js, Open-Meteo, Groq`
   - **Public**
   - **Do not** check "Add a README" or "Add .gitignore" (we already have them)
4. Click **Create repository**
5. On the next page you’ll see a URL like:
   - **HTTPS:** `https://github.com/YOUR_USERNAME/terrawatch.git`
   - **SSH:** `git@github.com:YOUR_USERNAME/terrawatch.git`
   Copy the **HTTPS** URL (we’ll use it in Step 5). Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3: Open Terminal and go to the project

1. Open **Terminal** (or the terminal in Cursor)
2. Load env (so `git` works):  
   `eval "$(/opt/homebrew/bin/brew shellenv)"`
3. Go to the project:  
   `cd ~/Desktop/projects/terrawatch`

---

## Step 4: Initialize Git and make the first commit

Run these **one at a time** in the same terminal:

```bash
git init
```

```bash
git add .
```

```bash
git status
```

- You should see a list of files to be committed. You should **not** see `.env.local` or `node_modules` (they’re ignored).

```bash
git commit -m "TerraWatch v1 — climate dashboard with weather, AQI, AI brief"
```

- You should see something like “X files changed, Y insertions”.

---

## Step 5: Connect to GitHub and push

1. Add the remote (use **your** GitHub username and repo name):

```bash
git remote add origin https://github.com/YOUR_USERNAME/terrawatch.git
```

Example: if your username is `divyadev`, use:
`https://github.com/divyadev/terrawatch.git`

2. Rename the branch to `main` (if needed):

```bash
git branch -M main
```

3. Push to GitHub:

```bash
git push -u origin main
```

- If GitHub asks you to sign in:
  - **HTTPS:** use your GitHub username and a **Personal Access Token** (not your password).  
  - To create a token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token** → give it a name, check **repo** → Generate → copy the token and paste it when the terminal asks for a password.

After this, your code will be on GitHub.

---

## Step 6: Pin the repo on your profile (optional)

1. Go to **https://github.com/YOUR_USERNAME**
2. Click **Customize your pins** (or “Pin repositories”)
3. Click **Add** and choose **terrawatch**
4. Save

---

## Step 7: Add env vars when you deploy (e.g. Vercel)

When you deploy (e.g. Vercel), add your API keys in the **project’s Environment Variables** in the dashboard — **never** put them in the repo. Your local `.env.local` stays only on your machine.

---

## Quick copy-paste (after you created the repo on GitHub)

Replace `YOUR_USERNAME` with your GitHub username, then run:

```bash
cd ~/Desktop/projects/terrawatch
git init
git add .
git commit -m "TerraWatch v1 — climate dashboard"
git remote add origin https://github.com/YOUR_USERNAME/terrawatch.git
git branch -M main
git push -u origin main
```

Done. Your project is on display on GitHub.
