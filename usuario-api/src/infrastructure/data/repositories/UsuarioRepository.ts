import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Usuario from "../../../domain/entities/Usuario";
import IUsuarioRepository from "../../../domain/repositories/IUsuarioRepository";
import { TYPES } from "../../ioc/types";

@injectable()
export default class UsuarioRepository implements IUsuarioRepository {
    private readonly _usuarios: Prisma.UsuarioDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(
        @inject(TYPES.PrismaClient)
        private client: PrismaClient
    ) {
        this._usuarios = client.usuario;
    }

    async findByEmail(email: string): Promise<Usuario> {
        return await this._usuarios.findUnique({
            where: {
                Email: email
            }
        })
    }

    async add(usuario: Usuario): Promise<Usuario> {
        return await this._usuarios.create({
            data: usuario
        });
    }

}