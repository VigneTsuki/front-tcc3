import { Component } from '@angular/core';
import { CrudService, Presenca, Materia, MateriaLista } from '../shared/crud.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent {
  materiaSelecionada: MateriaLista = { nome: '', id: ''};
  opcoesMateria?: MateriaLista[] = [];
  anoSelecionado?: string;
  opcoesAno: string[] = ['2023', '2022', '2021', '2020', '2019', '2018']
  semestreSelecionado?: string;
  opcoesSemestre: string[] = ['1', '2']
  usuario: any;
  presencas: any = [];
  diasAula: any = [];
  alunos: any = [];

  constructor(public crudService: CrudService) {}
  ngOnInit() {
    this.BuscarMaterias();
  }

  BuscarUsuario() {
    return this.crudService.BuscarUsuario("999").subscribe((res: {}) => {
      this.usuario = res
    });
  }

  BuscarPresencas(idMateria: string, ano: string, semestre: string) {
    return this.crudService.BuscarPresencas(idMateria, ano, semestre).subscribe((res: Presenca) => {
      this.presencas = res.presencas;
      this.diasAula = res.diasAula;
      this.alunos = res.alunos;
    });
  }

  BuscarMaterias() {
    return this.crudService.BuscarMaterias().subscribe((res: Materia) => {
      this.opcoesMateria = res.materias;
    });
  }

  atualizarTabela() {
    this.BuscarPresencas(this.materiaSelecionada.id ?? '', this.anoSelecionado ?? '', this.semestreSelecionado ?? '');
  }
}
