import { inject, injectable } from "inversify";
import Usuario from "../domain/entities/Usuario";
import ICreateUsuarioModel from "../domain/models/ICreateUsuarioModel";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import ICreateUsuarioService from "../domain/services/ICreateUsuarioService";
import UsuarioRepository from "../infrastructure/data/repositories/UsuarioRepository";

@injectable()
export default class CreateUsuarioService implements ICreateUsuarioService {
    private readonly usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(UsuarioRepository)
        usuarioRepository: IUsuarioRepository
    ) {
        this.usuarioRepository = usuarioRepository;
    }

    async execute(createUsuarioModel: ICreateUsuarioModel): Promise<IUsuarioModel> {
        const usuario = new Usuario(createUsuarioModel);
        const createdUsuario: IUsuarioModel = await this.usuarioRepository.add(usuario);
        return createdUsuario;
    }

}
