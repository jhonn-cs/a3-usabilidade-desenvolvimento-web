import ICreateEventoModel from "../models/ICreateEventoModel";

export default class Evento {
    id: string;
    dataHoraCadastro: Date;
    nome: string;
    descricao: string;
    capacidadeMaxima: number;
    dataHoraInicio: Date;
    dataHoraFinal: Date;
    idUsuario: string;
    idLocal: string

    constructor(createEventoModel: ICreateEventoModel) {
        this.dataHoraCadastro = new Date();
        this.nome = createEventoModel.nome;
        this.descricao = createEventoModel.descricao;
        this.capacidadeMaxima = createEventoModel.capacidadeMaxima;
        this.dataHoraInicio = createEventoModel.dataHoraInicio;
        this.dataHoraFinal = createEventoModel.dataHoraFinal;
        this.idLocal = createEventoModel.idLocal;
        this.idUsuario = createEventoModel.idUsuario;
    }
}