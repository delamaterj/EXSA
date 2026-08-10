import cron from "node-cron";

export function initializeVerificationTokenCleanup() {

    cron.schedule("* * * * *", () => {
        console.log(
            "[CRON] Verification token cleanup job executed"
        );
    });

}