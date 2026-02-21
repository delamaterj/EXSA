import Button from './components/Button';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import Members from './Members';
import logo from '../../public/vite.svg';
import PageTitle from './components/PageTitle';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {
          <div className="layout">
            <PageTitle title="EXSA - Home"/> 
            <nav>
              <img src={logo} alt="EXSA Logo" className="logo" />
                <div className="nav-links">
                  <Button title="Home" disabled={false} url="/"/>
                  <Button title="About EXSA" disabled={false} url="/About"/>
                  <Button title="Our Members" disabled={false} url="/Members"/>
                </div>
            </nav>
            <div className="backdrop">
              <h1>Welcome to EXSA</h1>
            </div>
            <main>
                <p>This is the home page. This is where the important content will go.</p>
            </main>
            <footer>
              <p>Address</p>
              <p>Email</p>
              <p>© 2025 EXSA. All rights reserved.</p>
              <Button title="Facebook (Coming Soon!)" disabled={true} url="https://www.facebook.com" external variant="secondary"/>
              <Button title="Instagram" disabled={false} url="https://www.instagram.com/exsa.850" external variant="secondary"/>
            </footer>
          </div>
          }/>
        <Route path="/About" element={<About/>} />
        <Route path="/Members" element={<Members/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
