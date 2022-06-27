import Usuario from "../entities/Usuario";

export default interface IUsuarioRepository {
    getById(id: string): Promise<Usuario | null>;
}