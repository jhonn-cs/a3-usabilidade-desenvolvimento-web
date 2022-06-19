import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import BaseEventoController, { ROUTE_PREFIX } from "./BaseEventoController";

@controller(ROUTE_PREFIX)
export class CreateEventoController extends BaseEventoController {
    constructor() {
        super();
    }

    @httpPost("/")
    private async handle(@request() request: Request, @response() response: Response): Promise<interfaces.IHttpActionResult> {
        try {
            const { name, description } = request.body;

            // return this.created(`/${ROUTE_PREFIX}/${category.id}`, null);

            return null;

        } catch (error) {
            return this.internalServerError(error);
        }
    }
}