import crypto from "crypto";
import { PoolClient } from "pg";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";
import { isValidVerificationToken } from "../../utils/email_verification_validation";
import pool from "../../config/db";

export async function createEmailVerificationToken(
    userId: string,
    client: PoolClient
): Promise<string> {

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

    const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
    );

    await client.query(
    `
    INSERT INTO email_verification_tokens
    (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt]
    );

    return rawToken;

}

export async function verifyEmail(token: string) {

    const client = await pool.connect();

    try {

        if (!isValidVerificationToken(token)) {
            throw new AppError(
                "Invalid verification token",
                400,
                ErrorCode.INVALID_VERIFICATION_TOKEN
            );
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const tokenResult = await client.query(
            `SELECT id, user_id, expires_at
            FROM email_verification_tokens
            WHERE token_hash = $1`,
            [tokenHash]
        );

        const verificationToken = tokenResult.rows[0];

        if (!verificationToken) {
            throw new AppError(
                "Invalid verification token",
                404,
                ErrorCode.INVALID_VERIFICATION_TOKEN
            );
        }

        if (new Date() > verificationToken.expires_at) {
            throw new AppError(
                "Verification token has expired",
                400,
                ErrorCode.EXPIRED_VERIFICATION_TOKEN
            );
        }

        await client.query("BEGIN");

        await client.query(
            `UPDATE users
            SET email_verified = TRUE
            WHERE id = $1`,
            [verificationToken.user_id]
        );

        await client.query(
            `
            DELETE FROM email_verification_tokens
            WHERE id = $1
            `,
            [verificationToken.id]
        );

        await client.query("COMMIT");

        return {
            message: "Email verified successfully"
        };

    }
    catch(err) {

        try {
            await client.query("ROLLBACK");
        }
        catch(rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }

        if(err instanceof AppError){
            throw err;
        }

        console.error(err);

        throw new AppError(
            "Could not verify email. Please try again later",
            500,
            ErrorCode.EMAIL_VERIFICATION_FAILED
        );
    }
    finally {
        client.release();
    }
}