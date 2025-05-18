import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonasComponent } from './components/personas/personas.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'personas', component: PersonasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
