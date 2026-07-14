import React, {useState} from 'react';
import EventsCalendar from '../components/Calendar';
import {createEvent} from '../api/events.api';
import {toUTC} from '../utils/datetime';
import {getUser} from '../utils/storage';

export default function Events() {

  const [title, setTitle] = useState("");
  const [dates, setDates] = useState<string[]>([""]);
  const [location, setLocation] = useState("");

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const resetForm = () => {
    setTitle("");
    setDates([""]);
    setLocation("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const utcDates = dates.map(toUTC);

    try {
      await createEvent({
        title,
        location,
        dates: utcDates
      });
      alert("Added Event!");
      resetForm;
    }
    catch (err) {
      console.error(err instanceof Error ? err.message : err);
    }
  };

  const addDate = () => {
    setDates([...dates, ""]);
  };

  const removeDate = (index: number) => {
    const newDates = dates.filter((_, i) => i !== index);
    setDates(newDates);
  };

  const user = getUser();

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