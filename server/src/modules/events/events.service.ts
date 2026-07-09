import pool from "../../config/db";

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
        throw err;
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
            e.flyer_url AS flyer,
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
        throw Error("Error retrieving event info by id");
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
            event_dates.starts_at AS date
        FROM events
        INNER JOIN event_dates
            ON events.id = event_dates.event_id
        ORDER BY event_dates.starts_at ASC`
    );

    return result.rows;
    }
    catch(err) {
        throw Error("Error retrieving events info");
    }
    finally {
        client.release();
    }
}

/*
//Gets paginated list of all published events from user's department (full info)
export async function getEventFeedService(
    userId: string,
    page: number,
    limit: number
) {

    const offset = (page - 1) * limit;

    const client = await pool.connect();

    try {

        //Get user departments
        const deptResult = await client.query(
            `SELECT department_id
                FROM users
                WHERE id = $1`,
            [userId]
        );

        const departments = deptResult.rows.map(r => r.department_id);

        if (departments.length === 0) {
            return [];
        }

        //Main feed query
        const result = await client.query(
            `SELECT

            e.id AS event_id,
            e.title,
            e.description,
            e.capacity,
            e.created_at,

            ed.id AS event_date_id,
            ed.start_time,
            ed.end_time,

            d.id AS department_id,
            d.name AS department_name,

            r.status AS rsvp_status

            FROM events e

            JOIN event_departments edp
            ON edp.event_id = e.id

            JOIN departments d
            ON d.id = edp.department_id

            JOIN event_dates ed
            ON ed.event_id = e.id

            LEFT JOIN rsvps r
            ON r.event_date_id = ed.id
            AND r.user_id = $1

            WHERE
            e.status = 'PUBLISHED'
            AND edp.department_id = ANY($2)

            ORDER BY
            ed.start_time ASC

            LIMIT $3 OFFSET $4`,
            [
                userId,
                departments,
                limit,
                offset
            ]
        );
        
        const map = new Map();

        for (const row of result.rows) {

            if (!map.has(row.event_id)) {

                map.set(row.event_id, {
                    event_id: row.event_id,
                    title: row.title,
                    description: row.description,
                    capacity: row.capacity,
                    created_at: row.created_at,

                    departments: [],
                    dates: [],
                    rsvp_status: row.rsvp_status
                });

            }

            const event = map.get(row.event_id);

            // departments dedupe
            const deptExists =
                event.departments.some(
                    (d: any) =>
                        d.id === row.department_id
            );
            if (!deptExists) {
                event.departments.push({
                    id: row.department_id,
                    name: row.department_name
                });
            }

            // dates dedupe
            const dateExists = 
                event.dates.some(
                    (d: any) =>
                        d.id === row.event_date_id
                );
            if (!dateExists) {
                event.dates.push({
                    id: row.event_date_id,
                    start_time: row.start_time,
                    end_time: row.end_time
                });
            }
        }

        return {
            page,
            limit,
            events: Array.from(map.values())
        };

    } finally {

        client.release();

    }
}*/