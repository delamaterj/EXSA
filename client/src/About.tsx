import Button from './components/Button';
import './App.css';
import logo from '../../public/vite.svg';
import PageTitle from './components/PageTitle';

function About() {

  return (
    <>
    <PageTitle title="EXSA - About"/> 
    <div className="layout">
    <nav>
      <img src={logo} alt="EXSA Logo" className="logo" />
        <div className="nav-links">
          <Button title="Home" disabled={false} url="/"/>
          <Button title="About EXSA" disabled={false} url="/About"/>
          <Button title="Our Members" disabled={false} url="/Members"/>
        </div>
      </nav>
      <div className="backdrop">
        <h1>About EXSA</h1>
      </div>
      <main>
        <p>This is where EXSA's origins, history, and mission statement will go.</p>
      </main>
      <footer>
      <p>Address</p>
      <p>Email</p>
      <p>© 2025 EXSA. All rights reserved.</p>
      <Button title="Facebook (Coming Soon!)" disabled={true} url="https://www.facebook.com" external variant="secondary"/>
      <Button title="Instagram" disabled={false} url="https://www.instagram.com/exsa.850" external variant="secondary"/>
      </footer>
      </div>
    </>
  )
}

export default About;