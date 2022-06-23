import { compare } from "bcrypt";
import { inject, injectable } from "inversify";
import UnauthorizedException from "../domain/exceptions/UnauthorizedException";
import UsuarioNotFoundException from "../domain/exceptions/UsuarioNotFoundException";
import IAuthenticateUsuarioModel from "../domain/models/IAuthenticateUsuarioModel";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import IAuthenticateUsuarioService from "../domain/services/IAuthenticateUsuarioService";
import { TYPES } from "../infrastructure/ioc/types";

@injectable()
export default class AuthenticateUsuarioService implements IAuthenticateUsuarioService {
    private readonly _usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(TYPES.IUsuarioRepository)
        usuarioRepository: IUsuarioRepository
    ) {
        this._usuarioRepository = usuarioRepository;
    }

    async execute({ email, senha }: IAuthenticateUsuarioModel): Promise<IUsuarioModel> {
        if (!email)
            throw new UnauthorizedException("Falha na autenticação. E-mail ou senha inválido.");

        const usuario = await this._usuarioRepository.findByEmail(email);
        if (!usuario)
            throw new UsuarioNotFoundException();

        const passwordMatch = await compare(senha, usuario.Senha);
        if (!passwordMatch)
            throw new UnauthorizedException("Falha na autenticação. E-mail ou senha inválido.");

        return {
            id: usuario.Id,
            email: usuario.Email
        } as IUsuarioModel;
    }

}