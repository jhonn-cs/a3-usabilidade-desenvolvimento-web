import { injectable } from "inversify";
import { verify, JwtPayload } from "jsonwebtoken";
import { AUTH_SECRET } from "../../../../core/auth/constants";
import UnauthorizedException from "../../../../core/exceptions/UnauthorizedException";
import IAuthService from "../../../../core/services/IAuthService";
import IAuthUserModel from "../../../../core/models/IAuthUserModel";

@injectable()
export default class AuthService implements IAuthService {
    async getUser(token: string): Promise<IAuthUserModel> {
        try {
            const decoded = verify(token, AUTH_SECRET, {
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
}