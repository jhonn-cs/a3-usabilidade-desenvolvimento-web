import { inject } from "inversify";
import { controller, httpGet, interfaces, request, requestParam, response } from "inversify-express-utils";
import IGetUsuarioService from "../../../domain/services/IGetUsuarioService";
import { TYPES } from "../../../infrastructure/ioc/types";
import { authHandler } from "../../middlewares/AuthHandler";
import BaseUsuarioController, { ROUTE_PREFIX } from "./BaseUsuarioController";

@controller(ROUTE_PREFIX)
export class UsuarioController extends BaseUsuarioController {
    private readonly _getUsuarioService: IGetUsuarioService;

    constructor(
        @inject(TYPES.IGetUsuarioService)
        getUsuarioService: IGetUsuarioService
    ) {
        super();

        this._getUsuarioService = getUsuarioService;
    }

    @httpGet("/:id", authHandler())
    private async handle(@requestParam("id") id: string): Promise<interfaces.IHttpActionResult> {
        if (!id)
            return this.badRequest("Solicitação inválida.");

        const usuario = await this._getUsuarioService.findById(id as string);
        return this.json(usuario);
    }
}