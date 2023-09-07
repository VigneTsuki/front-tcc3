import { Component } from '@angular/core';
import { CrudService, Sala, SalaLista, Materia, MateriaLista } from '../shared/crud.service';

@Component({
  selector: 'app-cronograma',
  templateUrl: './cronograma.component.html',
  styleUrls: ['./cronograma.component.css']
})
export class CronogramaComponent {
  materiaSelecionada: MateriaLista = { nome: '', id: ''};
  opcoesMateria?: MateriaLista[] = [];
  salaSelecionada: SalaLista = { bloco: '', numeracao: '', id: ''};
  opcoesSala?: SalaLista[] = [];
  dataInicioAula: string = '';
  dataFimAula: string = ''; 
  anoSelecionado?: string;
  opcoesAno: string[] = ['2023', '2022', '2021', '2020', '2019', '2018']
  semestreSelecionado?: string;
  opcoesSemestre: string[] = ['1', '2']

  constructor(public crudService: CrudService) {}
  ngOnInit() {
    this.BuscarMaterias();
    this.BuscarSalas();
  }

  BuscarMaterias() {
    return this.crudService.BuscarMaterias().subscribe((res: Materia) => {
      this.opcoesMateria = res.materias;
    });
  }

  BuscarSalas() {
    return this.crudService.BuscarSalas().subscribe((res: Sala) => {
      this.opcoesSala = res.salas;
    });
  }

  cadastrarCronograma(){
    const cronogramData = {
      IdMateria: this.materiaSelecionada.id,
      IdSala: this.salaSelecionada.id,
      DataInicioAula: this.dataInicioAula,
      DataFimAula: this.dataFimAula,
      Ano: this.anoSelecionado,
      Semestre: this.semestreSelecionado
    };

    return this.crudService.CriarCronograma(cronogramData).subscribe((res: any) => {
      this.materiaSelecionada = { nome: '', id: ''};
      this.salaSelecionada = { bloco: '', numeracao: '', id: ''};
      this.dataInicioAula = '';
      this.dataFimAula = '';
      this.anoSelecionado = '';
      this.semestreSelecionado = '';
    });
  }
}
