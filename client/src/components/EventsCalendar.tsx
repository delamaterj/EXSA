import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UnderConstr from "./UnderConstr";

function EventsCalendar() {

    const [eventsByDate, setEventsByDate] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

  fetch(`${import.meta.env.VITE_API_URL}/events`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    })
    .then((data) => {
      // STEP 1: group rows into events
      const grouped: { [key: number]: any } = {};

      data.forEach((row: any) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            title: row.title,
            location: row.location,
            description: row.description,
            dates: [],
            uuid: row.uuid,
          };
        }

        if (row.date) {
          grouped[row.id].dates.push(row.date);
        }
      });

      const eventsArray = Object.values(grouped);

      // STEP 2: convert into eventsByDate
      const eventsMap: { [key: string]: any[] } = {};

      eventsArray.forEach((event: any) => {
        event.dates.forEach((date: string) => {
          const key = new Date(date).toLocaleDateString("en-CA");

          if (!eventsMap[key]) {
            eventsMap[key] = [];
          }

          eventsMap[key].push(event);
        });
      });

      // STEP 3: store final result
      setEventsByDate(eventsMap);
    })
    .catch((err) => {
      console.error(err);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
    
    if (loading) return <UnderConstr />;
    if (error) return <p>Events unavailable. Check again later!</p>;

return (
    <div className="calendar-container">
  <Calendar
    tileContent={({ date }) => {
      const key = date.toLocaleDateString("en-CA");
      const dayEvents = eventsByDate[key];

      if (!dayEvents) return null;

      return (
        <div style={{ fontSize: "0.7rem" }}>
          {dayEvents.slice(0, 2).map((event) => (
            <div key={event.id}>
              <Link to={`/events/${event.uuid}`}>
              <div className="calendar-event-link">
                {event.title}
                </div>
              </Link>
            </div>
          ))}
          {dayEvents.length > 2 && (
            <div>+{dayEvents.length - 2} more</div>
          )}
        </div>
      );
    }}
  />
  </div>
);
}

export default EventsCalendar;