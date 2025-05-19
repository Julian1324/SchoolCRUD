import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonasComponent } from './components/personas/personas.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'personas', component: PersonasComponent },
      { path: 'estudiantes', component: EstudiantesComponent },
      { path: 'profesores', component: ProfesoresComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
