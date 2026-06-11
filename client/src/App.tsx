import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import FadeInSection from "./components/FadeInSection";
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MembersPage from './pages/MembersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AboutPage from './pages/AboutPage';
import {useEffect, useState} from 'react';
import Carousel from './components/Carousel';

function AnimatedRoutes() {

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/events`)
    .then((res) => res.json())
    .then((data) => {

      const grouped: Record<number, any> = {};

      data.forEach((row: any) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            title: row.title,
            location: row.location,
            description: row.description,
            flyer: row.flyer,
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
    });
  }, []);

  const location = useLocation();

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
          <FadeInSection delay={150}>
            <Carousel
            title="Upcoming Events"
            events={upcomingEvents}
            />
            <Carousel
            title="Past Events"
            events={pastEvents}
            />
          </FadeInSection>
          <FadeInSection>
            <section className="home-intro">
              <div className="survey-links">
                <h4>Join our community and get involved by filling out our wellness surveys!</h4>
                <a 
                href="https://forms.gle/JcvDJ1uW4qU3Us9V6" 
                target="_blank" rel="noopener noreferrer" 
                className="btn btn-primary">
                  Wellness Survey for Youth and Families
                </a>
                <a 
                href="https://forms.gle/4jVAVWzUtj7xXkPm7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary">
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
      path="/About"
      element={
        <Layout pageTitle ="EXSA - About" heroText="About Us">
          <main className="about-main">
            <AboutPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/Activities"
      element={
        <Layout pageTitle ="EXSA - Activities" heroText="Our Activities">
          <main className="activities-container">
            <ActivitiesPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/Events"
      element={
        <Layout pageTitle ="EXSA - Events" heroText="Upcoming and Past Events">
          <main>
            <EventsPage />
          </main>
        </Layout>
      }
      />
      <Route
      path="/Events/:id"
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
      path="/Members"
      element={
      <Layout pageTitle ="EXSA - Members" heroText="Our Staff and Volunteers">
        <main className="members-container">
          <MembersPage />
        </main>
      </Layout>
      }
      />
      <Route
      path="/md"
      element={
      <Layout pageTitle ="Mia Delamater" heroText="Mia Delamater">
        <main className="contact-container">
          <div className="contact-card">
            <div className="contact-image">
              <img src="/exsa-mia2.jpeg" alt="Mia Profile" />
            </div>
            <div className="contact-info">
              <div className="contact-details">
                <h4>mugedelamater0@gmail.com</h4>
                <h4>(850) 910-0118</h4>
              </div>
              <div className="contact-socials">
                <a href="https://www.instagram.com/mgsdl?igsh=MWdscGU1aWFjcDN3ZA==" target="_blank">
                  <img src="/instagram-logo.png" alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/share/1HYu5NL9cF/" target="_blank">
                  <img src="/facebook-logo.png" alt="Facebook" />
                </a>
              </div>
              <a href="/md.vcf" download>
                <div className="contact-download">
                  Download Contact
                  <img src="/download.png" alt="Download" />
                </div>
              </a>
            </div>
          </div>
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
