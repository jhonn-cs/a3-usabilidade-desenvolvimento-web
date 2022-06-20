import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Usuario from "../../../domain/entities/Usuario";
import IUsuarioRepository from "../../../domain/repositories/IUsuarioRepository";

@injectable()
export default class UsuarioRepository implements IUsuarioRepository {
    private readonly usuarios: Prisma.UsuarioDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(
        @inject(PrismaClient)
        private client: PrismaClient
    ) {
        this.usuarios = client.usuario;
    }

    async add(usuario: Usuario): Promise<Usuario> {
        return await this.usuarios.create({
            data: usuario
        });
    }

}