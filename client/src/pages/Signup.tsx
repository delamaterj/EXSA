import {useState} from 'react';
import {formatPhone, isValidPhone} from '../utils/phone';
import {isValidEmail} from '../utils/email';
import {signupUser} from '../api/users.api';
import type {SignupRequest, SignupResponse} from '../types/users';
import {isValidPassword} from '../utils/password';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setError("");
  };

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!isValidPassword(password)) {
      setError("Please enter a valid password");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    const request: SignupRequest = {
      name,
      email,
      phone,
      password
    };

    try {
      const data : SignupResponse = await signupUser(request);
      alert("Signup successful!");
      console.log(`signup ${data.id} successful`);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error trying to sign up. Please try again later.");
    }
  };

  return (
    <>
      <article className="form-container">

        <h2>Sign Up</h2>

        <form onSubmit={handleSignup}>
          <label>Name<b className="error-text"> *</b></label>
          <input value={name}
          onChange={(e) => setName(e.target.value)}
          required/>

          <label>Email<b className="error-text"> *</b></label>
          <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>

          <label>Phone<b className="error-text"> *</b></label>
          <input type="tel"
          value={phone}
          onChange={handlePhoneChange}
          required/>

          <label>Password<b className="error-text"> *</b></label>
          <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>

          {error && (
            <>
              <p className="error-text">{error}</p>
            </>
          )}

          <button type="submit">Create Account</button>
          
        </form>
      </article>
    </>
  );
}