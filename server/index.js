const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// get all events
app.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events ORDER BY date");
    res.json(rows); // returns an array of events
  } catch (err) {
    console.error("GET /events error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// post new event
app.post("/events", async (req, res) => {
  const { title, date, location, description } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO events (title, date, location, description) VALUES (?, ?, ?, ?)",
      [title, date, location, description || null] // description is optional
    );

    // Return the newly created event
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /events error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// post rsvp for event
app.post("/events/:id/rsvp", async (req, res) => {
  const eventId = req.params.id;
  const { name, email } = req.body;

  // validations
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  try {
    await pool.query(
      "INSERT INTO rsvps (event_id, name, email) VALUES (?, ?, ?)",
      [eventId, name, email]
    );

    res.status(201).json({ message: "RSVP successful" });
  } catch (err) {
    console.error("RSVP error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// get an event by id
app.get("/events/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [eventId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});