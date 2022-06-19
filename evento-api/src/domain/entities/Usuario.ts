import ICreateUsuarioModel from "../models/ICreateUsuarioModel";

export default class Usuario {
    id: string;
    dataHoraCadastro: Date;
    documento: string;
    nome: string;
    email: string;
    

    constructor(createUsuarioModel: ICreateUsuarioModel) {
        
    }
}