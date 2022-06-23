import bodyParser from "body-parser";
import { interfaces } from "inversify";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./middlewares/ErrorHandler";

// Controllers
import "./controllers/usuarios/AutheticateUsuarioController"
import "./controllers/usuarios/CreateUsuarioController"

export const configureServer = (container: interfaces.Container) => {
    const server: InversifyExpressServer = new InversifyExpressServer(container, null, { rootPath: "/api" }, null, null);
    server.setConfig((app) => {
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.use(bodyParser.json());
    });

    server.setErrorConfig((app) => {
        app.use(errorHandler);
    });

    const port = 5501;

    server
        .build()
        .listen(port, () => {
            console.log(`Server is running on port: ${port}`);
            if (process.env.NODE_ENV === 'development') {
                const routeInfo = getRouteInfo(container);
                console.log(JSON.stringify(routeInfo));
            }
        });
}