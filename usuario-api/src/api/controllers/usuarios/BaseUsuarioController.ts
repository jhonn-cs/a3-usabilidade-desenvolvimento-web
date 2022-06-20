import { BaseHttpController, interfaces } from "inversify-express-utils";

const ROUTE_PREFIX: string = "/usuarios";

export default class BaseUsuarioController extends BaseHttpController implements interfaces.Controller { }

export { ROUTE_PREFIX };