import crypto from "crypto";
import client from "../../config/db";

export async function createEmailVerificationToken(
    userId: string
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