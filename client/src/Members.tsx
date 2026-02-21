import Button from './components/Button';
import './App.css';
import logo from '../../public/vite.svg';
import PageTitle from './components/PageTitle';

function Members() {

  return (
    <>
    <PageTitle title="EXSA - Members"/> 
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
        <h1>Our Members</h1>
      </div>
      <main>
        <p>List of executive board members will go here and their about section.</p>
        <ul>
          <li><p>img 1</p>Member 1</li>
          <li><p>img 2</p>Member 2</li>
          <li><p>img 3</p>Member 3</li>
          <li><p>img 4</p>Member 4</li>
        </ul>
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

export default Members;