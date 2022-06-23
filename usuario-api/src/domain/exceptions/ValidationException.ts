import Exception from "./Exception";
import IExceptionError from "../../../../core/exceptions/IExceptionError";
import IValidationResult from "../../../../core/validations/interfaces/IValidationResult";

export default class ValidationException extends Exception {
    private static _message = "Solicitação inválida.";

    constructor(protected validationResult: IValidationResult) {
        super(validationResult.message ?? ValidationException._message);
        Object.setPrototypeOf(this, ValidationException.prototype);
    }

    serializeErrors(): IExceptionError[] {
        return this.validationResult.validationErrors?.map((error) => {
            return { message: error.message, field: error.field };
        })
    }
}