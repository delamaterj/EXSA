import { useState, useRef, useEffect } from "react";
import {Link} from "react-router-dom";

export default function NavDropDown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload();
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <>
        <div ref={ref} className="nav-profile">
            <img src="/profile.png" alt="profile" onClick={() => setOpen(!open)}/>
            {open && (
                <div className="nav-profile-dropdown">
                    <p>{user.name}</p>
                    <Link to={`/profile/${user.uuid}`}>
                        <p>Profile</p>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    </>
  );
}