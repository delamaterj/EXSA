import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(err: Error | AppError, req: Request,res: Response, next: NextFunction){

    if(err instanceof AppError){

        return res.status(err.statusCode)
            .json({
                success:false,
                code:err.code,
                message:err.message
            });
    }

    console.error(err);

    return res.status(500)
        .json({
            success:false,
            code:"INTERNAL_SERVER_ERROR",
            message:"An unexpected error occured"
        });
}