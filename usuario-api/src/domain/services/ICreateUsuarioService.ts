import ICreateUsuarioModel from "../models/ICreateUsuarioModel";
import IUsuarioModel from "../models/IUsuarioModel";

export default interface ICreateUsuarioService {
    execute(createUsuario: ICreateUsuarioModel): Promise<IUsuarioModel>;
}