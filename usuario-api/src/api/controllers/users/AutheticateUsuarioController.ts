import { Request } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request } from "inversify-express-utils";
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

    @httpPost("/signin")
    async handle(@request() request: Request): Promise<interfaces.IHttpActionResult> {
        const { email, password }: IAuthenticateUsuarioModel = request.body;

        const token = await this._signInService.signIn({ email, password });
        if (!token)
            return this.statusCode(401);

        return this.json({ accessToken: token });
    }
}