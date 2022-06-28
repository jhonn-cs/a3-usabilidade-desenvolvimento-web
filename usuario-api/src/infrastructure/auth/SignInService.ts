import { inject, injectable } from "inversify";
import ISignUserModel from "../../../../core/models/ISignInUserModel";
import ISignInService from "../../../../core/services/ISignInService";
import UnauthorizedException from "../../../../core/exceptions/UnauthorizedException";
import IAuthenticateUsuarioService from "../../domain/services/IAuthenticateUsuarioService";
import { TYPES } from "../ioc/types";
import { AUTH_SECRET } from "../../../../core/auth/constants";
import { sign } from "jsonwebtoken";

@injectable()
export default class SignInService implements ISignInService {
    private readonly _authenticateUsuarioService: IAuthenticateUsuarioService;

    constructor(
        @inject(TYPES.IAuthenticateUsuarioService)
        authenticateUsuarioService: IAuthenticateUsuarioService
    ) {
        this._authenticateUsuarioService = authenticateUsuarioService;
    }

    async signIn({ email, password }: ISignUserModel): Promise<string> {
        const usuario = await this._authenticateUsuarioService.execute({ email, password });
        if (!usuario)
            throw new UnauthorizedException("Falha na autenticaão do usuário.");

        const token = sign({ usuario }, AUTH_SECRET, {
            subject: usuario.email,
            expiresIn: "1h"
        });

        return token;
    }

}