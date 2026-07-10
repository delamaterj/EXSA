import NavDropDown from "./NavDropDown";
import {Link} from "react-router-dom";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user") || "null")


  return (
    <>
      <nav>
        <div className="nav-logo">
          <img src="/exsa-logo-3b.jpeg" alt="EXSA Logo" className="nav-logo" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/members">Members</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        {user ? <NavDropDown/> : <div className="nav-profile"></div>}
      </nav>
    </>
  );
}

export default Navbar;