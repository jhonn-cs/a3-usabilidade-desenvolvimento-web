import ICreateUsuarioModel from "../models/ICreateUsuarioModel";

export default class Usuario {
    Id: string;
    DataHoraCadastro: Date;
    Email: string;
    Senha: string;
    

    constructor(createUsuarioModel: ICreateUsuarioModel) {
        this.DataHoraCadastro = new Date();
        this.Email = createUsuarioModel.Email;
        this.Senha = createUsuarioModel.Senha;
    }
}