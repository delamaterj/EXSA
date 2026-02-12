import Button from './components/Button';
import './App.css';
import {useEffect} from 'react';

function Members() {

  useEffect(() => {
    document.title = "Members";
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
        <h1>Our Members</h1>
      </div>
      <main>
        <br/>
        <p>List of executive board members will go here and their about section.</p>
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
    </>
  )
}

export default Members;