import IAuthUserModel from "../models/IAuthUserModel";

export default interface IAuthService {
    getUser(token: string): Promise<IAuthUserModel>;
}