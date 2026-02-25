import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import FadeInSection from "./components/FadeInSection";

interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const members: Member[] = [
  {
    name: "President",
    role: "President",
    bio: "President's bio will go here.",
    image: "/member1.jpg",
  },
  {
    name: "Vice President",
    role: "Vice President",
    bio: "Vice President's bio will go here.",
    image: "/member2.jpg",
  },
  {
    name: "Secretary",
    role: "Secretary",
    bio: "Secretary's bio will go here.",
    image: "/member3.jpg",
  },
  {
    name: "Treasurer",
    role: "Treasurer",
    bio: "Treasurer's bio will go here.",
    image: "/member4.jpg",
  },
];

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route
      path="/"
      element={
      <Layout pageTitle ="EXSA - Home" heroText="EXSA 850">
        <main>
          <p>This is the home page. This is where the important content will go.</p>
        </main>
      </Layout>
      }
      />
      <Route
      path="/About"
      element={
      <Layout pageTitle ="EXSA - About" heroText="About Us">
        <main>
          <p>About page content goes here.</p>
        </main>
      </Layout>
      }
      />
      <Route
      path="/Members"
      element={
      <Layout pageTitle ="EXSA - Members" heroText="Our Members">
          <main className="members-container">
            {members.map((member, index) => (
              <FadeInSection key={member.name}>
                <div
                key={member.name}
                className={`member-card ${
                index % 2 === 0 ? "normal" : "reverse"
                }`}
                >
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h2>{member.name}</h2>
                    <h3>{member.role}</h3>
                    <p>{member.bio}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </main>
        </Layout>
        }
        />
        <Route
        path="/Activities"
        element={
          <Layout pageTitle ="EXSA - Activities" heroText="Our Activities">
            <main>
              <p>This is the activities page. This is where the activities peformed at exsa will be listed</p>
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
