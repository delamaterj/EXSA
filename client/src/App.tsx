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

interface Activities {
  name: string;
  description: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Müge (Mia) Delamater",
    role: "President",
    bio: "Mia is the President and Founder of Emerald Excellence Sports Academy (EXSA), providing strategic vision, organizational leadership, and program development. She oversees governance, partnerships, sponsorships, and ensures alignment with EXSA’s charitable mission. An accomplished educator and program leader with over 15 years of experience, Mia has successfully managed teams, coordinated large-scale community events, and developed impactful athletic and educational programs. She serves as a USA Volleyball Club Director and Assistant Coach, mentoring young athletes while promoting teamwork, discipline, and confidence. Her community leadership includes organizing the First International Children’s Art Competition and the 2007–2010 Turkish Festivals in Washington, D.C., where she led children’s cultural programs for thousands of participants. Recognized as “Best Volunteer of the Year” (2009) by the American Turkish Association of Washington, DC and recipient of a Certificate of Impact from US Volleyball Academy, Mia exemplifies dedication, vision, and a commitment to empowering youth.",
    image: "/member1.jpg",
  },
  {
    name: "Savaş Akkaya",
    role: "Vice President",
    bio: "Vice President's bio will go here.",
    image: "/member2.jpg",
  },
  {
    name: "Joshua Delamater",
    role: "Secretary",
    bio: "Secretary's bio will go here.",
    image: "/member3.jpg",
  },
  {
    name: "Maya Delamater",
    role: "Treasurer",
    bio: "Treasurer's bio will go here.",
    image: "/member4.jpg",
  },
];

const activities: Activities[] = [
  {
    name: "Chair Volleyball",
    description: "Chair volleyball at EXSA meets every Wednesday from 4:00 - 5:00 PM in the Destin Community Center. It's designed so that players of all abilities and experiences are welcome. Regular volleyball and other related activities are also included!",
    image: "/exsa-chairvb.jpeg",
  },
  {
    name: "Activity 2",
    description: "Description of Activity 2.",
    image: "/activity2.jpg",
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
          <p className="header-p">This is the home page. This is where the important content will go.</p>
        </main>
      </Layout>
      }
      />
      <Route
      path="/About"
      element={
      <Layout pageTitle ="EXSA - About" heroText="About Us">
        <main className="members-container">
          <FadeInSection>
            <p className="header-p"><i>'EXSA's Mission Statement'</i></p>
          </FadeInSection>
              <div className="member-card normal">
                <div className="about-image">
                  <FadeInSection delay={150}>
                    <img src="/exsa-group.jpeg" alt="EXSA1" />
                  </FadeInSection>
                </div>
              <div className="member-info">
                <FadeInSection delay={300}>
                  <p>What is EXSA about</p>
                </FadeInSection>
              </div>
            </div>
          </main>
      </Layout>
      }
      />
      <Route
      path="/Members"
      element={
      <Layout pageTitle ="EXSA - Members" heroText="Our Members">
          <main className="members-container">
            <p className="header-p">Here is a list of our members</p>
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
            <main className="members-container">
              <h4 className="header-p">EXSA provides a variety of activities for all ages and members. These activities are designed to be and inclusive and engaging experience for the members of this community.</h4>
            {activities.map((activity, index) => (
              <FadeInSection key={activity.name}>
                <div
                key={activity.name}
                className={`activity-card ${
                index % 2 === 0 ? "normal" : "reverse"
                }`}
                >
                  <div className="activity-image">
                    <FadeInSection delay={150}>
                      <img src={activity.image} alt={activity.name} />
                    </FadeInSection>
                  </div>
                  <div className="activity-info">
                    <FadeInSection delay={300}>
                      <h2>{activity.name}</h2>
                      <p>{activity.description}</p>
                    </FadeInSection>
                  </div>
                </div>
              </FadeInSection>
            ))}
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
