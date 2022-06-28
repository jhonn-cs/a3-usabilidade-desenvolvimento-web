import IUsuarioModel from "../models/IUsuarioModel";

export default interface IGetUsuarioService {
    findById(id: string): Promise<IUsuarioModel>;
}
