import IExceptionError from "../../core/exceptions/IExceptionError";

export default abstract class Exception extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, Exception.prototype);
    }

    abstract serializeErrors(): IExceptionError[]
}