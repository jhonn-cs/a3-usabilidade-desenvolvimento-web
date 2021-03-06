import IExceptionError from "../../../../core/exceptions/interfaces/IExceptionError";
import Exception from "../../../../core/exceptions/Exception";

export default class UsuarioAlreadyExistsException extends Exception {
    private static _message = "Usuário já existente.";

    constructor() {
        super(UsuarioAlreadyExistsException._message);
        Object.setPrototypeOf(this, UsuarioAlreadyExistsException.prototype);
    }

    serializeErrors(): IExceptionError[] {
        return [
            {
                field: "email",
                message: "E-mail já cadastrado no sistema."
            }
        ];
    }
}