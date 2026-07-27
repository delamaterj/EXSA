import {Request, Response} from "express";
import {healthService} from "./health.service";

export async function healthController(req: Request, res: Response) {

    try {
        const result = await healthService();
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Health Failed :("});
    }

}
