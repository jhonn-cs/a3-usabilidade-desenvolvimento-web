import IExceptionError from "../exceptions/interfaces/IExceptionError";

export default interface IErrorResponseModel {
    message: string,
    exception?: Error,
    errors: IExceptionError[]
}