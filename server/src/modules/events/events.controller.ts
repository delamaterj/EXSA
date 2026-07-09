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
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to create event"});
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

/*
export async function getEventFeed(req: Request, res: Response) {

    try {
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        const DEFAULT_LIMIT = 25;
        const MAX_LIMIT = 100;

        page = Number.isInteger(page) && page > 0 ? page : 1;
        limit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, MAX_LIMIT) : DEFAULT_LIMIT;

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const result = await getEventFeedService(userId, page, limit);
        return res.status(200).json(result);
    }

    catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Failed to get event feed"});
    }
}
*/