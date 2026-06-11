
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sns = new AWS.SNS();

const app = express();
app.use(cors({
  origin: process.env.ORIGIN_NAME,
}));
app.use(express.json());

const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  ssl: {
    rejectUnauthorized: false,
  },
  datestrings: true,
  timezone: "Z",
});
module.exports = pool;

const PORT = process.env.PORT || 5000;

// get all events
app.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        e.id,
        e.title,
        e.location,
        e.description,
        e.flyer,
        ed.date
      FROM events e
      JOIN event_dates ed ON e.id = ed.event_id
      ORDER BY ed.date
    `);

    res.json(rows); // returns rows with real dates
  } catch (err) {
    console.error("GET /events error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// post new event
app.post("/events", async (req, res) => {
  const { title, location, description, dates, flyer } = req.body;

  try {
    // 1. Insert event
    const [result] = await pool.query(
      "INSERT INTO events (title, location, description, flyer) VALUES (?, ?, ?, ?)",
      [title, location, description, flyer || null]
    );

    const eventId = result.insertId;

    // 2. Insert all dates
    for (let date of dates) {
      const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

      await pool.query(
        "INSERT INTO event_dates (event_id, date) VALUES (?, ?)",
        [eventId, formattedDate]
      );
    }

    res.status(201).json({ message: "Event created with multiple dates" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// post rsvp for event
app.post("/events/:id/rsvp", async (req, res) => {
  const eventId = req.params.id;
  const { name, email, phone, dateIds } = req.body; // array of event_date IDs

  if (!name || !email || !phone || !dateIds || !dateIds.length) {
    return res.status(400).json({ error: "Name, email, phone, and at least one date required" });
  }

  try {
    // insert an RSVP for each selected date
    const promises = dateIds.map((dateId) =>
      pool.query(
        "INSERT INTO rsvps (event_id, event_date_id, name, email, phone) VALUES (?, ?, ?, ?, ?)",
        [eventId, dateId, name, email, phone]
      )
    );
    await Promise.all(promises);

    const [eventRows] = await pool.query(
    "SELECT title FROM events WHERE id = ?",
    [eventId]
    );

    const [dateRows] = await pool.query(
  `SELECT date
   FROM event_dates
   WHERE id IN (?)`,
  [dateIds]
);

const formattedDates = dateRows
  .map((d) =>
    new Date(d.date).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  )
  .join("\n");

const eventTitle = eventRows[0]?.title || "Unknown Event";  

    await sns.publish({
  TopicArn: process.env.SNS_TOPIC_ARN,
  Subject: "New RSVP Submitted",
  Message: `
New RSVP received

Event: ${eventTitle}

Name: ${name}
Email: ${email}
Phone: ${phone}

Selected Dates:
${formattedDates}
  `,
}).promise();

    res.status(201).json({ message: "RSVP successful for selected date(s)" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// get an event by id
app.get("/events/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.title, e.description, e.location,
             e.flyer, d.id AS date_id, d.date
       FROM events e
       LEFT JOIN event_dates d ON e.id = d.event_id
       WHERE e.id = ?`,
      [eventId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows); // returns array of {event + date} objects
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const bcrypt = require("bcrypt");
const saltRounds = 10;

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email address",
    });
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, phone]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Error trying to sign up. Please try again later" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.json({ message: "Login successful!", user: {
    id: user.id,
    name: user.name,
    role: user.role,
  }, });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occured while logging in. Please try again later" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});