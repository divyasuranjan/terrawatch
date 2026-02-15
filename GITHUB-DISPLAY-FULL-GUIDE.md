# Display TerraWatch on GitHub — Full Step-by-Step Guide

Follow these steps in order. Do each step before moving to the next.

---

## Part 1: Get ready on your computer

### Step 1.1: Open Terminal

- **On Mac:** Press **Cmd + Space**, type **Terminal**, press **Enter**.
- **In Cursor:** Menu **Terminal** → **New Terminal** (or press **Ctrl+`**).

You should see a window with a line ending in `%` or `$`.

---

### Step 1.2: Load your environment (so Git works)

Type this and press **Enter**:

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

The prompt will appear again. That’s correct.

---

### Step 1.3: Go to the TerraWatch project folder

Type this and press **Enter**:

```bash
cd ~/Desktop/projects/terrawatch
```

Your prompt may now show `terrawatch` at the end. You are inside the project.

---

### Step 1.4: Confirm .env.local is ignored (so your keys are never uploaded)

Type this and press **Enter**:

```bash
cat .gitignore | grep env
```

You should see lines like `.env` and `.env.local`. That means your API keys in `.env.local` will **not** be pushed to GitHub. Your keys stay only on your computer.

---

## Part 2: Create the repository on GitHub

### Step 2.1: Sign in to GitHub

1. Open your browser.
2. Go to **https://github.com**.
3. Click **Sign in** and log in (or create an account if you don’t have one).

---

### Step 2.2: Create a new repository

1. On GitHub, click the **+** icon (top right).
2. Click **New repository**.
3. On the “Create a new repository” page:
   - **Repository name:** type **terrawatch** (all lowercase, no spaces).
   - **Description (optional):** e.g. `Real-time climate & environmental dashboard`.
   - Leave **Public** selected.
   - **Do not** check “Add a README file”.
   - **Do not** add .gitignore or license.
4. Click the green **Create repository** button.

---

### Step 2.3: Copy your repository URL

On the next page you’ll see “Quick setup” with a URL like:

**https://github.com/YOUR_USERNAME/terrawatch.git**

- Replace **YOUR_USERNAME** with your actual GitHub username (e.g. if your username is `divyasuranjan`, the URL is `https://github.com/divyasuranjan/terrawatch.git`).
- Copy this URL (Ctrl+C or Cmd+C). You’ll use it in Part 4.

---

## Part 3: Put your project under Git (first time only)

Do this only if you have **not** already run `git init` in this project. If you already did and made a commit, skip to Part 4.

### Step 3.1: Initialize Git

In the same Terminal (still in the `terrawatch` folder), type and press **Enter**:

```bash
git init
```

You should see: `Initialized empty Git repository in .../terrawatch/.git/`

---

### Step 3.2: Stage all files

Type and press **Enter**:

```bash
git add .
```

Nothing will print. That’s normal.

---

### Step 3.3: Check what will be committed

Type and press **Enter**:

```bash
git status
```

- You should see a list of files (e.g. `package.json`, `src/app/page.tsx`, etc.).
- You should **not** see `.env.local` or `node_modules` in the list. If you do, stop and check that `.gitignore` contains `.env.local` and `node_modules/`.

---

### Step 3.4: Create the first commit

Type this **exactly** as one command (it’s two words: `git` and `commit`, then the rest):

```bash
git commit -m "TerraWatch v1 — climate dashboard"
```

Press **Enter**.

You should see something like: `X files changed, Y insertions(+)`. That means the commit was created.

---

## Part 4: Connect your project to GitHub and push

### Step 4.1: Add GitHub as the remote

Type this, but **replace YOUR_USERNAME** with your real GitHub username (the one in the URL you copied):

```bash
git remote add origin https://github.com/YOUR_USERNAME/terrawatch.git
```

Example: if your username is `divyasuranjan`, the command is:

```bash
git remote add origin https://github.com/divyasuranjan/terrawatch.git
```

Press **Enter**.

- If you see `fatal: remote origin already exists`, the remote is already set. Update it with:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/terrawatch.git
```

(Again, replace YOUR_USERNAME.)

---

### Step 4.2: Name your branch main

Type and press **Enter**:

```bash
git branch -M main
```

Nothing will print. That’s normal.

---

### Step 4.3: Push to GitHub

Type and press **Enter**:

```bash
git push -u origin main
```

---

### Step 4.4: Log in when asked

Git may ask:

**Username for 'https://github.com':**

- Type your **GitHub username** (e.g. `divyasuranjan`) and press **Enter**.

**Password for 'https://yourusername@github.com':**

- **Do not** type your GitHub account password. GitHub does not accept passwords for Git.
- You must use a **Personal Access Token**:
  1. Go to **https://github.com/settings/tokens** in your browser.
  2. Click **Generate new token** → **Generate new token (classic)**.
  3. Give it a name (e.g. `terrawatch`), choose an expiration (e.g. 90 days), tick **repo**.
  4. Click **Generate token**, then **copy the token** (it starts with `ghp_`).
  5. Back in Terminal, when it asks for **Password**, **paste the token** (Cmd+V). Nothing will show as you paste. Press **Enter**.

**Alternative (easier):** If you have GitHub CLI installed, run:

```bash
gh auth login
```

Follow the prompts (choose HTTPS, then “Login with a web browser”). After that, run `git push -u origin main` again; it won’t ask for username/password.

---

### Step 4.5: Confirm the push worked

You should see something like:

```
Enumerating objects: ...
Writing objects: 100% ...
To https://github.com/YOUR_USERNAME/terrawatch.git
 * [new branch]      main -> main
```

---

## Part 5: See your project on GitHub

### Step 5.1: Open the repository in your browser

Go to:

**https://github.com/YOUR_USERNAME/terrawatch**

(Replace YOUR_USERNAME with your username.)

You should see your TerraWatch files (e.g. `src`, `package.json`, `README.md`). Your project is now **on display** on GitHub.

---

### Step 5.2: Pin the repository on your profile (optional)

1. Go to **https://github.com/YOUR_USERNAME** (your profile page).
2. In the “Repositories” or “Pinned” section, click **Customize your pins** (or similar).
3. Click **Add** and select **terrawatch**.
4. Save. TerraWatch will appear as a pinned repo on your profile.

---

## Part 6: Later — when you change the project and want to update GitHub

Whenever you change code and want GitHub to show the latest version:

1. Open Terminal.
2. Run: `eval "$(/opt/homebrew/bin/brew shellenv)"`
3. Run: `cd ~/Desktop/projects/terrawatch`
4. Run these three commands one after the other:

```bash
git add .
git commit -m "Short description of what you changed"
git push
```

Your GitHub repo will update.

---

## Quick checklist

- [ ] Terminal open, env loaded, in `terrawatch` folder
- [ ] `.gitignore` includes `.env.local` (so keys aren’t pushed)
- [ ] New repo created on GitHub named `terrawatch` (no README added)
- [ ] `git init` and `git add .` and `git commit -m "..."` run (commit is one command)
- [ ] `git remote add origin https://github.com/YOUR_USERNAME/terrawatch.git`
- [ ] `git branch -M main`
- [ ] `git push -u origin main` (use token as password, or `gh auth login` first)
- [ ] Repo visible at https://github.com/YOUR_USERNAME/terrawatch
- [ ] (Optional) Pinned on your profile

---

That’s the full process from the beginning to displaying TerraWatch on GitHub.
