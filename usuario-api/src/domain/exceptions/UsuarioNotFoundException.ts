import IExceptionError from "../../../../core/exceptions/interfaces/IExceptionError";
import Exception from "../../../../core/exceptions/Exception";

export default class UsuarioNotFoundException extends Exception {
    private static _message = "Usuário não encontrado.";

    constructor() {
        super(UsuarioNotFoundException._message);
        Object.setPrototypeOf(this, UsuarioNotFoundException.prototype);
    }

    serializeErrors(): IExceptionError[] {
        return [];
    }
}