import pool from "../../config/db";

//Creates RSVP with user information for event_date
export async function createRSVPService(
    eventDateId: string,
    name?: string,
    email?: string,
    phone?: string,
    userId?: string) {

    const client = await pool.connect();

    try {

        await client.query( "BEGIN");

        //Identify user/guest
        if (userId) {
            const existingUser = await client.query(
                `SELECT
                id
                FROM users
                WHERE
                id=$1`,
                [userId]
            );
            if (existingUser.rowCount === 0) {
                throw new Error("User not found");
            }
        }

        //Idenfity event date
        const result = await client.query(
            `SELECT
            ed.id
            FROM event_dates ed
            JOIN events e
            ON e.id = ed.event_id
            WHERE ed.id=$1
            FOR UPDATE`,
            [eventDateId]
        );

        if (result.rowCount === 0) {
            throw new Error("Event date not found");
        }

         const insert = await client.query(
            `INSERT INTO rsvps (
                user_id,
                name,
                email,
                phone,
                event_date_id
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING id`,
            [
                userId ? userId : null,
                userId ? null : name,
                userId ? null : email,
                userId ? null : phone,
                eventDateId,
            ]
        );

        await client.query("COMMIT");

        return {
            rsvpId: insert.rows[0].id,
        };

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}
