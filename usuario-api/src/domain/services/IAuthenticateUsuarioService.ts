import IAuthenticateUsuarioModel from "../models/IAuthenticateUsuarioModel";
import IUsuarioModel from "../models/IUsuarioModel";

export default interface IAuthenticateUsuarioService {
    execute(authenticate: IAuthenticateUsuarioModel): Promise<IUsuarioModel>
}