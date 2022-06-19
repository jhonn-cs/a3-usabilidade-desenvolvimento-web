import ICreateListaEsperaModel from "../models/ICreateListaEsperaModel";

export default class ListaEspera {
    id: string;
    dataHoraCadastro: Date;
    idEvento: string;
    idUsuario: string;
    dataCadastro: Date;

    constructor(createListaEsperaModel: ICreateListaEsperaModel) {
        this.dataHoraCadastro = new Date();
        this.idEvento = createListaEsperaModel.idEvento;
        this.idUsuario = createListaEsperaModel.idUsuario;
    }
}