import { useRef } from "react";

type Props = {
  title: string;
  events: any[];
};

export default function Carousel({ title, events }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const MAX_ITEMS = 4;

  // 1. filter + sort + limit
  const visibleEvents = events
    .filter((event) => event.flyer)
    .sort(
      (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
    )
    .slice(0, MAX_ITEMS);

  return (
    <div className="carousel-wrapper">
      <h2>{title}</h2>

      <div className="carousel-controls">
        {/* buttons later */}
      </div>

      <div
        ref={containerRef}
        className={`carousel-container ${
          visibleEvents.length === 1 ? "single" : ""
        }`}
      >
        {visibleEvents.map((event) => (
          <div key={event.id} className="carousel-card">
            <img
              src={`/${event.flyer}`}
              alt={event.title}
              className="carousel-image"
            />
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}