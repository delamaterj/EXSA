import {useState} from 'react';
import {Link} from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        console.log("User ID:", data.id);
        localStorage.setItem("token", data.token);
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
      <article className="form-container">
        
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email<b className="error-text"> *</b></label>
          <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>

          <label>Password<b className="error-text"> *</b></label>
          <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>

          {error && (
            <>
              <label className="error-text">{error}</label>
            </>
          )}

          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Don't have an account? Become a Member</Link>

      </article>
    </>
  );
}