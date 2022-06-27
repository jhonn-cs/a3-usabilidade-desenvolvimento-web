import ICreateParticipanteModel from "../models/ICreateParticipanteModel";

export default class Participante {
    Id!: string;
    DataHoraCadastro: Date;
    Documento: string;
    Nome: string;
    DataNascimento: Date;
    Celular: string;
    IdEvento: string;
    IdUsuario: string;

    constructor(createParticipanteModel: ICreateParticipanteModel) {
        this.DataHoraCadastro = new Date();
        this.Documento = createParticipanteModel.documento;
        this.Nome = createParticipanteModel.nome;
        this.DataNascimento = createParticipanteModel.dataNascimento;
        this.Celular = createParticipanteModel.celular;
        this.IdEvento = createParticipanteModel.idEvento;
        this.IdUsuario = createParticipanteModel.idUsuario;
    }
}