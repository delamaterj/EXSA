import { useRef } from "react";

type Props = {
  title: string;
  events: any[];
};

export default function Carousel({ title, events }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 300;

    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-wrapper">

      <h2>{title}</h2>

      <div className="carousel-controls">
        {/*<button onClick={() => scroll("left")}>←</button>
        <button onClick={() => scroll("right")}>→</button>*/}
      </div>

      <div className="carousel-container" ref={containerRef}>

        {events.map((event) => (
          <div key={event.id} className="carousel-card">

            {event.flyer && (
              <img
                src={`/${event.flyer}`}
                alt={event.title}
                className="carousel-image"
              />
            )}

            <h3>{event.title}</h3>

          </div>
        ))}

      </div>
    </div>
  );
}