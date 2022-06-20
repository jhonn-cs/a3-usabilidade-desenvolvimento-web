import { PrismaClient } from "@prisma/client";
import { interfaces } from "inversify";
import IUsuarioRepository from "../../domain/repositories/IUsuarioRepository";
import ICreateUsuarioService from "../../domain/services/ICreateUsuarioService";
import PrismaClientFactory from "../../infrastructure/data/database";
import UsuarioRepository from "../../infrastructure/data/repositories/UsuarioRepository";
import CreateUsuarioService from "../../services/CreateUsuarioService";

export default function configureDependencies(container: interfaces.Container) {
    container.bind<PrismaClient>(PrismaClient)
        .toDynamicValue(PrismaClientFactory)
        .inRequestScope();

    // repositories
    container.bind<IUsuarioRepository>(UsuarioRepository).to(UsuarioRepository);

    // services
    container.bind<ICreateUsuarioService>(CreateUsuarioService).to(CreateUsuarioService);
}