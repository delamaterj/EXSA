import { Request, Response, NextFunction } from "express";
import { requestPasswordReset, resetPassword } from "./passwordReset.service";

export async function requestPasswordResetController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

        try {

            const { email } = req.body;
            const result = await requestPasswordReset(email);
        
            res.status(200).json({
                message: result.message
            });

    } catch (err) {
        next(err);
    }
}

export async function resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { token, password } = req.body;

        await resetPassword(token, password);

        res.status(200).json({
            message: "Password has been reset successfully",
        });
    } catch (err) {
        next(err);
    }
}