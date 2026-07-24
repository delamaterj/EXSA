import {useState} from 'react';
import {formatPhone, isValidPhone} from '../utils/phone';
import {isValidEmail} from '../utils/email';
import {signupUser} from '../api/users.api';
import type {SignupRequest, SignupResponse} from '../types/users';
import {isValidPassword, passwordRules} from '../utils/password';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");

  const validation = {
    minLength: passwordRules.minLength(password),
    lowercase: passwordRules.lowercase(password),
    uppercase: passwordRules.uppercase(password),
    number: passwordRules.number(password),
    special: passwordRules.special(password),
    noSpaces: passwordRules.noSpaces(password),
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setPasswordMatch("");
    setError("");
  };

  const handleConfirmPassword = (value: string) => {

    setConfirmPassword(value);

    if (value !== password) {
      setPasswordMatch("Invalid Match")
    }
    else {
      setPasswordMatch("");
    }

  }

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Please enter a valid password");
      return;
    }

    if(password !== confirmPassword) {
      setError("Please confirm password")
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
          <ul>
            {!validation.minLength && <li>At least 8 characters</li>}
            {!validation.lowercase && <li>At least one lowercase letter</li>}
            {!validation.uppercase && <li>At least one uppercase letter</li>}
            {!validation.number && <li>At least one number</li>}
            {!validation.special && <li>At least one special character</li>}
            {!validation.noSpaces && <li>No spaces</li>}
          </ul>

          <label>Confirm Password<b className="error-text"> *</b></label>
          <input type="password"
          value={confirmPassword}
          onChange={(e) => handleConfirmPassword(e.target.value)}
          required/>
          {passwordMatch && (<p className="error-text">{passwordMatch}</p>)}

          {error && (<p className="error-text">{error}</p>)}

          <button type="submit">Create Account</button>
          
        </form>
      </article>
    </>
  );
}