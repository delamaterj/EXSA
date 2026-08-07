import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "../api/client";

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const verificationStarted = useRef(false);

    const [status, setStatus] = useState<
        "loading" | "success" | "error"
    >("loading");

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token || verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        async function verifyEmail() {
            try {
                await apiClient(
                    `/api/verify-email?token=${encodeURIComponent(token!)}`,
                    { 
                        method: 'GET'
                    }
                );

                setStatus("success");
                setMessage("Your email has been successfully verified.");
            }
            catch (err) {
                console.error(err);

                setStatus("error");
                setMessage(
                    "We could not verify your email. The link may be invalid or expired."
                );
            }
        }

        verifyEmail();
    }, [token]);

    if (!token) {
        return (
            <div>
                <h1>Verification Failed</h1>
                <p>Verification token is missing.</p>
            </div>
        );
    }

    if (status === "loading") {
        return (
            <div>
                <h1>Verifying your email...</h1>
                <p>Please wait while we verify your account.</p>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div>
                <h1>Email Verified</h1>
                <p>{message}</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Verification Failed</h1>
            <p>{message}</p>
        </div>
    );
}