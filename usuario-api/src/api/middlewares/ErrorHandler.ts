import { Request, Response, NextFunction } from "express";
import Exception from "../../domain/exceptions/Exception";
import UnauthorizedException from "../../domain/exceptions/UnauthorizedException";
import IErrorResponseModel from "../models/IErrorResponseModel";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const responseError = { message: err.message, exception: err.cause } as IErrorResponseModel;
    if (err instanceof Exception) {
        responseError.errors = err.serializeErrors();
        return res.status(400).json(responseError);
    }

    if (err instanceof UnauthorizedException) {
        return res.status(401).json(responseError);
    }

    res.status(500).json(responseError)
}