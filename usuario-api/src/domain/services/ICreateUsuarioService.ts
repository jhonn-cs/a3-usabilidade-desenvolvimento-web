import IUsuarioModel from "../models/IUsuarioModel";

export default interface ICreateUsuarioService {
    execute(email: string, senha: string): Promise<IUsuarioModel>;
}