import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        setError(data.error);
      }

    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <>
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <label>Email<b className="error-text"> *</b></label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password<b className="error-text"> *</b></label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <>
            <p className="error-text">{error}</p>
          </>)}
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Don't have an account? Become a Member</a>
    </div>
    
    </>

  );
}

export default Login;