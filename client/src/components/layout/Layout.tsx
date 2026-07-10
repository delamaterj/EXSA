import type { ReactNode } from 'react';
import PageTitle from './PageTitle';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  heroText?: string;
}

export default function Layout({ children, pageTitle, heroText }: LayoutProps) {
    
    return (
        <>
            <PageTitle title={pageTitle} />

            <Navbar />

            {heroText && (
                <div className="backdrop">
                    <h1>{heroText}</h1>
                </div>
            )}
            
            {children} 
            
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