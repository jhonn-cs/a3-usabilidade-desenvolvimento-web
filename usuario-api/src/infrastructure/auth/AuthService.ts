import { inject, injectable } from "inversify";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import IAuthUserModel from "../../../core/models/IAuthUserModel";
import ISignUserModel from "../../../core/models/ISignInUserModel";
import IAuthService from "../../../core/services/IAuthService";
import UnauthorizedException from "../../domain/exceptions/UnauthorizedException";
import IAuthenticateUsuarioService from "../../domain/services/IAuthenticateUsuarioService";
import { TYPES } from "../ioc/types";

@injectable()
export default class AuthService implements IAuthService {
    private static _secret = "4ec71863784018f7e95345ee439a7d52";

    private readonly _authenticateUsuarioService: IAuthenticateUsuarioService;

    constructor(
        @inject(TYPES.IAuthenticateUsuarioService)
        authenticateUsuarioService: IAuthenticateUsuarioService
    ) {
        this._authenticateUsuarioService = authenticateUsuarioService;
    }

    async getUser(token: string): Promise<IAuthUserModel> {
        try {
            const decoded = verify(token, AuthService._secret, {
                complete: false
            });

            if (!decoded)
                throw new Error("Falha ao obter payload da autenticação.");

            const payload = decoded as JwtPayload;
            return payload.usuario;
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException("Falha ao autenticar o usuário.");
        }
    }

    async signIn({ email, senha }: ISignUserModel): Promise<string> {
        const usuario = await this._authenticateUsuarioService.execute({ email, senha });
        if (!usuario)
            throw new UnauthorizedException("Falha na autenticaão do usuário.");

        const token = sign({ usuario }, AuthService._secret, {
            subject: usuario.email,
            expiresIn: "1h"
        });

        return token;
    }

}