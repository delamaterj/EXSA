import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UnderConstr from "../components/UnderConstr";

// Updated type to include array of dates with id
type EventDate = {
  id: string;      // event_dates.id
  date: string;    // datetime string
};

type Event = {
  id: string;
  title: string;
  location: string;
  description?: string;
  flyer?: string;
  dates: EventDate[]; // all dates for this event
};

function EventDetailsPage() {
  const { eventId } = useParams(); // gets :id from URL
  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDates, setSelectedDates] = useState<string[]>([]); // store selected event_date ids
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value.replace(/\D/g, "");

  let formatted = input;

  if (input.length > 3 && input.length <= 6) {
    formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
  } else if (input.length > 6) {
    formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
  }

  setPhone(formatted);
};

  // Fetch event details including all dates
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/events/get/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        // if your backend returns multiple rows (one per date), group them
        const grouped: Event = {
          id: data[0].id,
          title: data[0].title,
          location: data[0].location,
          flyer: data[0].flyer,
          description: data[0].description,
          dates: data.map((row: any) => ({ id: row.date_id, date: row.date })),
        };
        setEvent(grouped);
      })
      .catch((err) => console.error(err));
  }, [eventId]);

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

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(phone)) {
      setMessage("Please enter a valid phone number.");
    return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/rsvps/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          eventDateIds: selectedDates
        })
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
  <h2>{event ? `Sign up for ${event.title}` : <UnderConstr />}</h2>

  <div className={`event-content ${event?.flyer ? "has-flyer" : ""}`}>

    {/* LEFT SIDE → FLYER */}
    {event?.flyer && (
      <div className="event-flyer-container">
        <img
          src={`/${event.flyer}`}
          alt={`${event.title} flyer`}
          className="event-flyer"
        />
      </div>
    )}
    {event?.title === "Digital Wellness Event (Screen Time Clinic)" ? (
      <a href="https://us06web.zoom.us/meeting/register/st7Kl8f2QyGFrIMt5mDs8Q#/registration" target="_blank" rel="noopener noreferrer" className="read-more">
        <u>Sign Up for Screen Time Clinic</u>
      </a>
    ) : (    
    <div className="event-form">

      {upcomingDates.length > 0 ? (
        <form onSubmit={handleRSVP}>
          <label>Name<b className="error-text"> *</b></label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email<b className="error-text"> *</b></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Phone Number<b className="error-text"> *</b></label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            required
          />

          <label>Select date(s) to RSVP for:<b className="error-text"> *</b></label>
          <select
            multiple
            value={selectedDates.map(String)}
            onChange={(e) =>
              setSelectedDates(
                Array.from(e.target.selectedOptions, (option) =>
                  option.value
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
          <div className="qr-code">
        <h3>Payments are accepted via. Venmo or Zelle. Submit your payment to fully RSVP for an event!</h3>
        <img src="/exsa-venmo.jpeg" alt="venmo" />
        <img src="/exsa-zelle.jpeg" alt="zelle" />
      </div>
        </form>
      ) : (
        <>
        <div className="qr-code">
        <p>This event has no upcoming dates available for RSVP.</p>
        <a className="read-more" href="/events">Check out our other events</a>
        </div>
        </>
      )}    
    </div>)}
  </div>
</div>
    </>
  );
}

export default EventDetailsPage;