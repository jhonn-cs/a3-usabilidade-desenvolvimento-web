import IAuthUserModel from "../models/IAuthUserModel";
import ISignUserModel from "../models/ISignInUserModel";

export default interface IAuthService {
    getUser(token: string): Promise<IAuthUserModel>;
    signIn(signInUser: ISignUserModel): Promise<string>
}