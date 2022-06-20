import ICreateEventoModel from "../models/ICreateEventoModel";

export default class Evento {
    Id: string;
    DataHoraCadastro: Date;
    Nome: string;
    Descricao: string;
    CapacidadeMaxima: number;
    DataHoraInicio: Date;
    DataHoraFinal: Date;
    IdUsuario: string;
    IdLocal: string

    constructor(createEventoModel: ICreateEventoModel) {
        this.DataHoraCadastro = new Date();
        this.Nome = createEventoModel.Nome;
        this.Descricao = createEventoModel.Descricao;
        this.CapacidadeMaxima = createEventoModel.CapacidadeMaxima;
        this.DataHoraInicio = createEventoModel.DataHoraInicio;
        this.DataHoraFinal = createEventoModel.DataHoraFinal;
        this.IdLocal = createEventoModel.IdLocal;
        this.IdUsuario = createEventoModel.IdUsuario;
    }
}