import IExceptionError from "../../core/exceptions/IExceptionError";

export default interface IErrorResponseModel {
    message: string,
    exception?: Error,
    errors: IExceptionError[]
}