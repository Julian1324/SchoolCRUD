import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PersonasComponent } from './components/personas/personas.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PersonasComponent,
    EstudiantesComponent,
    ProfesoresComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
