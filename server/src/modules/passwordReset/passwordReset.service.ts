import crypto from "crypto";
import { PoolClient } from "pg";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";
import pool from "../../config/db";
import { sendPasswordResetEmail } from "../email/email.service";
import bcrypt from "bcrypt";
import { isValidPassword } from "../../utils/user_validation";

export async function createPasswordResetToken(
    client: PoolClient,
    userId: string
) {

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    await client.query(
        `DELETE FROM password_reset_tokens
         WHERE user_id = $1`,
        [userId]
    );

    const expiresAt = new Date(
        Date.now() + 30 * 60 * 1000
    );

    await client.query(
        `INSERT INTO password_reset_tokens
        (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)`,
        [userId, tokenHash, expiresAt]
    );

    return rawToken;
}

export async function requestPasswordReset(email: string) {

    const client = await pool.connect();

    try {

        const result = await client.query(
            `SELECT id, email
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return {
                message:
                    "If an account exists for this email, a password reset link has been sent."
            };
        }

        const user = result.rows[0];

        await client.query("BEGIN");

        const rawToken = await createPasswordResetToken(
            client,
            user.id
        );

        await client.query("COMMIT");

        await sendPasswordResetEmail(
            user.email,
            rawToken
        );

        return {
            message:
                "If an account exists for this email, a password reset link has been sent."
        };

    }
    catch (err) {

        try {
            await client.query("ROLLBACK");
        }
        catch (rollbackError) {
            console.error(rollbackError);
        }

        if (err instanceof AppError) {
            throw err;
        }

        console.error(err);

        throw new AppError(
            "Could not process password reset request. Please try again later",
            500,
            ErrorCode.PASSWORD_RESET_REQUEST_FAILED
        );
    }
    finally {
        client.release();
    }
}

export async function resetPassword(
    rawToken: string,
    newPassword: string
): Promise<void> {
    const client = await pool.connect();

    try {
        if (!isValidPassword(newPassword)) {
            throw new AppError(
                "Invalid password",
                400,
                ErrorCode.INVALID_INPUT
            );
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

        await client.query("BEGIN");

        const tokenResult = await client.query(
            `SELECT user_id, expires_at
             FROM password_reset_tokens
             WHERE token_hash = $1`,
            [tokenHash]
        );

        if (tokenResult.rowCount === 0) {
            throw new AppError(
                "Invalid or expired password reset token",
                400,
                ErrorCode.INVALID_PASSWORD_RESET_TOKEN,
            );
        }

        const { user_id, expires_at } = tokenResult.rows[0];

        if (new Date(expires_at) <= new Date()) {
            throw new AppError(
                "Invalid or expired password reset token",
                400,
                ErrorCode.INVALID_PASSWORD_RESET_TOKEN
            );
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await client.query(
            `UPDATE users
             SET password_hash = $1
             WHERE id = $2`,
            [passwordHash, user_id]
        );

        await client.query(
            `DELETE FROM password_reset_tokens
             WHERE token_hash = $1`,
            [tokenHash]
        );

        await client.query("COMMIT");
        
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

