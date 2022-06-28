import { Request } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request } from "inversify-express-utils";
import ICreateUsuarioService from "../../../domain/services/ICreateUsuarioService";
import { TYPES } from "../../../infrastructure/ioc/types";
import BaseUsuarioController, { ROUTE_PREFIX } from "./BaseUsuarioController"

@controller(ROUTE_PREFIX)
export class CreateUsuarioController extends BaseUsuarioController {
    private readonly _createUsuarioService: ICreateUsuarioService;

    constructor(
        @inject(TYPES.ICreateUsuarioService)
        createUsuarioService: ICreateUsuarioService
    ) {
        super();

        this._createUsuarioService = createUsuarioService;
    }

    @httpPost("/")
    async handle(@request() request: Request): Promise<interfaces.IHttpActionResult> {
        const model: CreateUsuarioModel = request.body;
        if (!model)
            return this.badRequest("Solicitação inválida.");

        const createdUsuario = await this._createUsuarioService.execute(
            {
                email: model.email,
                senha: model.password
            });

        return this.created(ROUTE_PREFIX + createdUsuario.id, createdUsuario.id);
    }
}