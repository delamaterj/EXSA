import Button from './components/Button';
import './App.css';
import {useEffect} from 'react';

function About() {

  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <>
    <div className="layout">
    <nav>
      <p>Logo</p>
      <Button title="Home" disabled={false} url="/"/>
      <Button title="About EXSA" disabled={false} url="/About"/>
      <Button title="Our Members" disabled={false} url="/Members"/>
      </nav>
      <div className="backdrop">
        <h1>About EXSA</h1>
      </div>
      <main>
        <br/>
        <p>This is where EXSA's origins, history, and mission statement will go.</p>
        <br/>
      </main>
      <footer>
      <p>Address</p>
      <p>Email</p>
      <p>© 2025 EXSA. All rights reserved.</p>
      <Button title="Facebook" disabled={false} url="https://www.facebook.com"/>
      <Button title="Instagram" disabled={false} url="https://www.instagram.com"/>
      </footer>
      </div>
    </>
  )
}

export default About;