import crypto from "crypto";
import { PoolClient } from "pg";


export async function createPasswordResetToken(
    client: PoolClient,
    userId: string
) {

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

    // Remove any existing reset token for this user.
    await client.query(
        `DELETE FROM password_reset_tokens
         WHERE user_id = $1`,
        [userId]
    );

    // Password reset tokens are valid for 30 minutes.
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