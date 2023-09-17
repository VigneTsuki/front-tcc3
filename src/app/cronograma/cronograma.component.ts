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
  dataAula?: Date = undefined;
  dataFimAula?: Date = undefined;
  anoSelecionado?: string;
  opcoesAno: string[] = ['2023', '2022', '2021', '2020', '2019', '2018']
  semestreSelecionado?: string;
  opcoesSemestre: string[] = ['1', '2']
  horarioInicioAula: string = ''
  horarioFimAula: string = ''

  mesAjustado: number = 0
  mesAjustadoStr: string = ''

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
    
    this.mesAjustado = (this.dataAula?.getMonth() ?? 0) + 1;
    if(this.mesAjustado < 10){
      this.mesAjustadoStr = "0" + this.mesAjustado.toString()
    } else{
      this.mesAjustadoStr = this.mesAjustado.toString()
    }
    
    const cronogramData = {
      IdMateria: this.materiaSelecionada.id,
      IdSala: this.salaSelecionada.id,
      DataInicioAula: this.dataAula?.getFullYear() + "-" + this.mesAjustadoStr + "-" + this.dataAula?.getDate() + " " + this.horarioInicioAula + ":00",
      DataFimAula: this.dataAula?.getFullYear() + "-" + this.mesAjustadoStr + "-" + this.dataAula?.getDate() + " " + this.horarioFimAula + ":00",
      Ano: this.anoSelecionado,
      Semestre: this.semestreSelecionado
    };
    
    return this.crudService.CriarCronograma(cronogramData).subscribe((res: any) => {
      this.materiaSelecionada = { nome: '', id: ''};
      this.salaSelecionada = { bloco: '', numeracao: '', id: ''};
      this.dataAula = undefined;
      this.anoSelecionado = '';
      this.semestreSelecionado = '';
      this.horarioInicioAula = '';
      this.horarioFimAula = '';
    });
  }
}
