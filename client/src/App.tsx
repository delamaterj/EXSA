import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import FadeInSection from "./components/FadeInSection";
import type { ReactNode } from "react";

interface Member {
  name: string;
  role: string;
  bio: ReactNode;
  image: string;
}

interface Activities {
  name: string;
  description: ReactNode;
  image: string;
}

const members: Member[] = [
  {
    name: "Müge (Mia) Delamater",
    role: "President",
    bio: (
      <>
        <p>Mia is the President and Founder of Emerald Excellence Sports Academy (EXSA), providing strategic vision, organizational leadership, and program development. She oversees governance, partnerships, sponsorships, and ensures alignment with EXSA’s charitable mission.</p>
        <p>An accomplished educator and program leader with over 15 years of experience, Mia has successfully managed teams, coordinated large-scale community events, and developed impactful athletic and educational programs. She serves as a USA Volleyball Club Director and Assistant Coach, mentoring young athletes while promoting teamwork, discipline, and confidence. Her community leadership includes organizing the First International Children’s Art Competition and the 2007–2010 Turkish Festivals in Washington, D.C., where she led children’s cultural programs for thousands of participants. Recognized as “Best Volunteer of the Year” (2009) by the American Turkish Association of Washington, DC and recipient of a Certificate of Impact from US Volleyball Academy, Mia exemplifies dedication, vision, and a commitment to empowering youth.</p>
      </>
    ),
    image: "/member1.jpg",
  },
  {
    name: "Savaş Akkaya",
    role: "Vice President",
    bio: (
      <>
        <p>Vice President info will go here</p>
      </>
    ),
    image: "/member2.jpg",
  },
  {
    name: "Joshua Delamater",
    role: "Secretary",
    bio: (
      <>
        <p>Secretary info will go here</p>
      </>
    ),
    image: "/member3.jpg",
  },
  {
    name: "Maya Delamater",
    role: "Treasurer",
    bio: (
      <>
        <p>Treasurer info will go here</p>
      </>
    ),
    image: "/member4.jpg",
  },
];

const activities: Activities[] = [
  {
    name: "Youth Volleyball Clinic",
    description: (
      <>
        <p>Activity description will go here</p>
      </>
    ),
    image: "/exsa-vb2.jpeg",
  },
  {
    name: "Gymnastics & Dance Clinics",
    description: (
      <>
        <p>Activity description will go here</p>
      </>
    ),
    image: "/exsa-gym.jpeg",
  },
  {
    name: "Chair Volleyball",
    description: (
      <>
        <p>Chair volleyball at EXSA meets every Wednesday from 4:00 - 5:00 PM in the Destin Community Center. It's designed so that players of all abilities and experiences are welcome. Regular volleyball and other related activities are also included!</p>
      </>
    ),
    image: "/exsa-chairvb.jpeg",
  },
];

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route
      path="/"
      element={
      <Layout pageTitle ="EXSA - Home" heroText="Emerald Excellence Sports Academy">
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
            <p className="header-p"><i><b>"Emerald Excellence Sports Academy empowers youth and families to build strong bodies, disciplined minds, and confident character through inclusive sports, mentorship, adaptive recreation, and educational programming."</b></i></p>
          </FadeInSection>
              <div className="member-card normal">
                <div className="about-image">
                  <FadeInSection delay={150}>
                    <img src="/exsa-group.jpeg" alt="EXSA1" />
                  </FadeInSection>
                </div>
              <div className="member-info">
                <FadeInSection delay={300}>
                  <p>Emerald Excellence Sports Academy (EXSA) is a 501(c)(3) nonprofit organization serving Destin, Florida and surrounding communities within Okaloosa County.</p>
                  <p>EXSA was founded to address a critical gap in access to affordable, inclusive, and developmentally appropriate recreational programming for youth, families, seniors, and individuals with disabilities.</p>
                  <p><b>We are committed to ensuring that every participant—regardless of age, ability, income, or background—has access to affordable opportunities that promote physical wellness, leadership development, and lifelong community connection.</b></p>
                </FadeInSection>
              </div>
            </div>
            <div className="member-info">
              <p>Destin has approximately 14,000 residents, with a significant youth population and growing demographic diversity. Despite this, the city has only one public indoor gym—the Destin Community Center. A second gym, located at a Methodist Church, is primarily reserved for Niceville High School. During basketball season (4–5 months annually), access becomes even more limited. As a result:</p>
              <ul>
                <li>Elementary-age children lack beginner-level sports options.</li>
                <li>Families face cost and facility barriers.</li>
                <li>Seniors and adaptive populations have minimal structured opportunities.</li>
                <li>Most available programs are competitive, expensive, age-restricted, or not designed for beginners.</li>
              </ul>
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
