import resend from "../../config/email";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";

export async function sendVerificationEmail(
    email: string,
    token: string
) {

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your EXSA850 account",
        html: `
            <h1>Verify your email</h1>

            <p>
                Thank you for creating an EXSA850 account.
            </p>

            <p>
                Please click the link below to verify your email address:
            </p>

            <a href="${verificationUrl}">
                Verify Email
            </a>

            <p>
                This link will expire in 24 hours.
            </p>
        `
    });

    if (error) {
        throw new AppError(
                    "Could not send email.",
                    500,
                    ErrorCode.EMAIL_VERIFICATION_FAILED
                );
    }

    return data;
}

export async function sendPasswordResetEmail(
    email: string,
    rawToken: string
): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(rawToken)}`;

    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your EXSA850 password",
        html: `
            <h2>Password Reset Request</h2>

            <p>We received a request to reset your EXSA850 password.</p>

            <p>
                Click the link below to reset your password:
            </p>

            <p>
                <a href="${resetUrl}">
                    Reset Password
                </a>
            </p>

            <p>This link will expire in 30 minutes.</p>

            <p>
                If you did not request a password reset, you can safely ignore
                this email.
            </p>
        `,
    });

    if (error) {
        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
}