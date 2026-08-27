# Deploying the site (Vercel) + database (Render)

This site has two parts that get deployed separately:

- **Frontend** (`index.html` + `images/`) → Vercel
- **Backend + database** (`server/`) → Render

They talk to each other over the internet once both are live.

---

## Part 1 — Push the project to GitHub

Both Vercel and Render deploy from a GitHub repository.

1. Create a free account at https://github.com if you don't have one.
2. Create a new repository, e.g. `karunik-kalyan-samiti`.
3. Upload this whole folder (`index.html`, `images/`, `server/`) into that repository.
   Easiest way: on the repo page, click **Add file → Upload files**, drag in
   everything, and commit.

---

## Part 2 — Deploy the backend (database) on Render

1. Create a free account at https://render.com and sign in with GitHub.
2. Click **New → Web Service**, and pick your `karunik-kalyan-samiti` repo.
3. Fill in:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Click **Create Web Service**. Render will build and start it — this takes
   a couple of minutes.
5. Once it's live, Render gives you a URL like:
   ```
   https://karunik-kalyan-samiti.onrender.com
   ```
   Copy this — you'll need it in Part 3.

**Good to know about the free tier:**
- The free service "sleeps" after 15 minutes of no traffic. The first
  request after that takes ~30–50 seconds to wake up — normal, not a bug.
- On the free plan, the `samiti.db` file resets if the service restarts or
  redeploys (no persistent disk on free tier). For a live samiti site with
  real volunteers signing up, it's worth upgrading to Render's cheapest paid
  plan with a **persistent disk** once you're ready to rely on it long-term,
  so entries are never lost on restart. I can help set that up when you're
  ready.

---

## Part 3 — Deploy the frontend on Vercel

1. Before deploying, open `index.html`, find this line near the bottom:
   ```js
   const API_BASE_URL = "http://localhost:3000";
   ```
   and change it to your Render URL from Part 2:
   ```js
   const API_BASE_URL = "https://karunik-kalyan-samiti.onrender.com";
   ```
   Save and push this change to GitHub (upload the updated file again).

2. Create a free account at https://vercel.com and sign in with GitHub.
3. Click **Add New → Project**, pick your `karunik-kalyan-samiti` repo.
4. Vercel auto-detects it as a static site — leave the settings as default
   (no build command needed since it's plain HTML).
5. Click **Deploy**. In under a minute you'll get a live URL like:
   ```
   https://karunik-kalyan-samiti.vercel.app
   ```

That's your live website. Photos, the donate QR, and the volunteer form
(now saving to the real database on Render) will all work from this link.

---

## Testing after deployment

1. Open your Vercel URL.
2. Submit the volunteer form with test details.
3. Visit `https://<your-render-url>/api/volunteers` — your test entry should
   appear there. If it does, everything is connected correctly.
4. Delete the test entry later using DB Browser for SQLite, or just leave it
   — your call.

---

## Updating the site later

Any time you want to change content or photos: edit the files, upload the
changed files to GitHub again — both Vercel and Render redeploy
automatically within a minute or two.
