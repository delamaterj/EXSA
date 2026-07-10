import React, {useState, useEffect} from 'react';
import {DateTime} from 'luxon';
import EventsCalendar from '../components/EventsCalendar';

export default function Events() {

  const [title, setTitle] = useState("");
  const [dates, setDates] = useState<string[]>([""]);
  const [location, setLocation] = useState("");

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/events/get`)
    .then((res) => res.json())
    .then((data) => {
      const grouped: { [key: number]: any } = {};

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

  if (futureDates.length > 0) {
    upcoming.push({
      ...event,
      dates: futureDates,
    });
  }

  if (pastDates.length > 0) {
    past.push({
      ...event,
      dates: pastDates,
    });
  }
});

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
    });
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const utcDates = dates.map((date) => {
    return DateTime
      .fromISO(date, { zone: "America/Chicago" })
      .toUTC()
      .toISO();
  });

  await fetch(`${import.meta.env.VITE_API_URL}/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      title,
      location,
      dates: utcDates,
    }),
  });
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
    <>
      <article>
        <EventsCalendar />
        {user?.role === "ADMIN" && (
          <section className="form-container">
            <h2>Add Events (Admin)</h2>
            <form onSubmit={handleSubmit}>
              <input value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required/>
              {dates.map((date, index) => (
              <div key={index}>
                <input type="datetime-local"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required/>
                <button type="button" onClick={() => removeDate(index)} disabled={dates.length === 1}>
                  Remove
                </button>
                <button type="button" onClick={addDate}>
                  Add Another Date
                </button>
              </div>
              ))}
              <input value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required/>
              <button type="submit">Add Event</button>
            </form>
          </section>
        )}
      </article>
    </>
  );
}