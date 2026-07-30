import {Request, Response} from "express";
import {createRSVPService} from "./rsvps.service";

export async function createRSVP(req: Request, res: Response) {

    try {

        const {
            event_date_ids,
            name,
            email,
            phone,
            user_id
        } = req.body;


        const results = [];

        for (const eventDateId of event_date_ids) {

            const result = await createRSVPService(
                eventDateId,
                name,
                email,
                phone,
                user_id
            );

            results.push(result);
        }

        return res.status(201).json({message: "RSVP successful", rsvps: results});

    }

    catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to create RSVP"});
    }
}