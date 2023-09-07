import { Component } from '@angular/core';
import { CrudService, Materia, MateriaLista, Aluno, AlunoLista } from '../shared/crud.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent {
  materiaSelecionada: MateriaLista = { nome: '', id: ''};
  opcoesMateria?: MateriaLista[] = [];
  alunoSelecionado: AlunoLista = { codigo: '', nome: '', id: ''};
  opcoesAluno?: AlunoLista[] = [];

  constructor(public crudService: CrudService) {}
  ngOnInit() {
    this.BuscarMaterias();
    this.BuscarAlunos();
  }

  BuscarMaterias() {
    return this.crudService.BuscarMaterias().subscribe((res: Materia) => {
      this.opcoesMateria = res.materias;
    });
  }

  BuscarAlunos() {
    return this.crudService.BuscarAlunos().subscribe((res: Aluno) => {
      this.opcoesAluno = res.alunos;
    });
  }

  cadastrarAluno() {
    return this.crudService.CriarMatricula(this.alunoSelecionado.id ?? '', this.materiaSelecionada.id ?? '').subscribe((res: any) => {
      this.alunoSelecionado = { codigo: '', nome: '', id: ''};
      this.materiaSelecionada = { nome: '', id: ''};
    });
  }
}
