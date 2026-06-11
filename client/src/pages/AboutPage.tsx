import FadeInSection from "../components/FadeInSection";

function AboutPage() {

    return (
        <>
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
        </>
    )

}

export default AboutPage;