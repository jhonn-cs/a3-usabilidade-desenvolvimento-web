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
                throw new CreateEventoException("Usu??rio n??o encontrado.");

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
            validationResult.addError("Nome inv??lido.", "nome", nome);

        if (!descricao)
            validationResult.addError("Descri????o inv??lida.", "descricao", descricao);

        if (capacidadeMaxima <= 0)
            validationResult.addError("Capacidade m??xima inv??lida.", "capacidadeMaxima", capacidadeMaxima);

        if (!dataHoraInicio)
            validationResult.addError("Data hora de in??cio inv??lida.", "dataHoraInicio", dataHoraInicio);

        if (!dataHoraFinal)
            validationResult.addError("Data hora final inv??lida.", "dataHoraFinal", dataHoraFinal);

        return validationResult;
    }

    private validateEndereco({ logradouro, numero, bairro, cidade, uf }: ICreateEnderecoModel): IValidationResult {
        const validationResult = ValidationResult.success();

        if (!logradouro)
            validationResult.addError("Logradouro n??o informado.", "logradouro", logradouro);

        if (!numero)
            validationResult.addError("N??mero n??o informado.", "numero", numero);

        if (!bairro)
            validationResult.addError("Bairro n??o informado.", "bairro", bairro);

        if (!cidade)
            validationResult.addError("Cidade n??o informada.", "cidade", cidade);

        if (!uf)
            validationResult.addError("UF n??o informada.", "uf", uf);

        return validationResult;
    }

    private validateUsuario({ id }: IUsuarioModel): IValidationResult {
        const validationResult = ValidationResult.success();

        if (!id)
            validationResult.addError("Usu??rio n??o encontrado.", "");

        return validationResult;
    }
}