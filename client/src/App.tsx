import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import FadeInSection from "./components/FadeInSection";
import { useState, useRef, type ReactNode, useEffect } from "react";
import EventsPage from './components/EventsPage';
import EventDetails from './components/EventDetails';
import Signup from "./components/Signup";
import Login from "./components/Login";
//import { Analytics } from "@vercel/analytics/next"

interface Member {
  name: string;
  role: string;
  bio: ReactNode;
  image: string;
}

type Activity = {
  category: string;
  title: string;
  image?: string;
  shortDesc: string;
  longDesc: React.ReactNode;
}

const members: Member[] = [
  {
    name: "Müge (Mia) Delamater",
    role: "President",
    bio: (
      <>
        <p>Mia is the President and Founder of Emerald Excellence Sports Academy (EXSA), providing strategic vision, organizational leadership, and program development. She oversees governance, partnerships, sponsorships, and ensures alignment with EXSA’s charitable mission.</p>
        <p>An accomplished educator and program leader with over 15 years of experience, Mia has successfully managed teams, coordinated large-scale community events, and developed impactful athletic and educational programs. She serves as a USA Volleyball Club Director and Assistant Coach, mentoring young athletes while promoting teamwork, discipline, and confidence. Her community leadership includes organizing the First International Children’s Art Competition and the 2007–2010 Turkish Festivals in Washington, D.C., where she led children’s cultural programs for thousands of participants. Recognized as “Best Volunteer of the Year” (2009) by the American Turkish Association of Washington, DC and recipient of a Certificate of Impact from US Volleyball Academy, Mia exemplifies dedication, vision, and a commitment to empowering youth.</p>
        <p>Her community leadership includes organizing the First International Children’s Art Competition and the 2007–2010 Turkish Festivals in Washington, D.C., where she led children’s cultural programs for thousands of participants. Recognized as “Best Volunteer of the Year” (2009) by the American Turkish Association of Washington, DC and recipient of a Certificate of Impact from US Volleyball Academy, Muge exemplifies dedication, vision, and a commitment to empowering youth.</p>
      </>
    ),
    image: "/exsa-mia.jpeg",
  },
  {
    name: "Mustafa Savaş Akkaya",
    role: "Vice President",
    bio: (
      <>
        <p>Mustafa Savaş Akkaya is a high-performance Strength & Conditioning Coach specializing in elite volleyball athletes and national teams, and currently serves as Head Coach at EXSA.</p>
        <p>With extensive international experience and more than 31 professional certifications, including CFSC Level 2, Performance Enhancement Specialist, Level 1 Volleyball Coach Certification, and advanced education such as NASSAM and EXOS. He brings a multidimensional and science-driven approach to athletic development, he also holds a Master’s degree in Movement and Training Science.</p>
        <p>Savaş builds athletes who are not only stronger, but smarter, faster, and more resilient. His expertise integrates biomechanics, neuro-athletics, speed development, energy system training, corrective exercise, and sport-specific power development to elevate performance where it matters most — on the court.</p>
        <p>Throughout his career, he has worked with multiple national volleyball programs, including the Turkey Men’s National Volleyball Team and the Turkey Women’s National Volleyball Team, contributing to major international achievements such as championships in the CEV European Golden League and the Mediterranean Games.</p>
      </>
    ),
    image: "/exsa-savas.jpeg",
  },
  {
    name: "Joshua Delamater",
    role: "Secretary",
    bio: (
      <>
        <p>Josh is the recording secretary and the webmaster for EXSA. He is in charge of documenting important meetings with EXSA's executive board, maintaining the organization's bylaws and minutes, and updating the beautiful website you are currently viewing!</p>
        <p>Throughout his academics, Josh specialized primarily in web application development and has been building websites and mobile apps for almost a decade. He won the 2019 Congressional App Challenge for the FL-01 district and graduated from the University of Florida with a bachelor's in computer science (go gators!). During his undergraduate studies, he also took a focus in machine learning applications, react development, and CISE higher education.</p>
      </>
    ),
    image: "/exsa-joesh.jpeg",
  },/*
  {
    name: "Maya Delamater",
    role: "Treasurer",
    bio: (
      <>
        <p>Treasurer info will go here</p>
      </>
    ),
    image: "/member4.jpg",
  },*/
];

