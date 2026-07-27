import {useState} from 'react';
import EventsCalendar from '../components/Calendar';
import {createEvent} from '../api/events.api';
import {toUTC} from '../utils/datetime';
import {getUser} from '../utils/storage';
import {isValidImg} from '../utils/img';

export default function Events() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [flyer_url, setFlyer] = useState("");
  const [dates, setDates] = useState<string[]>([""]);
  const [error, setError] = useState("");

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setFlyer("");
    setDates([""]);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    const utcDates = dates.map(toUTC);

    if(flyer_url && !isValidImg(flyer_url)){
      setError("Incorrect syntax for flyer url");
      return;
    }

    try {
      await createEvent({
        title,
        description,
        location,
        flyer_url,
        dates: utcDates
      });
      alert("Event created!");
      resetForm();
      window.location.reload();
    }
    catch (err) {
      console.error(err instanceof Error ? err.message : err);
      setError("Could not submit event. Please try again later");
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

              <label>Title<b className="error-text"> *</b></label>
              <input value={title}
              onChange={(e) => setTitle(e.target.value)}
              required/>

              <label>Description</label>
              <input value={description}
              onChange={(e) => setDescription(e.target.value)}/>

              <label>Location<b className="error-text"> *</b></label>
              <input value={location}
              onChange={(e) => setLocation(e.target.value)}
              required/>

              <label>Flyer Url</label>
              <input value={flyer_url}
              onChange={(e) => setFlyer(e.target.value)}
              placeholder="example_img.png"/>

              <label>Dates<b className="error-text"> *</b></label>
              {dates.map((date, index) => (
              <div key={index}>
                <input type="datetime-local"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required/>
                <button type="button" onClick={() => removeDate(index)} disabled={dates.length === 1}>
                  Remove
                </button>
              </div>
              ))}
              <br />
              <button type="button" onClick={addDate}>
                  Add Another Date
                </button>
              <button type="submit">Submit Event</button>
              {error && <p className="error-text">{error}</p>}
            </form>
          </section>
        )}
      </article>
    </>
  );
}