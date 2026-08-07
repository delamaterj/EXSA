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