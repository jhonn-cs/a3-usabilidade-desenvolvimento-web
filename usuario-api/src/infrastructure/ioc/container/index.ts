import { PrismaClient } from "@prisma/client";
import { Container, interfaces } from "inversify";
import IUsuarioRepository from "../../../domain/repositories/IUsuarioRepository";
import IAuthenticateUsuarioService from "../../../domain/services/IAuthenticateUsuarioService";
import ICreateUsuarioService from "../../../domain/services/ICreateUsuarioService";
import prismaClientFactory from "../../data/database"; "../../infrastructure/data/database";
import UsuarioRepository from "../../data/repositories/UsuarioRepository";
import AuthenticateUsuarioService from "../../../services/AuthenticateUsuarioService";
import CreateUsuarioService from "../../../services/CreateUsuarioService";
import { TYPES } from "../types";
import ISignInService from "../../../../../core/services/ISignInService";
import SignInService from "../../auth/SignInService";

const configureDependencies = (container: interfaces.Container) => {
    //infrastructure services
    container.bind<PrismaClient>(TYPES.PrismaClient)
        .toDynamicValue(prismaClientFactory)
        .inSingletonScope();

    container.bind<ISignInService>(TYPES.ISignInService).to(SignInService).inRequestScope();

    // repositories
    container.bind<IUsuarioRepository>(TYPES.IUsuarioRepository).to(UsuarioRepository).inRequestScope();

    // services
    container.bind<ICreateUsuarioService>(TYPES.ICreateUsuarioService).to(CreateUsuarioService).inRequestScope();
    container.bind<IAuthenticateUsuarioService>(TYPES.IAuthenticateUsuarioService).to(AuthenticateUsuarioService).inRequestScope();

}

const container = new Container();

export { configureDependencies, container }
