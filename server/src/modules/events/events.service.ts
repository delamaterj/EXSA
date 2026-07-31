import pool from "../../config/db";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";

//Create new event + event dates
export async function createEventService(title: string,
location: string,
dates: string[],
description?: string,
flyer_url?: string,
) {

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        //Create event
        const eventResult = await client.query(
            `INSERT INTO events (
                    title,
                    location,
                    description,
                    flyer_url
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4
                )
                RETURNING id`,
            [
                title,
                location,
                description || null,
                flyer_url || null
            ]
        );

        const eventId = eventResult.rows[0].id;

        //Insert event_dates
        for (const date of dates
        ) {
            await client.query(
                `INSERT INTO event_dates (
                    event_id,
                    starts_at
                )
                VALUES (
                    $1,
                    $2
                )`,
                [
                    eventId,
                    date
                ]
            );

        }

        await client.query("COMMIT");

        return { eventId };
    }

    catch (err) {

        await client.query("ROLLBACK");

        if(err instanceof AppError){
            throw err;
        }
                
        console.error(err);
                
        throw new AppError(
            "Could not signup user. Please try again later",
            500,
            ErrorCode.CREATE_EVENT_FAILED
        );
    } 

    finally {
        client.release();
    }
}

//Get singular event info by id (rsvp)
export async function getEventInfoIdService(eventId: string) {

    const client = await pool.connect();

    try {
        const result = await pool.query(
        `
        SELECT
            e.id AS event_id,
            e.title,
            e.location,
            e.description,
            e.flyer_url,
            d.id AS date_id,
            d.starts_at AS date
        FROM events e
        INNER JOIN event_dates d
            ON e.id = d.event_id
        WHERE e.id = $1
        ORDER BY d.starts_at ASC
        `,
        [eventId]
    );

    return result.rows;

    } catch(err) {
        
        await client.query("ROLLBACK");

        if(err instanceof AppError){
            throw err;
        }
                
        console.error(err);
                
        throw new AppError(
            "Could not get event. Please try again later",
            500,
            ErrorCode.GET_EVENT_FAILED
        );
    }
    finally {
        client.release();
    }
}

//Get all event info (calendar)
export async function getEventsInfoService() {

    const client = await pool.connect();

    try {
        const result = await pool.query(
        `SELECT
            events.id,
            events.title,
            events.location,
            events.description,
            events.flyer_url,
            event_dates.id AS date_id,
            event_dates.starts_at AS date
        FROM events
        INNER JOIN event_dates
            ON events.id = event_dates.event_id
        ORDER BY event_dates.starts_at ASC`
    );

    return result.rows;
    }
    catch(err) {
        
        if(err instanceof AppError){
            throw err;
        }
                
        console.error(err);
                
        throw new AppError(
            "Could not get events. Please try again later",
            500,
            ErrorCode.GET_EVENTS_FAILED
        );
    }
    finally {
        client.release();
    }
}