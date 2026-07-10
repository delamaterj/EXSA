import type { ReactNode } from 'react';
import PageTitle from './PageTitle';
import Navbar from './Navbar';
import Footer from './Footer';

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
                <header className='backdrop'>
                    <h1>{heroText}</h1>
                </header>
            )}

            {children} 

            <Footer />
            
        </>
    ); 
}