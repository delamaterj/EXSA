import { NextFunction, Request, Response } from "express";
import { userSignupService, 
loginUserService, 
updateUserService,
deleteUserService } from "./users.service";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await userSignupService(
            req.body.name,
            req.body.email,
            req.body.phone,
            req.body.password
        );
        return res.status(201).json(user);
    } catch (err) {
         next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await loginUserService(req.body.email, req.body.password);
        return res.status(201).json(result);
    } catch (err) {
         next(err);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Authentication required"});
        }
        const result = await updateUserService(userId, req.body.credential);
        return res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({message: "Authentication required"});
        }
        const result = await deleteUserService(userId);
        return res.status(200).json(result);
    } catch(err) {
        next(err);
    }
}