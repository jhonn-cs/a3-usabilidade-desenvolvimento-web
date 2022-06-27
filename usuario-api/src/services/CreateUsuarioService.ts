import { hash } from "bcrypt";
import { inject, injectable } from "inversify";
import IValidationResult from "../../../core/validations/interfaces/IValidationResult";
import ValidationResult from "../../../core/validations/ValidationResult";
import Usuario from "../domain/entities/Usuario";
import UsuarioAlreadyExistsException from "../domain/exceptions/UsuarioAlreadyExistsException";
import ValidationException from "../../../core/exceptions/ValidationException";
import ICreateUsuarioModel from "../domain/models/ICreateUsuarioModel";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import ICreateUsuarioService from "../domain/services/ICreateUsuarioService";
import { TYPES } from "../infrastructure/ioc/types";

@injectable()
export default class CreateUsuarioService implements ICreateUsuarioService {
    private readonly _usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(TYPES.IUsuarioRepository)
        usuarioRepository: IUsuarioRepository
    ) {
        this._usuarioRepository = usuarioRepository;
    }

    async execute({ email, senha }: ICreateUsuarioModel): Promise<IUsuarioModel> {
        const validationResult = this.validate({ email, senha });
        if (!validationResult.success)
            throw new ValidationException(validationResult);

        const usuarioAlreadyExists = await this._usuarioRepository.findByEmail(email);
        if (usuarioAlreadyExists)
            throw new UsuarioAlreadyExistsException();

        const hashSenha = await hash(senha, 10);

        let usuario = new Usuario({ email: email, senha: hashSenha });
        usuario = await this._usuarioRepository.add(usuario);
        return {
            id: usuario.Id,
            email: usuario.Email,
        } as IUsuarioModel;
    }

    private validate({ email, senha }: ICreateUsuarioModel): IValidationResult {
        const validationResult: IValidationResult = ValidationResult.success();
        if (!email)
            validationResult.addError("E-mail inválido.", "email", email);

        if (!senha)
            validationResult.addError("Senha inválida.", "senha");

        return validationResult;
    }
}
