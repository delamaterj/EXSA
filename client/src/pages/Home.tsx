import { useEffect, useState } from "react";
import FadeInSection from "../components/FadeInSection";
import Carousel from "../components/Carousel";
import { getEvents } from "../api/events.api";
import { groupEventsHome } from "../utils/event";
import { hasUpcomingDates } from "../utils/datetime";

import type {Event} from "../types/events";

export default function Home() {

    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);

    async function loadEvents() {

        try {

            const rows = await getEvents();
            const events = groupEventsHome(rows);

            const upcoming: Event[] = [];
            const past: Event[] = [];

            events.forEach((event) => {

                if (hasUpcomingDates(event.dates ?? [])) {
                    upcoming.push(event);
                } 
                else {
                    past.push(event);
                }

            });

            setUpcomingEvents(upcoming);
            setPastEvents(past);

        } catch (err) {
            console.error(err);
        } 
    }

    useEffect(() => {
        loadEvents();
    }, []);

    

    return (
        <>
            <FadeInSection>
                <section className="home-intro">
                    <h1 className="header-p">Building Stronger Bodies, Confident Minds, and Connected Communities</h1>
                    <h2> Inclusive programs for youth and adults of all abilities—focused on movement, skill development, and community engagement.</h2>
                </section>
            </FadeInSection>
                               
            <FadeInSection>
                <section className="home-intro">
                    <div className="survey-links">
                        <h4>Join our community and get involved by filling out our wellness surveys!</h4>
                        <a href="https://forms.gle/JcvDJ1uW4qU3Us9V6" 
                        target="_blank" rel="noopener noreferrer" 
                        className="read-more"> Wellness Survey for Youth and Families</a>
                        <a href="https://forms.gle/4jVAVWzUtj7xXkPm7" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="read-more">Wellness Survey for Seniors</a>
                    </div>
                </section>
            </FadeInSection>

            {(upcomingEvents.length > 0) && <Carousel title="Upcoming Events" events={upcomingEvents}/>}
            {(pastEvents.length > 0) && <Carousel title="Past Events" events={pastEvents}/>}
        </>
    );
}