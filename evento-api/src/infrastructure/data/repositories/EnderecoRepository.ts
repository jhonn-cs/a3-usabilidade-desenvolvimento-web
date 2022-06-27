import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Endereco from "../../../domain/entities/Endereco";
import ICreateEnderecoModel from "../../../domain/models/ICreateEnderecoModel";
import IUpdateEnderecoModel from "../../../domain/models/IUpdateEnderecoModel";
import IEnderecoRepository from "../../../domain/repositories/IEnderecoRepository";
import { TYPES } from "../../ioc/types";

@injectable()
export default class EnderecoRepository implements IEnderecoRepository {
    private readonly _client: PrismaClient;
    private readonly _set: Prisma.EnderecoDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(
        @inject(TYPES.PrismaClient)
        client: PrismaClient
    ) {
        this._client = client;
        this._set = client.endereco;
    }

    add(model: ICreateEnderecoModel): Promise<Endereco> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Endereco> {
        throw new Error("Method not implemented.");
    }
    update(model: IUpdateEnderecoModel): Promise<void> {
        throw new Error("Method not implemented.");
    }

}