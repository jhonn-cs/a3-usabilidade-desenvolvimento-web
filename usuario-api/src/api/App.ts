import 'reflect-metadata';
import { Container } from "inversify";
import configureDependencies from "../ioc/container";
import configureServer from './Server';

const container = new Container();

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