import { Participante } from "@prisma/client"

export default class Usuario {
    Id?: string;
    DataHoraCadastro?: Date;
    Email?: string;
    Senha?: string;
    Participante?: Participante;
}