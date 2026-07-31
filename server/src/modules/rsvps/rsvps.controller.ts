import {Request, Response, NextFunction} from "express";
import {createRSVPService} from "./rsvps.service";

export async function createRSVP(req: Request, res: Response, next: NextFunction) {

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
        next(err);
    }
}