import { Component } from '@angular/core';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent {
  nomeMateria: string = '';
  quantidadeCreditosMateria: string = '';

  constructor(private crudService: CrudService) {}

  criarMateria() {
    const materiaData = {
      Nome: this.nomeMateria,
      QuantidadeCreditos: this.quantidadeCreditosMateria
    };

    return this.crudService.CriarMateria(materiaData).subscribe((res: any) => {
      this.nomeMateria = '';
      this.quantidadeCreditosMateria = '';
    });
  }
}
