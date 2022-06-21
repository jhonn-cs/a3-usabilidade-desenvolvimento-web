import { hash } from "bcrypt";
import { inject, injectable } from "inversify";
import IValidationResult from "../core/validations/interfaces/IValidationResult";
import ValidationResult from "../core/validations/ValidationResult";
import Usuario from "../domain/entities/Usuario";
import UsuarioAlreadyExistsException from "../domain/exceptions/UsuarioAlreadyExistsException";
import ValidationException from "../domain/exceptions/ValidationException";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import ICreateUsuarioService from "../domain/services/ICreateUsuarioService";
import UsuarioRepository from "../infrastructure/data/repositories/UsuarioRepository";

@injectable()
export default class CreateUsuarioService implements ICreateUsuarioService {
    private readonly usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(UsuarioRepository)
        usuarioRepository: IUsuarioRepository
    ) {
        this.usuarioRepository = usuarioRepository;
    }

    async execute(email: string, senha: string): Promise<IUsuarioModel> {
        const validationResult = this.validate(email, senha);
        if (!validationResult.success)
            throw new ValidationException(validationResult);

        const usuarioAlreadyExists = await this.usuarioRepository.findByEmail(email);
        if (usuarioAlreadyExists)
            throw new UsuarioAlreadyExistsException();

        const hashSenha = await hash(senha, 10);

        let usuario = new Usuario({ email: email, senha: hashSenha });
        usuario = await this.usuarioRepository.add(usuario);
        return {
            id: usuario.Id,
            email: usuario.Email,
        } as IUsuarioModel;
    }

    private validate(email: string, senha: string): IValidationResult {
        const validationResult: IValidationResult = ValidationResult.success();
        if (!email)
            validationResult.addError("E-mail inválido.", "email", email);

        if (!senha)
            validationResult.addError("Senha inválida.", "senha");

        return validationResult;
    }
}
