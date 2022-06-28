import { inject, injectable } from "inversify";
import UsuarioNotFoundException from "../domain/exceptions/UsuarioNotFoundException";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import IGetUsuarioService from "../domain/services/IGetUsuarioService";
import { TYPES } from "../infrastructure/ioc/types";

@injectable()
export default class GetUsuarioService implements IGetUsuarioService {
    private readonly _usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(TYPES.IUsuarioRepository)
        usuarioRepository: IUsuarioRepository
    ) {
        this._usuarioRepository = usuarioRepository;
    }

    async findById(id: string): Promise<IUsuarioModel> {
        if (!id)
            throw new UsuarioNotFoundException("ID do usuário inválido.");

        const usuario = await this._usuarioRepository.getById(id);
        if (!usuario)
            return null;

        return {
            id: usuario.Id,
            email: usuario.Email
        } as IUsuarioModel
    }
}