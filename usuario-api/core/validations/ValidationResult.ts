import IValidationError from "./interfaces/IValidationError";
import IValidationResult from "./interfaces/IValidationResult";

export default class ValidationResult implements IValidationResult {
    success: boolean;
    message: string;
    validationErrors: IValidationError[];

    private constructor(success: boolean, message: string, validationErrors: IValidationError[]) {
        this.success = success;
        this.message = message;
        this.validationErrors = validationErrors;
    }

    static success(): IValidationResult {
        return new ValidationResult(true, null, []);
    }

    static failure(message: string, validationErrors: IValidationError[]): IValidationResult {
        return new ValidationResult(false, message, validationErrors ?? [])
    }

    addError(message: string, field: string, value?: any): IValidationResult {
        this.success = false;
        this.validationErrors.push({ message, field, value });

        return this;
    }

    addMessage(message: string): IValidationResult {
        this.message = message;
        return this;
    }

    join(validationResult: IValidationResult): IValidationResult {
        this.success = this.success && validationResult.success;
        this.message += validationResult.message;
        this.validationErrors.concat(validationResult.validationErrors);

        return this;
    }
}