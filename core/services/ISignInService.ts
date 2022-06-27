import ISignUserModel from "../models/ISignInUserModel";

export default interface ISignInService {
    signIn(signInUser: ISignUserModel): Promise<string>
}