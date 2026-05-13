import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import FadeInSection from "./components/FadeInSection";
import EventsPage from './components/EventsPage';
import EventDetails from './components/EventDetails';
import Signup from "./components/Signup";
import Login from "./components/Login";
import MembersPage from './components/MembersPage';
import ActivitiesPage from './components/ActivitiesPage';
import {useEffect, useState} from 'react';
import Carousel from './components/Carousel';
//import { Analytics } from "@vercel/analytics/next"

function AnimatedRoutes() {

  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  //const upcomingCarousel = upcomingEvents;
  //const pastCarousel = pastEvents.slice(0, 6); // optional limit

    useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/events`)
    .then((res) => res.json())
    .then((data) => {
      const grouped: Record<number, any> = {};

      // 1. Group events
      data.forEach((row: any) => {
        if (!grouped[row.id]) {
          grouped[row.id] = {
            id: row.id,
            title: row.title,
            location: row.location,
            description: row.description,
            flyer: row.flyer, // important for carousel
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

        const hasFuture = dates.some((d: number) => d >= now);

        if (hasFuture) {
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

      // 2. Sort upcoming (soonest first)
      upcoming.sort(
        (a, b) =>
          Math.min(...a.dates) - Math.min(...b.dates)
      );

      // 3. Sort past (most recent first)
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
                <a href="https://forms.gle/JcvDJ1uW4qU3Us9V6" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Wellness Survey for Youth and Families
                </a>
                <a href="https://forms.gle/4jVAVWzUtj7xXkPm7" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
          <div className="about-block">
            <FadeInSection>
              <p className="header-p"><i><b>"Our mission is to provide inclusive, accessible, and high-quality movement-based programs that promote physical literacy, health, and lifelong well-being for individuals of all ages and abilities."</b></i></p>
              <p className="header-p"><i><b>"Through youth sports, skill development clinics, and active aging programs, we aim to build strong foundations in motor skills, confidence, and social connection. We are committed to removing barriers to participation by offering free and low-cost opportunities that serve diverse populations, including beginners, individuals with limited mobility, and underserved community members."</b></i></p>
            </FadeInSection>
          </div>
          
          <div className="about-block two-col">
            <FadeInSection delay={150}>
              <img src="/exsa-group.jpeg" alt="EXSA" />
            </FadeInSection>
            <FadeInSection delay={300}>
              <p>Emerald Excellence Sports Academy (EXSA) is a 501(c)(3) nonprofit organization serving Destin, Florida and surrounding communities within Okaloosa County.</p>
              <p>EXSA was founded to address a critical gap in access to affordable, inclusive, and developmentally appropriate recreational programming for youth, families, seniors, and individuals with disabilities.</p>
              <p>We envision a community where every individual—regardless of age, ability, or background—has the opportunity to engage in physical activity, develop essential life skills, and feel a sense of belonging.</p>
              <p>Our goal is to create a sustainable, community-centered model that supports healthy lifestyles, encourages intergenerational participation, and fosters leadership, resilience, and personal growth.</p>
            </FadeInSection>
          </div>
          <div className="about-block two-col reverse">
            <img src="/exsa-srvb.jpeg" alt="Senior Volleyball"/>
            <p>We take a holistic, evidence-informed approach to program design that integrates:
              <ul>
                  <li>Fundamental movement and motor skill development</li>
                  <li>Sport-specific skill progression</li>
                  <li>Neuroathletic and coordination training</li>
                  <li>Strength, balance, and injury prevention</li>
                  <li>Social-emotional learning and teamwork</li>
                </ul>
            </p>
          </div>
          <div>
            <p>Our programs create meaningful impact by:
              <ul>
                <li>Increasing access to physical activity for underserved populations</li>
                <li>Supporting youth development through structured, skill-based learning</li>
                <li>Promoting active aging, mobility, and fall prevention for older adults</li>
                <li>Strengthening community connections through family and volunteer engagement</li>
                <li>Encouraging lifelong participation in health and wellness activities</li>
              </ul>
            </p>
            <p>We are dedicated to fostering an inclusive environment where all participants feel welcomed, supported, and valued. Our programs are designed to accommodate individuals of all abilities, including those with physical limitations, those new to sport, and those seeking adaptive or modified activities.</p>
            <p>We collaborate with local businesses, volunteers, and community partners to expand our reach and sustain our programs. Through sponsorships, donations, and community engagement, we are able to continue offering accessible programming and creating lasting impact.</p>
          </div>

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
      {}
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
          <EventDetails />
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
      <p className="contact-role"></p>
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
