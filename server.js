// Karunik Kalyan Samiti — backend server
// Stores every volunteer form submission permanently in a JSON database file
// (volunteers.json). No external database service, no native/compiled
// dependencies — works on any machine or host with just Node.js.

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Password that protects the volunteer list. Set this as an environment
// variable on Render (Settings → Environment) for the real deployment —
// never leave the default value in production.
const ADMIN_KEY = process.env.ADMIN_KEY || "changeme123";

function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.key;
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'गलत पासवर्ड' });
  }
  next();
}

app.use(cors());
app.use(express.json());

const VOLUNTEERS_DB = path.join(__dirname, 'volunteers.json');
const DONATIONS_DB = path.join(__dirname, 'donations.json');

function readDb(file) {
  if (!fs.existsSync(file)) return [];
  try {
    const raw = fs.readFileSync(file, 'utf8').trim();
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(`Could not read ${file}:`, err.message);
    return [];
  }
}

function writeDb(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

function nextId(rows) {
  return rows.length ? Math.max(...rows.map(r => r.id)) + 1 : 1;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/volunteer', (req, res) => {
  const { name, phone, email, village, interests, message } = req.body;

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: 'नाम आवश्यक है' });
  }
  if (!phone || !/^[0-9]{10}$/.test(String(phone).replace(/\s|-/g, ''))) {
    return res.status(400).json({ error: 'मान्य 10 अंकों का मोबाइल नंबर आवश्यक है' });
  }

  const rows = readDb(VOLUNTEERS_DB);
  const entry = {
    id: nextId(rows),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: email ? String(email).trim() : null,
    village: village ? String(village).trim() : null,
    interests: Array.isArray(interests) ? interests.join(', ') : (interests || ''),
    message: message ? String(message).trim() : null,
    created_at: new Date().toISOString()
  };
  rows.unshift(entry);
  writeDb(VOLUNTEERS_DB, rows);

  res.status(201).json({ success: true, id: entry.id });
});

app.get('/api/volunteers', requireAdminKey, (req, res) => {
  res.json(readDb(VOLUNTEERS_DB));
});

app.post('/api/donation', (req, res) => {
  const { name, phone, amount, note } = req.body;
  const rows = readDb(DONATIONS_DB);
  const entry = {
    id: nextId(rows),
    name: name || null,
    phone: phone || null,
    amount: amount || null,
    note: note || null,
    created_at: new Date().toISOString()
  };
  rows.unshift(entry);
  writeDb(DONATIONS_DB, rows);

  res.status(201).json({ success: true, id: entry.id });
});

app.get('/api/donations', requireAdminKey, (req, res) => {
  res.json(readDb(DONATIONS_DB));
});

app.listen(PORT, () => {
  console.log(`Karunik Kalyan Samiti server running at http://localhost:${PORT}`);
});
