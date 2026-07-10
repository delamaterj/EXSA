import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");

    let formatted = input;

    if (input.length > 3 && input.length <= 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 6) {
      formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }

    setPhone(formatted);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number.");
    return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setError("Error trying to sign up. Please try again later.");
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

export default Signup;