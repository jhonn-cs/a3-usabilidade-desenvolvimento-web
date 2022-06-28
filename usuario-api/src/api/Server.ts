import bodyParser from "body-parser";
import cors from "cors";
import { interfaces } from "inversify";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import { errorHandler } from "./middlewares/ErrorHandler";

// Controllers
import "../api/controllers/users/AutheticateUsuarioController"
import "../api/controllers/users/CreateUsuarioController"
import "../api/controllers/users/UsuarioController"

const configureServer = (container: interfaces.Container) => {
    const server: InversifyExpressServer = new InversifyExpressServer(container, null, { rootPath: "/api" }, null, null);
    server.setConfig((app) => {
        app.use(cors());

        const allowedOrigins = ["http://localhost:3000", "*"];
        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        app.use(cors(options));

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
            const routeInfo = getRouteInfo(container);
            console.log(JSON.stringify(routeInfo));
        });
}

export { configureServer }