import IExceptionError from "../../../../core/exceptions/interfaces/IExceptionError";
import Exception from "../../../../core/exceptions/Exception";

export default class CreateEventoException extends Exception {
    private static _message = "Falha ao criar o evento.";

    constructor(message?: string) {
        super(message ?? CreateEventoException._message);
        Object.setPrototypeOf(this, CreateEventoException.prototype);
    }

    serializeErrors(): IExceptionError[] {
        return [];
    }
}