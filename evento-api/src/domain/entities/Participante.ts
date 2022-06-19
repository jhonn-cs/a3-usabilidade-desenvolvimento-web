import ICreateParticipanteModel from "../models/ICreateParticipanteModel";

export default class Participante {
    id: string;
    dataHoraCadastro: Date;
    idEvento: string;
    idUsuario: string;

    constructor(createParticipanteModel: ICreateParticipanteModel) {
        this.dataHoraCadastro = new Date();
        this.idEvento = createParticipanteModel.idEvento;
        this.idUsuario = createParticipanteModel.idUsuario;
    }
}