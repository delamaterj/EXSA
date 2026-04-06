import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UnderConstr from "./UnderConstr";

// Updated type to include array of dates with id
type EventDate = {
  id: number;      // event_dates.id
  date: string;    // datetime string
};

type Event = {
  id: number;
  title: string;
  location: string;
  description?: string;
  dates: EventDate[]; // all dates for this event
};

function EventDetails() {
  const { id } = useParams(); // gets :id from URL

  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDates, setSelectedDates] = useState<number[]>([]); // store selected event_date ids
  const [message, setMessage] = useState("");

  // Fetch event details including all dates
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // if your backend returns multiple rows (one per date), group them
        const grouped: Event = {
          id: data[0].id,
          title: data[0].title,
          location: data[0].location,
          description: data[0].description,
          dates: data.map((row: any) => ({ id: row.date_id, date: row.date })),
        };
        setEvent(grouped);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  const upcomingDates =
    event?.dates.filter((d) => new Date(d.date) >= now) || [];

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedDates.length === 0) {
      alert("Please select at least one date to RSVP for.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/events/${id}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, dateIds: selectedDates }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("RSVP successful!");
        setName("");
        setEmail("");
        setSelectedDates([]);
      } else {
        setMessage(data.error || "Error submitting RSVP");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error");
    }
  };

  return (
    <>
    <div className="form-container">
      <h2>{event ? `Sign up for ${event.title}` : <UnderConstr/>}</h2>

      <p>{event?.description}</p>
      <p>Location: {event?.location}</p>

      {upcomingDates.length > 0 ? (
        <form onSubmit={handleRSVP}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />

          <label>Select date(s) to RSVP for:</label>
          <select
            multiple
            value={selectedDates.map(String)}
            onChange={(e) =>
              setSelectedDates(
                Array.from(e.target.selectedOptions, (option) =>
                  parseInt(option.value)
                )
              )
            }
          >
            {upcomingDates.map((d) => (
              <option key={d.id} value={d.id}>
                {new Date(d.date).toLocaleString("en-US", {
                  timeZone: "America/Chicago",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </option>
            ))}
          </select>

          <button type="submit">RSVP</button>
          {message && <p>{message}</p>}
        </form>
      ) : (
        <p>This event has no upcoming dates available for RSVP.</p>
      )}
    </div>
    {!event && <p></p>}
    </>
  );
}

export default EventDetails;