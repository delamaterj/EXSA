import pool from "../../config/db";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";
import { validateRSVPInput, 
normalizeEmail, 
normalizePhone } from "../../utils/rsvp_validation";

//Creates RSVP with user information for event_date
export async function createRSVPService(
    eventDateId: string,
    name: string,
    email: string,
    phone: string,
    userId?: string) {

    const client = await pool.connect();

    try {

        validateRSVPInput({
        name,
        email,
        phone
        });

        await client.query( "BEGIN");

        const normalizedEmail = normalizeEmail(email);
        const normalizedPhone = normalizePhone(phone);

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
                throw new AppError(
                    "Invalid user",
                    401,
                    ErrorCode.NONEXISTENT_USER
                );
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
            throw new AppError(
                    "Event does not exist",
                    404,
                    ErrorCode.GET_EVENT_FAILED
                );
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
                name,
                normalizedEmail,
                normalizedPhone,
                eventDateId,
            ]
        );

        await client.query("COMMIT");

        return {
            rsvpId: insert.rows[0].id,
        };

    } catch (err) {
        await client.query("ROLLBACK");
        
        if(err instanceof AppError){
            throw err;
        }
                
        console.error(err);
                
        throw new AppError(
            "Could not create rsvp(s). Please try again later",
            500,
            ErrorCode.CREATE_RSVP_FAILED
        );
    } finally {
        client.release();
    }
}
