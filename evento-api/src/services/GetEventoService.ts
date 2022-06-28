import { inject, injectable } from "inversify";
import UsuarioNotFoundException from "../domain/exceptions/UsuarioNotFoundException";
import IEventoModel from "../domain/models/IEventoModel";
import IEventoRepository from "../domain/repositories/IEventoRepository";
import IGetEventoService from "../domain/services/IGetEventoService";
import { TYPES } from "../infrastructure/ioc/types";

@injectable()
export default class GetEventoService implements IGetEventoService {
    private readonly _eventoRepository: IEventoRepository;

    constructor(
        @inject(TYPES.IEventoRepository)
        eventoRepository: IEventoRepository
    ) {
        this._eventoRepository = eventoRepository;
    }

    async execute(idUsuario: string): Promise<IEventoModel> {
        if (!idUsuario)
            throw new UsuarioNotFoundException();

        this._eventoRepository.getAll()
    }
}