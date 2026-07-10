import FadeInSection from '../components/FadeInSection';
import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

type Activity = {
  category: string;
  title: string;
  image?: string;
  shortDesc: string;
  longDesc: React.ReactNode;
}

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

const youthActivities = activities.filter(a => a.category === "youth");
const seniorActivities = activities.filter(a => a.category === "seniors");

export default function ActivitiesPage() {

  const [selected, setSelected] = useState<any>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [location.pathname]);

  return (
    <>
      <article>
        <FadeInSection>
          <section>
            <h2>Youth Programs (Ages 5-14)</h2>
            <div className="activities-row">
              {youthActivities.map((activity) => (
                <div key={activity.title}
                className={`activity-card ${selected?.title === activity.title ? 
                "selected" 
                : 
                ""}`}>
                <h3>{activity.title}</h3>
                {activity.image 
                && 
                (<img src={activity.image} alt={activity.title}/>)}
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
                  }}>Read more</span>
              </div>
            ))}
            </div>
          </section>
        </FadeInSection>
        
        <FadeInSection>
          <section>
            <h2>Senior Programs (Ages 50+)</h2>
            <div className="activities-row">
              {seniorActivities.map((activity) => (
                <div key={activity.title}
                className={`activity-card ${selected?.title === activity.title ? 
                "selected" 
                : 
                ""}`}>
                  <h3>{activity.title}</h3>
                  {activity.image 
                  && 
                  (<img src={activity.image} alt={activity.title} />)}
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
                    }}>Read more</span>
                </div>
              ))}
            </div>
          </section>
        </FadeInSection>
        

        {selected && (
          <section className="activity-detail" ref={detailRef}>
            <h2>{selected.title}</h2>
            {selected.image && (
              <img src={selected.image} alt={selected.title} />
            )}
            <p>{selected.longDesc}</p>
            <Link className="read-more" to="/events">Check Out Upcoming/Past Events</Link>
          </section>
        )}
        <FadeInSection>
          <section className="survey-links">
            <a href="https://forms.gle/JcvDJ1uW4qU3Us9V6" target="_blank" rel="noopener noreferrer" className="read-more">
              Wellness Survey for Youth and Families
            </a>
            <a href="https://forms.gle/4jVAVWzUtj7xXkPm7" target="_blank" rel="noopener noreferrer" className="read-more">
              Wellness Survey for Seniors
            </a>
          </section>
        </FadeInSection>
      </article>
    </>
  )
}