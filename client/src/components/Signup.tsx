import { useState } from "react";
import UnderConstr from "./UnderConstr";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://exsa-7cmm.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <>
    <div className="form-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
    <UnderConstr />
    </>
  );
}

export default Signup;