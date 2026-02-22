import type { ReactNode } from 'react';
import Button from './Button';
import PageTitle from './PageTitle';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  heroText?: string;
}

export default function Layout({ children, pageTitle, heroText }: LayoutProps) {
    return (
        <div className="layout">
            <PageTitle title={pageTitle} />
            <nav>
                <img src="" alt="EXSA Logo" className="logo" />
                <div className="nav-links">
                    <Button title="Home" url="/" variant="ghost" />
                    <Button title="About EXSA" url="/About" variant="ghost" />
                    <Button title="Members" url="/Members" variant="ghost" />
                    <Button title="Activities" url="/Activities" variant="ghost" />
                </div>
            </nav>
            {heroText && (
                <div className="backdrop">
                    <h1>{heroText}</h1>
                </div>
            )}
            {children} {/* This is where each page’s <main> content will go */}
            <div className="sponsors">
                <h2>Our Platforms</h2>
                <div className="sponsor-logos">
                    <img src="/react.svg" alt="Sponsor 1" className="sponsor-logo" />
                    <img src="/vite.svg" alt="Sponsor 2" className="sponsor-logo" />
                </div>
            </div>
            <footer>
                <p></p>
                <p>exsa850@gmail.com</p>
                <p>© 2025 EXSA850. All rights reserved.</p>
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