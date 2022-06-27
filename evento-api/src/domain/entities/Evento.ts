import { Usuario } from "@prisma/client";
import ICreateEventoModel from "../models/ICreateEventoModel";
import Endereco from "./Endereco";
import ListaEspera from "./ListaEspera";
import Participante from "./Participante";

export default class Evento {
    private _usuario!: Usuario;
    private _endereco!: Endereco;

    Id!: string;
    DataHoraCadastro: Date;
    Nome: string;
    Descricao?: string;
    CapacidadeMaxima: number;
    DataHoraInicio: Date;
    DataHoraFinal: Date;
    IdUsuario!: string;
    IdEndereco!: string;

    public get Endereco(): Endereco {
        return this._endereco;
    }
    public set Endereco(value: Endereco) {
        this._endereco = value;
        this.IdEndereco = value.Id;
    }

    public get Usuario(): Usuario {
        return this._usuario;
    }

    public set Usuario(value: Usuario) {
        this._usuario = value;
        this.IdUsuario = value.Id;
    }

    Participantes: Participante[] = [];
    ListaEspera: ListaEspera[] = [];

    constructor(model: ICreateEventoModel, usuario: Usuario, endereco: Endereco) {
        this.DataHoraCadastro = new Date();
        this.Nome = model.nome;
        this.Descricao = model.descricao;
        this.CapacidadeMaxima = model.capacidadeMaxima;
        this.DataHoraInicio = model.dataHoraInicio;
        this.DataHoraFinal = model.dataHoraFinal;
        this.Usuario = usuario;
        this.Endereco = endereco;
    }
}