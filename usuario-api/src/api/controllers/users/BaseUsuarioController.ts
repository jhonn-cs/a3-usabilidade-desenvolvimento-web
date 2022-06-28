import { BaseHttpController, interfaces } from "inversify-express-utils";

const ROUTE_PREFIX: string = "/users";

export default abstract class BaseUsuarioController extends BaseHttpController implements interfaces.Controller { }

export { ROUTE_PREFIX };