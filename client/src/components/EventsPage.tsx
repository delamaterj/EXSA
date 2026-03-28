import React, { useState, useEffect } from "react";
import { formatGroupedDates } from "./formatDate";
import { Link } from "react-router-dom";

// Define TypeScript type for an Event
type Event = {
  id: number;
  title: string;
  location: string;
  description?: string;
  dates: string[];
};

function EventsPage() {
  // --- State for existing events ---
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  // --- State for form inputs ---
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState<string[]>([""]);
  const [location, setLocation] = useState("");

  const handleDateChange = (index: number, value: string) => {
  const newDates = [...dates];
  newDates[index] = value;
  setDates(newDates);

};

  // --- Fetch events from backend on mount ---
  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/events`)
    .then((res) => res.json())
    .then((data) => {
      const grouped: { [key: number]: any } = {};

      // Step 1: Group rows into events with dates[]
      data.forEach((row: any) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            title: row.title,
            location: row.location,
            description: row.description,
            dates: [],
          };
        }

        grouped[row.id].dates.push(row.date);
      });

      const eventsArray = Object.values(grouped);

      // 🔥 Step 2: Split into upcoming vs past
      const now = new Date(
  new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
);

const upcoming: any[] = [];
const past: any[] = [];

eventsArray.forEach((event: any) => {
  const futureDates = event.dates.filter(
    (date: string) => new Date(date) >= now
  );

  const pastDates = event.dates.filter(
    (date: string) => new Date(date) < now
  );

  // If there are future dates → add to upcoming
  if (futureDates.length > 0) {
    upcoming.push({
      ...event,
      dates: futureDates, // 🔥 only future dates
    });
  }

  // If there are past dates → add to past
  if (pastDates.length > 0) {
    past.push({
      ...event,
      dates: pastDates, // 🔥 only past dates
    });
  }
});

      // 🔥 Step 3: (optional but recommended) sort events
      upcoming.sort((a, b) => {
        const aNext = Math.min(...a.dates.map((d: string) => new Date(d).getTime()));
        const bNext = Math.min(...b.dates.map((d: string) => new Date(d).getTime()));
        return aNext - bNext;
      });

      past.sort((a, b) => {
        const aLast = Math.max(...a.dates.map((d: string) => new Date(d).getTime()));
        const bLast = Math.max(...b.dates.map((d: string) => new Date(d).getTime()));
        return bLast - aLast;
      });

      // Step 4: set state
      setUpcomingEvents(upcoming);
      setPastEvents(past);
    });
}, []);

  // --- Handle form submission ---
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await fetch(`${import.meta.env.VITE_API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      location,
      dates,
    }),
  });

  alert("Event created!");

  // reset form
  setDates([""]);
};

  const addDate = () => {
  setDates([...dates, ""]);

};

const removeDate = (index: number) => {
  const newDates = dates.filter((_, i) => i !== index);
  setDates(newDates);
};

const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
  
    <div className="events-container">
      <h2>Upcoming Events</h2>
        {upcomingEvents.map((event) => (
        <div key={event.id}>
          <h3>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </h3>
          <p>{formatGroupedDates(event.dates)}</p>
          <p>{event.location}</p>
        </div>
        ))}
      <h2>Past Events</h2>
        {pastEvents.map((event) => (
        <div key={event.id}>
          <h3>
            <Link to={`/events/${event.id}`}>{event.title}</Link>
          </h3>
          <p>{formatGroupedDates(event.dates)}</p>
          <p>{event.location}</p>
        </div>
        ))}


       {/* --- Event Creation Form --- */}
       {user?.role === "admin" && (
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        {dates.map((date, index) => (
        <div key={index}>
        <input
        type="datetime-local"
        value={date}
        onChange={(e) => handleDateChange(index, e.target.value)}
        required
        />
      <button type="button" onClick={() => removeDate(index)} disabled={dates.length === 1}>
        Remove
      </button>
      <button type="button" onClick={addDate}>
        Add Another Date
      </button>
    </div>
))}
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit">Add Event</button>
      </form>
      </div>)}

    </div>
  );
}

export default EventsPage;