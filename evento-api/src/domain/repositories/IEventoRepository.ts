import Evento from "../entities/Evento";

export default interface IEventoRepository {
    add(entity: Evento): Promise<Evento>;
    getById(id: string): Promise<Evento>;
    getAll(): Promise<Evento[]>;
    getAllByIdUsuario(idUsuario: string): Promise<Evento[]>;
    update(entity: Evento): Promise<void>;
}