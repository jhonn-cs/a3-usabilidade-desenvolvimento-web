import 'reflect-metadata';
import { configureDependencies, container } from "../infrastructure/ioc/container";
import { configureServer } from './Server';

export class App {
    constructor() {
        this.configDependencies();
        this.createServer();
    }

    configDependencies() {
        configureDependencies(container);
    }

    createServer() {
        configureServer(container);
    }
}

export default new App();