import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiarioComponent } from './diario/diario.component';
import { MateriaComponent } from './materia/materia.component';
import { CronogramaComponent } from './cronograma/cronograma.component';
import { MatriculaComponent } from './matricula/matricula.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'diario', component: DiarioComponent },
  { path: 'materia', component: MateriaComponent },
  { path: 'cronograma', component: CronogramaComponent },
  { path: 'matricula', component: MatriculaComponent },
  { path: '', redirectTo: '/diario', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
