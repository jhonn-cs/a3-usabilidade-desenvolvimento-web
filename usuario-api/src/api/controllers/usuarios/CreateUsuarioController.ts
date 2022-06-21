import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import ICreateUsuarioModel from "../../../domain/models/ICreateUsuarioModel";
import IUsuarioModel from "../../../domain/models/IUsuarioModel";
import ICreateUsuarioService from "../../../domain/services/ICreateUsuarioService";
import CreateUsuarioService from "../../../services/CreateUsuarioService";
import BaseUsuarioController, { ROUTE_PREFIX } from "./BaseUsuarioController"

@controller(ROUTE_PREFIX)
export class CreateUsuarioController extends BaseUsuarioController {
    private readonly createUsuarioService: ICreateUsuarioService;

    constructor(
        @inject(CreateUsuarioService)
        createUsuarioService: ICreateUsuarioService
    ) {
        super();

        this.createUsuarioService = createUsuarioService;
    }

    @httpPost("/")
    private async handle(@request() request: Request, @response() response: Response): Promise<interfaces.IHttpActionResult> {
        const model: CreateUsuarioModel = request.body;

        if (!model)
            return this.badRequest("Solicitação inválida.");

        const createdUsuario = await this.createUsuarioService.execute(model.email, model.senha);

        return this.created("", createdUsuario);
    }
}