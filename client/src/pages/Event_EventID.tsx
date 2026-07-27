import {useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import type {Event} from '../types/events';
import {getEventId} from '../api/events.api';
import {groupSingleEvent} from '../utils/event';
import {formatPhone, isValidPhone} from '../utils/phone';
import {isValidEmail} from '../utils/email';
import {createRsvp} from '../api/rsvps.api';
import {getUser} from '../utils/storage';
import {formatEventDate, getUpcomingDates} from '../utils/datetime';

export default function EventID() {

  const {eventId} = useParams();
  const [event, setEvent] = useState<Event>();
  const [name, setName] = useState(getUser()?.name || "");
  const [email, setEmail] = useState(getUser()?.email || "");
  const [phone, setPhone] = useState(getUser()?.phone || "");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setSelectedDates([""]);
    setMessage("");
  };

  async function handleRsvp() {
    try {

      if (selectedDates.length === 0) {
        setMessage("Please select at least one date to RSVP for.");
        return;
      }

      if (!isValidPhone(phone)) {
        setMessage("Please enter a valid phone number.");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("Please enter a valid email.");
        return;
      }

      if(!eventId) {
        return;
      }

      const data = await createRsvp({
        event_date_ids: selectedDates,
        name: name,
        email: email,
        phone: phone,
        user_id: getUser()?.id,
      });
    
      alert(`Rsvp ${data.id} successful!`);
      resetForm();
      window.location.reload();
    }
    catch(err) {
      console.error(err instanceof Error ? err.message : "Could not rsvp for event");
      setMessage("Could not rsvp for event");
    }
  }

  useEffect(() => {

    async function loadEvent() {
      if (!eventId) return;

      const rows = await getEventId(eventId);

      setEvent(groupSingleEvent(rows));
    }

    loadEvent();

  }, [eventId]);

  const upcomingDates =
    event
        ? getUpcomingDates(event.dates)
        : [];

  return (
    <>
      <article className="form-container">
        <h2>Sign up for {event ? event.title : "our event!"}</h2>

        <section className={`event-content ${event?.flyer_url ? "has-flyer" : ""}`}>
          {event?.flyer_url && (
            <picture className="event-flyer-container">
              <img src={`/${event.flyer_url}`}
              alt={`${event.title} flyer`}
              className="event-flyer"/>
            </picture>
          )}
            
          <div className="event-form">
            {upcomingDates.length > 0 ? (
              <form onSubmit={handleRsvp}>
                <label>Name<b className="error-text"> *</b></label>
                <input value={name}
                onChange={(e) => setName(e.target.value)}
                required/>

                <label>Email<b className="error-text"> *</b></label>
                <input type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>

                <label>Phone Number<b className="error-text"> *</b></label>
                <input type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required/>

                <label>Select date(s) to RSVP for:<b className="error-text"> *</b></label>
                <select multiple
                value={selectedDates.map(String)}
                onChange={(e) =>
                  setSelectedDates(
                  Array.from(e.target.selectedOptions, (option) =>
                    option.value)
                  )
                }>
                  {upcomingDates.map((d) => (
                    <option key={d.id} value={d.id}>
                      {formatEventDate(d.starts_at)}
                    </option>
                  ))}
                </select>

                <button type="submit">RSVP</button>

                {message && <p>{message}</p>}
                <div className="qr-code">
                  <h3>Payments are accepted via. Venmo or Zelle. Submit your payment to fully RSVP for an event!</h3>
                  <img src="/exsa-venmo.jpeg" alt="Venmo QR Code" />
                  <img src="/exsa-zelle.jpeg" alt="Zelle QR Code" />
                </div>
              </form>
      ) : (
            <>
              <div className="qr-code">
                <p>This event has no upcoming dates available for RSVP.</p>
                <Link className="read-more" to="/events">Check out our other events</Link>
              </div>
            </>
          )}    
          </div>
        </section>
      </article>
    </>
  );
}