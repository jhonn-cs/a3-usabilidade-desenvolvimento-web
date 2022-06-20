import { typeConstraint } from "inversify";
import ICreateEnderecoModel from "../models/ICreateEnderecoModel";

export default class Endereco {
    Id: string;
    DataHoraCadastro: Date;
    Logradouro: string;
    Bairro: string;
    Numero: string;
    Complemento: string;
    Cidade: string;
    Uf: string

    constructor(createEnderecoModel: ICreateEnderecoModel) {
        this.DataHoraCadastro = new Date();
        this.Logradouro = createEnderecoModel.Logradouro;
        this.Bairro = createEnderecoModel.Bairro;
        this.Numero = createEnderecoModel.Numero;
        this.Complemento = createEnderecoModel.Complemento;
        this.Cidade = createEnderecoModel.Cidade;
        this.Uf = createEnderecoModel.Uf;
    }
}