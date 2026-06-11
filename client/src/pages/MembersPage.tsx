import {type ReactNode} from "react";
import FadeInSection from "../components/FadeInSection";

interface Member {
  name: string;
  role: string;
  bio: ReactNode;
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
  },/*
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
  },*/
];

function MembersPage() {

    return (
        <>
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
        </>
    )

}

export default MembersPage;