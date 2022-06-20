import { BaseHttpController, interfaces } from "inversify-express-utils";

const ROUTE_PREFIX: string = "/eventos";

export default class BaseEventoController extends BaseHttpController implements interfaces.Controller { }

export { ROUTE_PREFIX };