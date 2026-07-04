import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import PageTitle from './PageTitle';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  heroText?: string;
}

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
        <>
            <PageTitle title={pageTitle} />
            <nav>
                <div className="nav-logo">
                    <img src="/exsa-logo-3b.jpeg" alt="EXSA Logo" className="nav-logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/activities">Activities</a></li>
                    <li><a href="/members">Members</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
                {user ? <Navbar/> : <div className="nav-profile"></div>}
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
                <p>© 2026 Emerald Excellence Sports Academy (EXSA). All rights reserved.</p>
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
        </>
    ); 
}