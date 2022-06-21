import { Request, Response, NextFunction } from "express";
import Exception from "../../domain/exceptions/Exception";
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
        return res.status(400).send(responseError);
    }

    res.status(500).send(responseError)
}