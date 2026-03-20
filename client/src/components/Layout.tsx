import type { ReactNode } from 'react';
import Button from './Button';
import PageTitle from './PageTitle';
import FadeInSection from "./FadeInSection";
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
    return (
        <div className="layout">
            <PageTitle title={pageTitle} />
            <nav>
                <img src="/exsa-logo.jpeg" alt="EXSA Logo" className="logo" />
                <div className="nav-links">
                    <Button title="Home" url="/" variant="ghost" />
                    <Button title="About EXSA" url="/About" variant="ghost" />
                    <Button title="Activities" url="/Activities" variant="ghost" />
                    {/* <Button title="Events" url="/Events" variant="ghost" /> */}
                    <Button title="Members" url="/Members" variant="ghost" />
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