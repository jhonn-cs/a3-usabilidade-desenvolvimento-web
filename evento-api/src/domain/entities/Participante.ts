import ICreateParticipanteModel from "../models/ICreateParticipanteModel";

export default class Participante {
    Id: string;
    DataHoraCadastro: Date;
    Documento: string;
    Nome: string;
    DataNascimento: Date;
    Celular: string;
    IdEvento: string;
    IdUsuario: string;

    constructor(createParticipanteModel: ICreateParticipanteModel) {
        this.DataHoraCadastro = new Date();
        this.Documento = createParticipanteModel.Documento;
        this.Nome = createParticipanteModel.Nome;
        this.DataNascimento = createParticipanteModel.DataNascimento;
        this.Celular = createParticipanteModel.Celular;
        this.IdEvento = createParticipanteModel.IdEvento;
        this.IdUsuario = createParticipanteModel.IdUsuario;
    }
}