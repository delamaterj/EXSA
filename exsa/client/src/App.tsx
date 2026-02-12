import Button from './components/Button';
import './App.css';
import {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './About';
import Members from './Members';

function App() {

  useEffect(() => {
    document.title = "EXSA";
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {
          <div className="layout">
            <nav>
              <p>Logo</p>
              <Button title="Home" disabled={false} url="/"/>
              <Button title="About EXSA" disabled={false} url="/About"/>
              <Button title="Our Members" disabled={false} url="/Members"/>
            </nav>
            <div className="backdrop">
              <h1>Welcome to EXSA</h1>
            </div>
            <main>
              <br/>
                <p>This is the home page. This is where the important content will go.</p>
              <br/>
            </main>
            <footer>
              <p>Address</p>
              <p>Email</p>
              <p>© 2025 EXSA. All rights reserved.</p>
              <Button title="Facebook" disabled={false} url="/Facebook"/>
              <Button title="Instagram" disabled={false} url="/Instagram"/>
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
