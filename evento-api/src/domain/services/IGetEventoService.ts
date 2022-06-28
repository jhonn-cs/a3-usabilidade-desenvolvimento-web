import IEventoModel from "../models/IEventoModel";

export default interface IGetEventoService {
    execute(idUsuario: string): Promise<IEventoModel>;
}