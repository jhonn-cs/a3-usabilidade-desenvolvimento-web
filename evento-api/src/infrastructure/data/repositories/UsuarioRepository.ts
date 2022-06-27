import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Usuario from "../../../domain/entities/Usuario";
import IUsuarioRepository from "../../../domain/repositories/IUsuarioRepository";
import { TYPES } from "../../ioc/types";

@injectable()
export default class UsuarioRepository implements IUsuarioRepository {
    private readonly _client: PrismaClient;

    constructor(
        @inject(TYPES.PrismaClient)
        client: PrismaClient
    ) {
        this._client = client;
    }

    getById(id: string): Promise<Usuario | null> {
        return this._client.usuario.findUnique({
            where: {
                Id: id
            }
        })
    }

}