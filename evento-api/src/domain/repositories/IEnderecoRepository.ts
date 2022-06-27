import Endereco from "../entities/Endereco";
import ICreateEnderecoModel from "../models/ICreateEnderecoModel";
import IUpdateEnderecoModel from "../models/IUpdateEnderecoModel";

export default interface IEnderecoRepository {
    add(model: ICreateEnderecoModel): Promise<Endereco>;
    getById(id: string): Promise<Endereco>;
    update(model: IUpdateEnderecoModel): Promise<void>
}