import { inject, injectable } from "inversify";
import ICreateEnderecoModel from "../domain/models/ICreateEnderecoModel";
import ICreateEventoModel from "../domain/models/ICreateEventoModel";
import IEventoRepository from "../domain/repositories/IEventoRepository";
import ICreateEventoService from "../domain/services/ICreateEventoService";
import IValidationResult from "../../../core/validations/interfaces/IValidationResult";
import ValidationResult from "../../../core/validations/ValidationResult";
import ValidationException from "../../../core/exceptions/ValidationException";
import { TYPES } from "../infrastructure/ioc/types";
import CreateEventoException from "../domain/exceptions/CreateEventoException";
import Evento from "../domain/entities/Evento";
import IUsuarioRepository from "../domain/repositories/IUsuarioRepository";
import IUsuarioModel from "../domain/models/IUsuarioModel";
import Endereco from "../domain/entities/Endereco";

@injectable()
export default class CreateEventoService implements ICreateEventoService {
    private readonly _eventoRepository: IEventoRepository;
    private readonly _usuarioRepository: IUsuarioRepository;

    constructor(
        @inject(TYPES.IEventoRepository)
        eventoRepository: IEventoRepository,
        @inject(TYPES.IUsuarioRepository)
        usuarioRepository: IUsuarioRepository) {
        this._eventoRepository = eventoRepository;
        this._usuarioRepository = usuarioRepository;
    }

    async execute(eventoModel: ICreateEventoModel, enderecoModel: ICreateEnderecoModel, usuarioModel: IUsuarioModel): Promise<string> {
        const validateEvento = this.validateEvento(eventoModel);
        const validateEndereco = this.validateEndereco(enderecoModel);
        const validateUsuario = this.validateUsuario(usuarioModel);

        const validationResult = validateEvento.join(validateEndereco).join(validateUsuario);
        if (!validationResult.success)
            throw new ValidationException(validationResult);

        try {

            const usuario = await this._usuarioRepository.getById(usuarioModel.id);
            if (!usuario)
                throw new CreateEventoException("Usuário não encontrado.");

            const endereco = new Endereco(enderecoModel);
            const evento = new Evento(eventoModel, usuario, endereco);

            const createdEvento = await this._eventoRepository.add(evento);
            if (!createdEvento)
                throw new CreateEventoException();

            return createdEvento.Id;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                throw new CreateEventoException(error.message);
            }

            throw new CreateEventoException();
        }
    }

    private validateEvento({ nome, descricao, capacidadeMaxima, dataHoraInicio, dataHoraFinal }: ICreateEventoModel): IValidationResult {
        const validationResult = ValidationResult.success();

        if (!nome)
            validationResult.addError("Nome inválido.", "nome", nome);

        if (!descricao)
            validationResult.addError("Descrição inválida.", "descricao", descricao);

        if (capacidadeMaxima <= 0)
            validationResult.addError("Capacidade máxima inválida.", "capacidadeMaxima", capacidadeMaxima);

        if (!dataHoraInicio)
            validationResult.addError("Data hora de início inválida.", "dataHoraInicio", dataHoraInicio);

        if (!dataHoraFinal)
            validationResult.addError("Data hora final inválida.", "dataHoraFinal", dataHoraFinal);

        return validationResult;
    }

    private validateEndereco({ logradouro, numero, bairro, cidade, uf }: ICreateEnderecoModel): IValidationResult {
        const validationResult = ValidationResult.success();

        if (!logradouro)
            validationResult.addError("Logradouro não informado.", "logradouro", logradouro);

        if (!numero)
            validationResult.addError("Número não informado.", "numero", numero);

        if (!bairro)
            validationResult.addError("Bairro não informado.", "bairro", bairro);

        if (!cidade)
            validationResult.addError("Cidade não informada.", "cidade", cidade);

        if (!uf)
            validationResult.addError("UF não informada.", "uf", uf);

        return validationResult;
    }

    private validateUsuario({ id }: IUsuarioModel): IValidationResult {
        const validationResult = ValidationResult.success();

        if (!id)
            validationResult.addError("Usuário não encontrado.", "");

        return validationResult;
    }
}