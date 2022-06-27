import ICreateEnderecoModel from "../models/ICreateEnderecoModel";

export default class Endereco {
    Id!: string;
    DataHoraCadastro: Date;
    Logradouro: string;
    Bairro: string;
    Numero: string;
    Complemento: string;
    Cidade: string;
    Uf: string

    constructor(model: ICreateEnderecoModel) {
        this.DataHoraCadastro = new Date();
        this.Logradouro = model.logradouro;
        this.Bairro = model.bairro;
        this.Numero = model.numero;
        this.Complemento = model.complemento;
        this.Cidade = model.cidade;
        this.Uf = model.uf;
    }
}