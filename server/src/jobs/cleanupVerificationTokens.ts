import cron from "node-cron";
import pool from "../config/db";

export function initializeVerificationTokenCleanup() {

    cron.schedule("0 0 * * *", async () => {

        const client = await pool.connect();

        try {
            const result = await client.query(
                `DELETE FROM email_verification_tokens
                WHERE expires_at < NOW()`);

            /*console.log(
                `[CRON] Deleted ${result.rowCount ?? 0} expired verification tokens`
            );*/
        }
        catch (err) {
            console.error(
                "[CRON] Failed to delete expired verification tokens:",
                err
            );
        }
        finally {
            client.release();
        }
    });
}