const activities: Activity[] = [
  {
    category: "youth",
    title: "Youth Coed Volleyball",
    image: "/exsa-vb2.jpeg",
    shortDesc: "Our clinics combine volleyball fundamentals—passing, setting, serving, hitting, and defense—with essential motor skills like footwork, balance, coordination, and body control. In a fun and supportive environment, we help every child build confidence, athletic skills, and a strong sense of community.",
    longDesc: <>
                <p>Our Youth Coed Volleyball Clinics are designed for beginners and participants with limited experience. We provide a supportive, engaging environment where young athletes build foundational volleyball skills while developing overall athletic ability and confidence.</p>
                <p>Athletes are introduced to and progress through the five essential volleyball skills:</p>
                <ul>
                  <li>Tossing</li>
                  <li>Catching</li>
                  <li>Passing</li>
                  <li>Setting</li>
                  <li>Serving</li>
                  <li>Attacking (Hitting)</li>
                  <li>Defense (Digging)</li>
                </ul>
                <p>Training also emphasizes proper footwork, movement efficiency, and correct technique through structured drills and fun, game-based learning.</p>
                <p>In addition to volleyball-specific training, our program develops well-rounded athletes through:</p>
                <ul>
                  <li>Fundamental Movement Skills</li>
                  <li>Agility, Balance, and Coordination (ABC Skills)</li>
                  <li>Speed Development</li>
                  <li>Strength and Body Control</li>
                  <li>Game Sense and Decision-Making</li>
                  <li>Neuroathletic training (hand–eye coordination and spatial awareness)</li>
                </ul>
                <p>We believe long-term athletic success begins with strong motor skill development. Our clinics promote physical literacy through a variety of drills, movement patterns, and play-based learning methods that enhance both performance and confidence.</p>
                <p>We prioritize repetition, skill exposure, and diverse learning approaches, allowing each athlete to progress at their own pace while building consistency and competence.</p>
                <p>Beyond skill development, our program fosters:</p>
                <ul>
                  <li>Teamwork and communication</li>
                  <li>Leadership and responsibility</li>
                  <li>Patience and respect for others</li>
                </ul>
                <p>Parent and volunteer involvement is a key component of our clinics, creating a positive community environment where families actively participate in the learning process and support their child’s development.</p>
                <p>We aim to prepare young athletes not only for future participation in sports but also to grow as confident, respectful, and community-minded individuals.</p>
              </>
  },
  {
    category: "seniors",
    title: "Chair Volleyball",
    image: "/exsa-chairvb.jpeg",
    shortDesc: "Our Chair Volleyball program provides an inclusive, high-quality experience, with both seated and standing play options for active individuals and those with mobility limitations. We promote movement, connection, and well-being through structured, engaging, and community-focused programming.",
    longDesc: <>
                <p>Our Chair Volleyball program is designed for adults of all activity levels, offering an inclusive and engaging way to stay physically active. While the program supports individuals with limited mobility, including those in wheelchairs or recovering from injury or surgery, it is equally welcoming to highly active participants. A standing version of the game is also available, allowing everyone to participate at a level that suits their abilities and comfort.</p>
                <p>Games are played using a 10-foot volleyball net and a 20-inch beach volleyball, with team sizes ranging from 12 to 18 participants. No prior experience is required—participants of all backgrounds and fitness levels are encouraged to join, learn, and enjoy the game together.</p>
                <p>Each session begins with a guided online mobility, stretching, and strength and conditioning class led by a certified coach. This preparation helps prevent injuries, improve flexibility, and support overall movement quality. Additional activities include balance training and cognitive (brain) exercises designed to enhance coordination and reduce the risk of falls.</p>
                <p>The program structure includes approximately 20 minutes of warm-up and conditioning, followed by one hour of organized volleyball gameplay. Beyond physical activity, the program fosters social connection, community engagement, and overall well-being.</p>
                <p>Our goal is to create a fun, welcoming environment where participants can stay active, build meaningful relationships, and enjoy a unique and adaptable form of exercise. Intergenerational participation is encouraged, with opportunities for grandparents and grandchildren to play and connect together.</p>
                <p>This program is offered free of charge. Participants may also enjoy community giveaways, including raffle prizes, gift cards, and program t-shirts.</p>
              </>
  },
  {
    category: "youth",
    title: "Dance",
    image: "/exsa-dance.JPG",
    shortDesc: "Dance Camp featuring ballet, modern, and jazz/contemporary with age-appropriate choreography by our coaches. With dynamic movements like jumps, cartwheels, and handstands, we build confidence, coordination, and creativity in a supportive environment.",
    longDesc: <>
                <p>Our Dance Camp offers a fun and engaging introduction to movement for children of all skill levels. Participants explore a variety of dance styles, including ballet, modern, and jazz/contemporary, in a supportive and encouraging environment.</p>
                <p>Each dance choreography is uniquely designed by our coaches, tailored to specific age groups to ensure appropriate skill progression and engagement. Music selections are carefully chosen to be age-appropriate and enjoyable for all participants. Choreography incorporates a variety of dynamic movements, including jumps, handstands, cartwheels, and expressive dance combinations.</p>
                <p>Through structured instruction and creative expression, students develop confidence, coordination, balance, and body awareness. Additional support and guidance are provided to ensure each participant can safely learn and practice new skills, even if they have not yet mastered them.</p>
                <p>Age-appropriate sessions ensure that each child progresses at their own pace while building skills in a positive and inclusive environment.</p>
                <p>This program is designed to inspire a love of movement while promoting physical activity, creativity, and self-expression in a community-centered setting.</p>
              </>
  },
  {
    category: "seniors",
    title: "Active Aging",
    //image: "",
    shortDesc: "Our Active Aging Programs are designed to support older adults of all ability levels in staying active, healthy, and socially connected. We offer both in-person and virtual options to ensure accessibility for individuals who are highly active, have limited mobility, or prefer to participate from home. Through structured, safe, and engaging activities, we promote mobility, strength, balance, cognitive function, and overall well-being in a supportive, community-centered environment.",
    longDesc: <>
                <p>Our Active Aging Programs are designed to support older adults of all ability levels in staying active, healthy, and socially connected. We offer both in-person and virtual options to ensure accessibility for individuals who are highly active, have limited mobility, or prefer to participate from home. Through structured, safe, and engaging activities, we promote mobility, strength, balance, cognitive function, and overall well-being in a supportive, community-centered environment.</p>
              </>
  },
  {
    category: "youth",
    title: "Gymnastics",
    image: "/exsa-gym.jpeg",
    shortDesc: "Our Gymnastics Clinics introduce fundamental skills such as balance, strength, coordination, cartwheels, and handstands through structured, station-based training. Designed for all skill levels, we provide a supportive environment where every child can learn, grow, and build confidence.",
    longDesc: <>
                <p>Our Gymnastics Clinics provide a structured and supportive environment for athletes of all skill levels. The program introduces fundamental gymnastics skills while promoting overall physical development, confidence, and coordination.</p>
                <p>Participants are guided through a variety of stations, each focused on specific skills such as balance, jumping, turns, proper body alignment, cartwheels, handstands, and core strength. This station-based approach allows athletes to progress at their own pace, engaging in activities that match their individual skill level.</p>
                <p>Each participant receives guidance and encouragement from experienced coaches and dedicated volunteers, ensuring a safe, positive, and inclusive learning experience.</p>
                <p>The clinic is open to beginners with no prior experience, as well as to participants looking to refine existing skills and learn new techniques in a fun and structured setting.</p>
              </>
  }
];

