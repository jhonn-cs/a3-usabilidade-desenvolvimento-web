import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import ISignInService from "../../../../../core/services/ISignInService";
import IAuthenticateUsuarioModel from "../../../domain/models/IAuthenticateUsuarioModel";
import { TYPES } from "../../../infrastructure/ioc/types";
import BaseUsuarioController, { ROUTE_PREFIX } from "./BaseUsuarioController"

@controller(ROUTE_PREFIX)
export class AutheticateUsuarioController extends BaseUsuarioController {
    private readonly _signInService: ISignInService;

    constructor(
        @inject(TYPES.ISignInService)
        signInService: ISignInService
    ) {
        super();

        this._signInService = signInService;
    }

    @httpPost("/login")
    async handle(@request() request: Request, @response() response: Response): Promise<interfaces.IHttpActionResult> {
        const { email, senha }: IAuthenticateUsuarioModel = request.body;

        const token = await this._signInService.signIn({ email, senha });
        if (!token)
            return this.statusCode(401);

        return this.json({ token });
    }
}