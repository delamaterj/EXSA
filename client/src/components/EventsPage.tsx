import React, { useState, useEffect } from "react";

// Define TypeScript type for an Event
type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
};

function EventsPage() {
  // --- State for existing events ---
  const [events, setEvents] = useState<Event[]>([]);

  // --- State for form inputs ---
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // --- Fetch events from backend on mount ---
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  // --- Handle form submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, location }),
    });
    const newEvent = await response.json();
    setEvents([...events, newEvent]); // Add new event to state
    setTitle(""); // Clear form
    setDate("");
    setLocation("");
  };

  return (
    <div>
      <h1>Upcoming Events</h1>

      {/* --- Event Creation Form --- */}
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">Add Event</button>
      </form>

      {/* --- Display Events --- */}
      {events.map((event) => (
        <div key={event.id}>
          <a href={`/Events/${event.id}`}>
            <h2>{event.title}</h2>
          </a>
          <p>{event.date}</p>
          <p>{event.location}</p>
        </div>
      ))}
    </div>
  );
}

export default EventsPage;