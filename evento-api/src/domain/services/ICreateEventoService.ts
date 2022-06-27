import ICreateEnderecoModel from "../models/ICreateEnderecoModel";
import ICreateEventoModel from "../models/ICreateEventoModel";
import IUsuarioModel from "../models/IUsuarioModel";

export default interface ICreateEventoService {
    execute(evento: ICreateEventoModel, endereco: ICreateEnderecoModel, usuario: IUsuarioModel): Promise<string>
}