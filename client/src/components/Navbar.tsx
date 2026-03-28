import { useState, useRef, useEffect } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
    window.dispatchEvent(new Event("storage"));
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null; // 🔥 safety

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Profile Icon */}
      <button onClick={() => setOpen(!open)}>
        <img src="/profile.png" alt="profile" style={{height: "30px",
        width: "auto,"}}/>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            color: "black",
          }}
        >
          <p>{user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;