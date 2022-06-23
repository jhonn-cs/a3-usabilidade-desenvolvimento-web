import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import IAuthService from "../../../../core/services/IAuthService";
import IAuthenticateUsuarioModel from "../../../domain/models/IAuthenticateUsuarioModel";
import { TYPES } from "../../../infrastructure/ioc/types";
import BaseUsuarioController, { ROUTE_PREFIX } from "./BaseUsuarioController"

@controller(ROUTE_PREFIX)
export class AutheticateUsuarioController extends BaseUsuarioController {
    private readonly _authService: IAuthService;

    constructor(
        @inject(TYPES.IAuthService)
        authService: IAuthService
    ) {
        super();

        this._authService = authService;
    }

    @httpPost("/login")
    async handle(@request() request: Request, @response() response: Response): Promise<interfaces.IHttpActionResult> {
        const { email, senha }: IAuthenticateUsuarioModel = request.body;

        const token = await this._authService.signIn({ email, senha });
        if (!token)
            return this.statusCode(401);

        return this.json({ token });
    }
}