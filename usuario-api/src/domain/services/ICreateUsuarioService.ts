import ICreateUsuarioModel from "../models/ICreateUsuarioModel";
import IUsuarioModel from "../models/IUsuarioModel";

export default interface ICreateUsuarioService {
    execute(createUsuarioModel: ICreateUsuarioModel): Promise<IUsuarioModel>;
}