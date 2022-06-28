import { Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import Evento from "../../../domain/entities/Evento";
import IUpdateEventoModel from "../../../domain/models/IUpdateEventoModel";
import IEventoRepository from "../../../domain/repositories/IEventoRepository";
import { TYPES } from "../../ioc/types";

@injectable()
export default class EventoRepository implements IEventoRepository {
    private readonly _eventos: Prisma.EventoDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(
        @inject(TYPES.PrismaClient)
        client: PrismaClient
    ) {
        this._eventos = client.evento;
    }

    async add(entity: Evento): Promise<Evento> {
        const evento = await this._eventos.create({
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

        return evento as Evento;
    }

    async getById(id: string): Promise<Evento> {
        const evento = await this._eventos.findUnique({
            where: {
                Id: id
            }
        });

        return evento as Evento;
    }

    async getAll(): Promise<Evento[]> {
        const eventos = await this._eventos.findMany();
        return eventos as Evento[];
    }

    async getAllByIdUsuario(idUsuario: string): Promise<Evento[]> {
        const eventos = await this._eventos.findMany({
            where: {
                IdUsuario: idUsuario
            }
        });

        return eventos as Evento[];
    }

    async update(entity: Evento): Promise<void> {
        await this._eventos.update({
            data: {
                Nome: entity.Nome,
                Descricao: entity.Descricao,
                CapacidadeMaxima: entity.CapacidadeMaxima,
                DataHoraInicio: entity.DataHoraInicio,
                DataHoraFinal: entity.DataHoraFinal,
                Endereco: {
                    update: {
                        Logradouro: entity.Endereco.Logradouro,
                        Numero: entity.Endereco.Numero,
                        Complemento: entity.Endereco.Complemento,
                        Bairro: entity.Endereco.Bairro,
                        Cidade: entity.Endereco.Cidade,
                        Uf: entity.Endereco.Uf
                    }
                }
            },
            where: {
                Id: entity.Id
            }
        });
    }

}