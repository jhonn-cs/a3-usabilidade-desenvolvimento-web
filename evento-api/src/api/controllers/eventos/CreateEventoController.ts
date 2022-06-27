import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import IAuthUserModel from "../../../../../core/models/IAuthUserModel";
import ICreateEventoService from "../../../domain/services/ICreateEventoService";
import { TYPES } from "../../../infrastructure/ioc/types";
import { authHandler } from "../../middlewares/AuthHandler";
import BaseEventoController, { ROUTE_PREFIX } from "./BaseEventoController";

@controller(ROUTE_PREFIX)
export class CreateEventoController extends BaseEventoController {
    private readonly _createEventoService: ICreateEventoService;
    constructor(
        @inject(TYPES.ICreateEventoService)
        createEventoService: ICreateEventoService
    ) {
        super();

        this._createEventoService = createEventoService;
    }

    @httpPost("/", authHandler())
    private async handle(@request() request: Request, @response() response: Response): Promise<interfaces.IHttpActionResult> {
        const model: CreateEventoModel = request.body
        const usuario: IAuthUserModel = request.user;

        const createdEvento = await this._createEventoService.execute(
            {
                nome: model.nome,
                descricao: model.descricao,
                capacidadeMaxima: model.capacidadeMaxima,
                dataHoraInicio: new Date(model.dataHoraInicio),
                dataHoraFinal: new Date(model.dataHoraFinal)
            },
            {
                logradouro: model.logradouro,
                numero: model.numero,
                bairro: model.bairro,
                complemento: model.complemento,
                cidade: model.cidade,
                uf: model.uf
            },
            {
                id: usuario.id,
                email: usuario.email
            }
        );

        if (!createdEvento)
            return this.badRequest("Falha ao criar o evento.");

        return this.created("/eventos/" + createdEvento, "");
    }
}