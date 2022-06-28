import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, interfaces, request } from "inversify-express-utils";
import IGetEventoService from "../../../domain/services/IGetEventoService";
import { TYPES } from "../../../infrastructure/ioc/types";
import { authHandler } from "../../middlewares/AuthHandler";
import BaseEventoController, { ROUTE_PREFIX } from "./BaseEventoController";

@controller(ROUTE_PREFIX, authHandler())
export class ListEventoController extends BaseEventoController {
    private readonly _getEventoService: IGetEventoService;

    constructor(
        @inject(TYPES.IGetEventoService)
        getEventoService: IGetEventoService
    ) {
        super();

        this._getEventoService = getEventoService;
    }

    @httpGet("/")
    private async handle(@request() request: Request): Promise<interfaces.IHttpActionResult> {
        const { user } = request;

        const eventos = await this._getEventoService.getAll(user.id);
        return this.json(eventos);
    }
}