import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/layout/Layout';
import FadeInSection from "./components/FadeInSection";
import EventsPage from './pages/Events';
import EventDetailsPage from './pages/Event_EventID';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MembersPage from './pages/Members';
import ActivitiesPage from './pages/Activities';
import About from './pages/About';
import {useEffect, useState} from 'react';
import Carousel from './components/Carousel';
import Profile from './pages/Profile_ProfileID';
import UnderConstr from "./components/UnderConstr";
import ContactMD from './pages/Contact_MD';

function AnimatedRoutes() {

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/events/get`)
    .then((res) => res.json())
    .then((data) => {

      const grouped: Record<string, any> = {};

      data.forEach((row: any) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            title: row.title,
            location: row.location,
            description: row.description,
            flyer: row.flyer_url,
            dates: [],
          };
        }
        grouped[row.id].dates.push(row.date);
      });

      const events = Object.values(grouped);
      const now = Date.now();
      const upcoming: any[] = [];
      const past: any[] = [];

      events.forEach((event: any) => {
        const dates = event.dates.map((d: string) =>
          new Date(d).getTime()
        );

        const hasEventsInFuture = dates.some((d: number) => d >= now);

        if (hasEventsInFuture) {
          upcoming.push({
            ...event,
            dates,
          });
        } else {
          past.push({
            ...event,
            dates,
          });
        }
      });

      upcoming.sort(
        (a, b) =>
          Math.min(...a.dates) - Math.min(...b.dates)
      );
      past.sort(
        (a, b) =>
          Math.max(...b.dates) - Math.max(...a.dates)
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    })
    .catch((err) => {
      console.error(err);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const location = useLocation();

  const carouselDiv = (
    <>
    <FadeInSection delay={150}>
      {upcomingEvents.length === 0 ? 
        <>
          <div className="carousel-wrapper"> 
            <h2>There are currently no upcoming events</h2>
            <a className="read-more" href="/events">Check out our events calendar!</a>
          </div>
        </> 
        : 
        <>
        <Carousel title="Upcoming Events"
        events={upcomingEvents}/>
        </>}
        <Carousel
        title="Past Events"
        events={pastEvents}/>
    </FadeInSection>
    </>
  );

  return (
    <Routes location={location} key={location.pathname}>
      <Route
      path="/"
      element={
        <Layout pageTitle ="EXSA - Home" heroText="Emerald Xcellence Sports Academy">
          <main className="home-container">
          <FadeInSection>
            <section className="home-intro">
              <h1 className="header-p">Building Stronger Bodies, Confident Minds, and Connected Communities</h1>
              <h2> Inclusive programs for youth and adults of all abilities—focused on movement, skill development, and community engagement.</h2>
            </section>
          </FadeInSection>
          {loading || error ? <UnderConstr /> : carouselDiv}         
          <FadeInSection>
            <section className="home-intro">
              <div className="survey-links">
                <h4>Join our community and get involved by filling out our wellness surveys!</h4>
                <a 
                href="https://forms.gle/JcvDJ1uW4qU3Us9V6" 
                target="_blank" rel="noopener noreferrer" 
                className="read-more">
                  Wellness Survey for Youth and Families
                </a>
                <a 
                href="https://forms.gle/4jVAVWzUtj7xXkPm7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-more">
                  Wellness Survey for Seniors
                </a>
              </div>
            </section>
            </FadeInSection>
          </main>
        </Layout>
      }
      />
      <Route
      path="/about"
      element={
        <Layout pageTitle ="EXSA - About" heroText="About Us">
          <main className="about-main">
            <About />
          </main>
        </Layout>
      }
      />
      <Route
      path="/activities"
      element={
        <Layout pageTitle ="EXSA - Activities" heroText="Our Activities">
          <main className="activities-container">
            <ActivitiesPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/events"
      element={
        <Layout pageTitle ="EXSA - Events" heroText="Upcoming and Past Events">
          <main>
            <EventsPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/events/:eventId"
      element={
        <Layout pageTitle ="EXSA - Events Sign Up" heroText="Event Sign Up">
          <main>
            <EventDetailsPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/login"
      element={
        <Layout pageTitle ="EXSA - Login" heroText="EXSA Member Login">
          <main>
            <Login />
          </main>
        </Layout>
      }
      />
      <Route
      path="/signup"
      element={
      <Layout pageTitle ="EXSA - Signup" heroText="Become A Member">
        <main>
          <Signup />
        </main>
      </Layout>
      }
      />
      <Route
      path="/members"
      element={
      <Layout pageTitle ="EXSA - Members" heroText="Our Staff and Volunteers">
        <main className="members-container">
          <MembersPage />
        </main>
      </Layout>
      }
      />
      <Route
      path="/profile/:id"
      element={
      <Layout pageTitle ="User Profile" heroText="Profile">
        <main>
          <Profile />
        </main>
      </Layout>
      }
      />
      <Route
      path="/md"
      element={
      <Layout pageTitle ="Mia Delamater" heroText="Mia Delamater">
        <main className="contact-container">
          <ContactMD />
        </main>
      </Layout>
      }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
