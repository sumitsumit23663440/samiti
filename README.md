# Karunik Kalyan Samiti — Backend Server (MySQL)

This backend saves every "स्वयंसेवक बनें" (volunteer) form submission
permanently into a MySQL database.

## What's in here

- `server.js` — the server (Express + MySQL)
- `schema.sql` — run this once to create the database and tables
- `.env.example` — template for your database credentials
- `package.json` — dependencies (express, cors, mysql2, dotenv — all pure JS, no compiling needed)

## Step 1 — Install MySQL

If you don't already have MySQL installed, the easiest way on Windows is
**XAMPP** (includes MySQL + phpMyAdmin, a visual database tool):

1. Download it from https://www.apachefriends.org
2. Install it, then open the **XAMPP Control Panel**
3. Click **Start** next to **MySQL**

## Step 2 — Create the database

1. In XAMPP Control Panel, click **Admin** next to MySQL (opens phpMyAdmin
   in your browser), or go to http://localhost/phpmyadmin directly.
2. Click the **SQL** tab.
3. Open `schema.sql` from this folder in a text editor, copy all of it,
   paste it into the SQL box in phpMyAdmin, and click **Go**.
4. You should now see a new database called `karunik_kalyan_samiti` with
   two tables: `volunteers` and `donations`.

## Step 3 — Configure your credentials

1. In this `server` folder, copy `.env.example` and rename the copy to `.env`
2. Open `.env` in a text editor. On a fresh XAMPP install, the defaults
   already work:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=karunik_kalyan_samiti
   PORT=3000
   ```
   (XAMPP's MySQL has no password by default — leave `DB_PASSWORD` blank
   unless you set one yourself.)

## Step 4 — Run the server

```bash
cd server
npm install
npm start
```

You should see:

```
Karunik Kalyan Samiti server running at http://localhost:3000
Connected to MySQL database: karunik_kalyan_samiti
```

## Checking it's working

1. Visit http://localhost:3000/api/health — it should say
   `{"status":"ok","database":"connected"}`. If it says `not connected`,
   double-check MySQL is running in XAMPP and your `.env` values are correct.
2. Open `index.html` (the website) and submit a test volunteer entry.
3. Visit http://localhost:3000/api/volunteers — your entry should appear.
4. Or open phpMyAdmin → `karunik_kalyan_samiti` → `volunteers` table to see
   it directly as a spreadsheet-style table.

## Deploying it live

MySQL hosting on Render works differently from before — see `DEPLOY.md` in
the main project folder. In short: you'll need a hosted MySQL database
(Render offers this, or services like PlanetScale/Aiven have free tiers),
and you'll set the same `DB_HOST`, `DB_USER`, etc. as environment variables
on your hosting provider instead of a local `.env` file.
