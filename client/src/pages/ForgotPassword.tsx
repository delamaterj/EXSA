import { useState, type FormEvent } from "react";
import { requestPasswordReset } from "../api/passwordReset.api";
import { ApiError } from "../types/ApiError";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await requestPasswordReset({ email });

            setMessage(response.message);
            setEmail("");
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
            <p>
                Enter your email address and we'll send you a password reset
                link if an account exists.
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>

            {message && (
                <p>
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