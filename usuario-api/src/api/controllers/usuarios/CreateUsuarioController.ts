import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
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
        try {
            const model: CreateUsuarioModel = request.body;

            if (!model)
                return this.badRequest("Solicitação inválida.");

            const createdUsuario = await this.createUsuarioService.execute
                (
                    {
                        Email: model.email,
                        Senha: model.senha
                    }
                );

            return this.created("", { id: createdUsuario.Id, email: createdUsuario.Email } as UsuarioModel);
        } catch (error) {
            return this.internalServerError(error);
        }
    }
}