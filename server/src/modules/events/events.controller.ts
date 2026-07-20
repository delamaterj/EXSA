import {Request, Response} from "express";
import {createEventService,
    getEventInfoIdService,
    getEventsInfoService} from "./events.service";

export async function createEvent(req: Request, res: Response) {

    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const result = await createEventService(req.body.title,
            req.body.location,
            req.body.dates,
            req.body.description ? req.body.description : undefined,
            req.body.flyer_url ? req.body.flyer_url : undefined);
        return res.status(201).json(result);
    }

    catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to create event. Please try again later"});
    }

}

export async function getEventInfoId(req: Request, res: Response) {

    try {
        const rawId = req.params.eventId;
        const eventId = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!eventId) {
            return res.status(400).json({message: "Missing eventId"});
        }
        const result = await getEventInfoIdService(eventId);
        return res.status(200).json(result);
    }
    catch(err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to get event info"});
    }
}

export async function getEventsInfo(req: Request, res: Response) {
    try {
        const result = await getEventsInfoService();
        return res.status(200).json(result);
    }
    catch(err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to get events"});
    }
}