import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
  delay?: number;
}

export default function FadeInSection({ children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div
    ref={ref}
    className={`fade-section ${isVisible ? "visible" : ""}`}
    style={{ transitionDelay: `${delay || 0}ms` }}
    >
      {children}
    </div>
  );
}