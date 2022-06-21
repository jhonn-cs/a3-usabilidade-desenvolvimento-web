import IValidationError from "./IValidationError";

export default interface IValidationResult {
    success: boolean,
    message: string,
    validationErrors: IValidationError[]

    addError(message: string, field: string, value?: any): IValidationResult;
    addMessage(message: string): IValidationResult;
    join(validationResult: IValidationResult): IValidationResult;
}