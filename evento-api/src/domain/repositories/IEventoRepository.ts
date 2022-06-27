import Evento from "../entities/Evento";
import IUpdateEventoModel from "../models/IUpdateEventoModel";

export default interface IEventoRepository {
    add(entity: Evento): Promise<Evento>;
    getById(id: string): Promise<Evento | null>;
    getAll(): Promise<Evento[]>
    update(entity: IUpdateEventoModel): Promise<void>
}