import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Evento from "../../../domain/entities/Evento";
import IUpdateEventoModel from "../../../domain/models/IUpdateEventoModel";
import IEventoRepository from "../../../domain/repositories/IEventoRepository";
import { TYPES } from "../../ioc/types";

@injectable()
export default class EventoRepository implements IEventoRepository {
    private readonly _client: PrismaClient;

    constructor(
        @inject(TYPES.PrismaClient)
        client: PrismaClient
    ) {
        this._client = client;
    }

    async add(entity: Evento): Promise<Evento> {
        const evento = await this._client.evento.create({
            data: {
                Nome: entity.Nome,
                CapacidadeMaxima: entity.CapacidadeMaxima,
                DataHoraCadastro: entity.DataHoraCadastro,
                DataHoraInicio: entity.DataHoraInicio,
                DataHoraFinal: entity.DataHoraFinal,
                Descricao: entity.Descricao,
                Endereco: {
                    create: {
                        Logradouro: entity.Endereco.Logradouro,
                        Bairro: entity.Endereco.Bairro,
                        Numero: entity.Endereco.Numero,
                        Cidade: entity.Endereco.Cidade,
                        Uf: entity.Endereco.Uf,
                        Complemento: entity.Endereco.Complemento,
                        DataHoraCadastro: entity.Endereco.DataHoraCadastro
                    }
                },
                IdUsuario: entity.IdUsuario
            }
        });

        return evento;
    }

    getById(id: string): Promise<Evento | null> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Evento[]> {
        throw new Error("Method not implemented.");
    }

    update(entity: IUpdateEventoModel): Promise<void> {
        throw new Error("Method not implemented.");
    }

}