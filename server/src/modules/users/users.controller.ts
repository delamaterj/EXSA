import { Request, Response } from "express";
import { userSignupService, 
loginUserService, 
updateUserService,
deleteUserService } from "./users.service";

export async function register(req: Request, res: Response) {
    try {
        const user = await userSignupService(
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.password
        );
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: err instanceof Error ? err.message : "Could not sign up user. Please try again later"});
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await loginUserService(req.body.email, req.body.password);
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Could not login user. Please try again later"});
    }
}

export async function update(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Authentication required"});
        }
        const result = await updateUserService(userId, req.body.credential);
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Could not update credentials. Please try again later"});
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Authentication required"});
        }
        const result = await deleteUserService(userId);
        return res.status(200).json(result);
    } catch(err) {
        return res.status(500).json({message: err instanceof Error ? err.message : "Could not delete account. Please try again later"});
    }
}