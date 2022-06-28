import { PrismaClient } from "@prisma/client";
import { Container, interfaces } from "inversify";
import IAuthService from "../../../../../core/services/IAuthService";
import IEventoRepository from "../../../domain/repositories/IEventoRepository";
import { prismaClientFactory } from "../../data/database";
import EventoRepository from "../../data/repositories/EventoRepository";
import { TYPES } from "../types";
import CreateEventoService from "../../../services/CreateEventoService";
import ICreateEventoService from "../../../domain/services/ICreateEventoService";
import AuthService from "../../auth/AuthService";
import UsuarioRepository from "../../data/repositories/UsuarioRepository";
import IUsuarioRepository from "../../../domain/repositories/IUsuarioRepository";
import GetEventoService from "../../../services/GetEventoService";
import IGetEventoService from "../../../domain/services/IGetEventoService";

function configureDependencies(container: interfaces.Container) {
    //infrastructure services
    container.bind<PrismaClient>(TYPES.PrismaClient)
        .toDynamicValue(prismaClientFactory)
        .inSingletonScope();

    container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inRequestScope();

    // repositories
    container.bind<IEventoRepository>(TYPES.IEventoRepository).to(EventoRepository).inRequestScope();
    container.bind<IUsuarioRepository>(TYPES.IUsuarioRepository).to(UsuarioRepository).inRequestScope();

    // services
    container.bind<ICreateEventoService>(TYPES.ICreateEventoService).to(CreateEventoService).inRequestScope();
    container.bind<IGetEventoService>(TYPES.IGetEventoService).to(GetEventoService).inRequestScope();
}

const container = new Container();

export { configureDependencies, container }