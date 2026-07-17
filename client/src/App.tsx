import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/layout/Layout';
import Events from './pages/Events';
import EventID from './pages/Event_EventID';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Members from './pages/Members';
import Activities from './pages/Activities';
import About from './pages/About';
import Profile from './pages/Profile_ProfileID';
import ContactMD from './pages/Contact_MD';
import Home from './pages/Home';

function AnimatedRoutes() {

  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
      path="/"
      element={
        <Layout pageTitle ="EXSA - Home" heroText="Emerald Xcellence Sports Academy">
          <main className="home-container">
            <Home />
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
            <Activities />
          </main>
        </Layout>
      }
      />
      <Route
      path="/events"
      element={
        <Layout pageTitle ="EXSA - Events" heroText="Upcoming and Past Events">
          <main>
            <Events />
          </main>
        </Layout>
      }
      />
      <Route
      path="/events/:eventId"
      element={
        <Layout pageTitle ="EXSA - Events Sign Up" heroText="Event Sign Up">
          <main>
            <EventID />
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
          <Members />
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
