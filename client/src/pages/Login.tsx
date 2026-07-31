import {useState} from 'react';
import {Link} from 'react-router-dom';
import {loginUser} from '../api/users.api';
import {isValidEmail} from '../utils/email';
import type {LoginRequest, LoginResponse} from '../types/users';
import {saveToken, saveUser} from '../utils/storage';
import {ApiError} from '../types/ApiError';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!isValidEmail(email)) {
        setError("Please enter a valid email.");
        return;
      }

      const request: LoginRequest = {
        email,
        password,
      };

      const data : LoginResponse = await loginUser(request);

      alert("Login successful!");
        saveToken(data.token);
        saveUser(data.user);
        resetForm();
        window.location.reload();

    } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
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

          {error && (<p className="error-text">{error}</p>)}

          <button type="submit">Login</button>
        </form>

        <Link to="/signup">Don't have an account? Become a Member</Link>

      </article>
    </>
  );
}