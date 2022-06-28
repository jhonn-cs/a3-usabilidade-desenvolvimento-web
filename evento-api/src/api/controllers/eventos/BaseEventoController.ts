import { BaseHttpController, interfaces } from "inversify-express-utils";

const ROUTE_PREFIX: string = "/events";

export default class BaseEventoController extends BaseHttpController implements interfaces.Controller { }

export { ROUTE_PREFIX };