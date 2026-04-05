import { useState } from "react";
import UnderConstr from "./UnderConstr";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        console.log("User ID:", data.userId);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("storage"));
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <>
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
      <a href="/signup">Don't have an account? Become a Member</a>
    </div>
    
    </>

  );
}

export default Login;