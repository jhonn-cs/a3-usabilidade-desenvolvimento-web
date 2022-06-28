export default interface IEventoModel {
    id: string;
    nome: string;
    descricao: string;
    capacidadeMaxima: number;
    dataHoraInicio: Date;
    dataHoraFinal: Date;
}