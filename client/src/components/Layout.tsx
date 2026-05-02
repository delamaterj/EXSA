import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Button from './Button';
import PageTitle from './PageTitle';
import Navbar from './Navbar';
//import FadeInSection from "./FadeInSection";
//import { Analytics } from "@vercel/analytics/next"

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  heroText?: string;
}

/*  When sponsors are finalized:

<h2>Our Sponsors</h2>
                <div className="sponsor-logos">
                    <img src="/react.svg" alt="Sponsor 1" className="sponsor-logo" />
                    <img src="/vite.svg" alt="Sponsor 2" className="sponsor-logo" />
                </div>
*/

export default function Layout({ children, pageTitle, heroText }: LayoutProps) {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user") || "null")
    )   ;

    useEffect(() => {
        const handleStorageChange = () => {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="layout">
            <PageTitle title={pageTitle} />
            <nav>
                <img src="/exsa-logo-2.jpeg" alt="EXSA Logo" className="logo" />
                <div className="nav-links">
                    <Button title="Home" url="/" variant="ghost" />
                    <Button title="About EXSA" url="/about" variant="ghost" />
                    <Button title="Activities" url="/activities" variant="ghost" />
                    <Button title="Events" url="/events" variant="ghost" />
                    <Button title="Members" url="/members" variant="ghost" />
                    {!user ? (
                    <>
                        <Button title="Login/Signup" url="/login" variant="ghost" />
                    </>
                    ) : (
                        <Navbar />
                    )}  
                </div>
            </nav>
            {heroText && (
                <div className="backdrop">
                    <h1>{heroText}</h1>
                </div>
            )}
            {children} 
            
            <div className="sponsors">
            </div>
            
            <footer>
                <p>© 2025 Emerald Excellence Sports Academy (EXSA). All rights reserved.</p>
                <p>(850) 895-7735 | exsa850@gmail.com</p>
                <div className="social-links">
                    <a
                        href="https://www.facebook.com/share/1HiNHGPc6t/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <img src="/facebook-logo.png" alt="Facebook" className="social-icon" />
                    </a>
                    <a
                        href="https://www.instagram.com/exsa.850"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                    >
                        <img src="/instagram-logo.png" alt="Instagram" className="social-icon" />
                    </a>
                </div>
            </footer>
        </div>
    ); 
}