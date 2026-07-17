import FadeInSection from './FadeInSection';
import type {Event} from '../types/events';
import {Link} from 'react-router-dom';

type Props = {
  title: string;
  events: Event[];
};

export default function Carousel({ title, events }: Props) {

  const MAX_ITEMS = 4;

  // 1. filter + sort + limit
  const visibleEvents = events.filter((event) => event.flyer_url).slice(0, MAX_ITEMS);

  return (
    <>
    <FadeInSection>
    <div className="carousel-wrapper">
      <h2>{title}</h2>

      <div className="carousel-controls">
      </div>

      <div
        className={`carousel-container ${
          visibleEvents.length === 1 ? "single" : ""
        }`}
      >
        {visibleEvents.map((event) => (
          <div key={event.id} className="carousel-card">
            <Link to={`/events/${event.id}`}>
            <img
              src={`/${event.flyer_url}`}
              alt={event.title}
              className="carousel-image"
            />
            </Link>
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </div>
    </FadeInSection>
    </>
  );
}