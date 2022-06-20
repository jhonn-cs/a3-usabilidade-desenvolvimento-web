import Usuario from "../entities/Usuario";

export default interface IUsuarioRepository {
    add(usuario: Usuario): Promise<Usuario>;
}