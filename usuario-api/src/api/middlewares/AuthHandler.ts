import { interfaces } from "inversify";
import { Request, Response, NextFunction, response, request } from "express";
import IAuthService from "../../../core/services/IAuthService";
import { TYPES } from "../../infrastructure/ioc/types";
import UnauthorizedException from "../../domain/exceptions/UnauthorizedException";
import { container } from "../../infrastructure/ioc/container";

function authMiddlewareFactory(container: interfaces.Container) {
    return (config: { role: string }) => {
        return async (request: Request, response: Response, next: NextFunction) => {
            const authService = container.get<IAuthService>(TYPES.IAuthService);

            try {
                const authorizationHeader = request.headers.authorization;
                if (!authorizationHeader)
                    return response.status(401).json({
                        message: "Token de acesso inválido."
                    });

                const [, token] = authorizationHeader.split(" ");
                const user = await authService.getUser(token);

                return next();

            } catch (error) {
                if (error instanceof UnauthorizedException) {
                    console.error(error)
                    response.status(401).json({
                        message: error.message
                    });
                } else {
                    console.error(error);
                    response.status(500).json({
                        message: "Falha na autenticação."
                    });
                }
            }
        };
    };
}

const authHandler = authMiddlewareFactory(container);

export { authHandler }