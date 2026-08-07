import { Request, Response, NextFunction } from "express";
import { verifyEmail } from "./emailVerification.service";
import { AppError } from "../../errors/AppError";
import { ErrorCode } from "../../errors/ErrorCodes";

export async function verifyEmailController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {
        const token = req.query.token;

        if (!token || typeof token !== "string") {
            throw new AppError(
                "Verification token is required",
                400,
                ErrorCode.INVALID_VERIFICATION_TOKEN
            );
        }

        const result = await verifyEmail(token);
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}