function AnimatedRoutes() {

  const location = useLocation();
  const [selected, setSelected] = useState<any>(null);

  const youthActivities = activities.filter(a => a.category === "youth");
  const seniorActivities = activities.filter(a => a.category === "seniors");

  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(null);
    }, [location.pathname]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route
      path="/"
      element={
      <Layout pageTitle ="EXSA - Home" heroText="Emerald Excellence Sports Academy">
        <main className="home-container">
          <FadeInSection>
            <section className="home-intro">
              <h1 className="header-p">Building Stronger Bodies, Confident Minds, and Connected Communities</h1>
              <h2> Inclusive programs for youth and adults of all abilities—focused on movement, skill development, and community engagement.</h2>
              <h4>Join our community and get involved by filling out our wellness surveys!</h4>
              <div className="survey-links">
                <a href="https://forms.gle/JcvDJ1uW4qU3Us9V6" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Wellness Survey for Youth and Families
                </a>
                <a href="https://forms.gle/4jVAVWzUtj7xXkPm7" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Wellness Survey for Seniors
                </a>
              </div>
            </section>
            </FadeInSection>
            <FadeInSection delay={150}>
              <h2>Upcoming Events</h2>
              <section className="events">
                <div className="event-card">
                  <h3>Youth Co-Ed Volleyball Clinic (Ages 7-12)</h3>
                  <img src="/exsa-coedvb.jpeg" alt="Co-Ed Volleyball Flyer"/>
                </div>
                <div className="event-card">
                  <h3>Live Online Fitness for Seniors</h3>
                  <img src="/exsa-srfit.jpeg" alt="Senior Flyer"/>
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
        <main className="members-container">
          <FadeInSection>
            <p className="header-p"><i><b>"Our mission is to provide inclusive, accessible, and high-quality movement-based programs that promote physical literacy, health, and lifelong well-being for individuals of all ages and abilities."</b></i></p>
            <p className="header-p"><i><b>"Through youth sports, skill development clinics, and active aging programs, we aim to build strong foundations in motor skills, confidence, and social connection. We are committed to removing barriers to participation by offering free and low-cost opportunities that serve diverse populations, including beginners, individuals with limited mobility, and underserved community members."</b></i></p>
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
                  <p>We envision a community where every individual—regardless of age, ability, or background—has the opportunity to engage in physical activity, develop essential life skills, and feel a sense of belonging.</p>
                  <p>Our goal is to create a sustainable, community-centered model that supports healthy lifestyles, encourages intergenerational participation, and fosters leadership, resilience, and personal growth.</p>
                </FadeInSection>
              </div>
            </div>
            <div className="member-info">
              <p>Through youth sports, skill development clinics, and active aging programs, we aim to build strong foundations in motor skills, confidence, and social connection. We are committed to removing barriers to participation by offering free and low-cost opportunities that serve diverse populations, including beginners, individuals with limited mobility, and underserved community members.</p>
              <p>We take a holistic, evidence-informed approach to program design that integrates:</p>
              <div className="about-list-section">
                <ul>
                  <li>Fundamental movement and motor skill development</li>
                  <li>Sport-specific skill progression</li>
                  <li>Neuroathletic and coordination training</li>
                  <li>Strength, balance, and injury prevention</li>
                  <li>Social-emotional learning and teamwork</li>
                </ul>
                <img src="/exsa-srvb.jpeg" alt="Senior Volleyball"/>
              </div>
              <p>Our programs create meaningful impact by:</p>
              <ul>
                <li>Increasing access to physical activity for underserved populations</li>
                <li>Supporting youth development through structured, skill-based learning</li>
                <li>Promoting active aging, mobility, and fall prevention for older adults</li>
                <li>Strengthening community connections through family and volunteer engagement</li>
                <li>Encouraging lifelong participation in health and wellness activities</li>
              </ul>
              <p>We are dedicated to fostering an inclusive environment where all participants feel welcomed, supported, and valued. Our programs are designed to accommodate individuals of all abilities, including those with physical limitations, those new to sport, and those seeking adaptive or modified activities.</p>
              <p>We collaborate with local businesses, volunteers, and community partners to expand our reach and sustain our programs. Through sponsorships, donations, and community engagement, we are able to continue offering accessible programming and creating lasting impact.</p>
              <p>As we grow, we aim to expand our programming, increase access to underserved communities, and deepen our impact through innovative, research-based approaches to movement, health, and community development.</p>
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
              {/* FIRST HEADER */}
              <FadeInSection>
                <h2>Youth Programs (Ages 5-14)</h2>
                <div className="activities-row">
                  {youthActivities.map((activity) => (
                    <div
                    key={activity.title}
                    className={`activity-card ${selected?.title === activity.title ? "selected" : ""}`}>
                      <h3>{activity.title}</h3>
                      {activity.image && (
                      <img src={activity.image} alt={activity.title} />
                      )}
                      <p>{activity.shortDesc}</p>
                      <span className="read-more" 
                      onClick={() => {
                        setSelected(activity);
                        setTimeout(() => {
                          detailRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                        }, 100);
                      }}
                      >
                        Read more
                      </span>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              {/* SECOND HEADER */}
              <FadeInSection>
                <h2>Senior Programs (Ages 50+)</h2>
                <div className="activities-row">
                  {seniorActivities.map((activity) => (
                    <div
                    key={activity.title}
                    className={`activity-card ${selected?.title === activity.title ? "selected" : ""}`}
                    >
                      <h3>{activity.title}</h3>
                      {activity.image && (
                        <img src={activity.image} alt={activity.title} />
                      )}
                      <p>{activity.shortDesc}</p>
                      <span className="read-more" 
                      onClick={() => {
                        setSelected(activity);
                        setTimeout(() => {
                          detailRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                      }, 100);
                    }}
                    >
                      Read more
                    </span>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              {/* DYNAMIC DETAIL DIV */}
              {selected && (
                <div className="activity-detail" ref={detailRef}>
                  <h2>{selected.title}</h2>
                  {selected.image && (
                  <img src={selected.image} alt={selected.title} />
                  )}
                  <p>{selected.longDesc}</p>
                </div>
              )}
            <FadeInSection>
              <div className="survey-links">
                <a href="https://forms.gle/JcvDJ1uW4qU3Us9V6" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Wellness Survey for Youth and Families
                </a>
                <a href="https://forms.gle/4jVAVWzUtj7xXkPm7" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Wellness Survey for Seniors
                </a>
              </div>
            </FadeInSection>
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
      <Layout pageTitle ="EXSA - Login" heroText="Log Into EXSA">
          <main>
              <Login />
          </main>
        </Layout>
        }
        />
        <Route
      path="/signup"
      element={
      <Layout pageTitle ="EXSA - Signup" heroText="Create an Account">
          <main>
              <Signup />
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
