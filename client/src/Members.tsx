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
        <ul>
          <li><p>img 1</p>Member 1</li>
          <li><p>img 2</p>Member 2</li>
          <li><p>img 3</p>Member 3</li>
          <li><p>img 4</p>Member 4</li>
        </ul>
        <br/>
      </main>
      <footer>
      <p>Address</p>
      <p>Email</p>
      <p>© 2025 EXSA. All rights reserved.</p>
      <Button title="Facebook" disabled={false} url="https://www.facebook.com"/>
      <Button title="Instagram" disabled={false} url="https://www.instagram.com/exsa.850"/>
      </footer>
      </div>
    </>
  )
}

export default Members;