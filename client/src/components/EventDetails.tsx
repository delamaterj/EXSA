import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
};

function EventDetails() {
  const { id } = useParams(); // gets :id from URL

  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/events/${id}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      alert("RSVP successful!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error submitting RSVP");
    }
  };

  return (
    <div>
      <h2>{event ? `Sign up for ${event.title}` : "Loading event..."}</h2>

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
        <button type="submit">RSVP</button>
      </form>
    </div>
  );
}

export default EventDetails;