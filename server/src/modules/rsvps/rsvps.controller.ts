import {Request, Response} from "express";
import {createRSVPService} from "./rsvps.service";

export async function createRSVP(req: Request, res: Response) {

    try {

        const {
            eventDateIds,
            name,
            email,
            phone,
            userId
        } = req.body;


        const results = [];

        for (const eventDateId of eventDateIds) {

            const result = await createRSVPService(
                eventDateId,
                name,
                email,
                phone,
                userId
            );

            results.push(result);
        }

        return res.status(201).json({message: "RSVP successful", rsvps: results});

    }

    catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to create RSVP"});
    }
}