import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {getEvents} from '../api/events.api';
import {groupEvents, buildCalendarMap} from '../utils/event';

export default function EventsCalendar() {

  const [eventsByDate, setEventsByDate] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function loadEvents() {

    try {
      const rows = await getEvents();
      const events = groupEvents(rows);
      setEventsByDate(buildCalendarMap(events));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    loadEvents();

  }, []);
  
  return (
    <>
      <section className="calendar-container">
        {(loading || error) ? (<Calendar/>) : (

           <Calendar tileContent={({ date }) => {
            const key = date.toLocaleDateString("en-CA");
            const dayEvents = eventsByDate[key];

            if (!dayEvents) return null;

            return (
              <div style={{ fontSize: "0.7rem" }}>
                {dayEvents.slice(0, 2).map((event) => (
                  <div key={event.id}>
                    <Link to={`/events/${event.id}`}>
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
          }}/>

        )}
      </section>
    </>
  );
}