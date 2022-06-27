import { Request, Response, NextFunction } from "express";
import Exception from "../../../../core/exceptions/Exception";
import UnauthorizedException from "../../../../core/exceptions/UnauthorizedException";
import IErrorResponseModel from "../../../../core/models/IErrorResponseModel";

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