export default interface ICreateEventoModel {
    nome: string;
    descricao: string;
    capacidadeMaxima: number;
    dataHoraInicio: Date;
    dataHoraFinal: Date;
    idUsuario: string;
    idLocal: string
}