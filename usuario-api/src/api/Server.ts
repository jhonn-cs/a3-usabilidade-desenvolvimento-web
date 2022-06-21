import bodyParser from "body-parser";
import { interfaces } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import "./controllers/usuarios/CreateUsuarioController"
import { errorHandler } from "./middlewares/ErrorHandler";

export const configureServer = (container: interfaces.Container) => {
    const server: InversifyExpressServer = new InversifyExpressServer(container, null, { rootPath: "/api" });
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
        .listen(port, () => console.log(`Server is running on port: ${port}`));
}