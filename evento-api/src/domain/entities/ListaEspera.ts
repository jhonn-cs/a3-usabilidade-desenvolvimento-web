import ICreateListaEsperaModel from "../models/ICreateListaEsperaModel";

export default class ListaEspera {
    Id: string;
    DataHoraCadastro: Date;
    IdEvento: string;
    IdUsuario: string;

    constructor(createListaEsperaModel: ICreateListaEsperaModel) {
        this.DataHoraCadastro = new Date();
        this.IdEvento = createListaEsperaModel.IdEvento;
        this.IdUsuario = createListaEsperaModel.IdUsuario;
    }
}