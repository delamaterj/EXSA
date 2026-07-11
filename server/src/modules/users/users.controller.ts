import { Request, Response } from "express";
import { userSignupService, loginUserService } from "./users.service";

export async function register(req: Request, res: Response) {
    try {
        const user = await userSignupService(
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.password
        );
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err instanceof Error ? err.message : "Could not sign up user. Try again later"});
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await loginUserService(req.body.email, req.body.password);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err instanceof Error ? err.message : "Could not login user. Try again later"});
    }
}