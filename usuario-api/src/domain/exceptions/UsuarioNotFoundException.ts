import IExceptionError from "../../../core/exceptions/IExceptionError";
import Exception from "./Exception";

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