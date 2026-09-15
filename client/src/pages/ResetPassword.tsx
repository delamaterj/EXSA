import { useState, type FormEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/passwordReset.api";
import { ApiError } from "../types/ApiError";
import {isValidPassword, passwordRules} from '../utils/password';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState("");

    const validation = {
    minLength: passwordRules.minLength(password),
    lowercase: passwordRules.lowercase(password),
    uppercase: passwordRules.uppercase(password),
    number: passwordRules.number(password),
    special: passwordRules.special(password),
    noSpaces: passwordRules.noSpaces(password),
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

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!token) {
            setError("Invalid or missing password reset link.");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Please enter a valid password");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPassword({
                token,
                password,
            });

            setMessage(response.message);

            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <article className="form-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">
                        New Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <ul>
                    {!validation.minLength && <li>At least 8 characters</li>}
                    {!validation.lowercase && <li>At least one lowercase letter</li>}
                    {!validation.uppercase && <li>At least one uppercase letter</li>}
                    {!validation.number && <li>At least one number</li>}
                    {!validation.special && <li>At least one special character</li>}
                    {!validation.noSpaces && <li>No spaces</li>}
                </ul>

                <div>
                    <label htmlFor="confirm-password">
                        Confirm New Password
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            handleConfirmPassword(e.target.value)
                        }
                        required
                    />
                    {passwordMatch && (<p className="error-text">{passwordMatch}</p>)}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>

            {message && (
                <p className="success-text">
                    {message}
                </p>
            )}

            {error && (
                <p className="error-text">
                    {error}
                </p>
            )}
            </article>
        </>
    );
}