import { BaseHttpController, interfaces } from "inversify-express-utils";

const ROUTE_PREFIX: string = "/eventos";

export default class BaseCategoryController extends BaseHttpController implements interfaces.Controller { }

export { ROUTE_PREFIX };