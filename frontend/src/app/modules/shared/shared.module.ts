import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './custom-components/error-dialog/error-dialog.component';
import { CreatePersonaDialogComponent } from './custom-components/create-persona-dialog/create-persona-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SuccessDialogComponent } from './custom-components/success-dialog/success-dialog.component';
import { EditPersonaDialogComponent } from './custom-components/edit-persona-dialog/edit-persona-dialog.component';
import { ConfirmDialogComponent } from './custom-components/confirm-dialog/confirm-dialog.component';
import { CreateEstudianteDialogComponent } from './custom-components/create-estudiante-dialog/create-estudiante-dialog.component';
import { EditEstudianteDialogComponent } from './custom-components/edit-estudiante-dialog/edit-estudiante-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmEstudiantesDialogComponent } from './custom-components/confirm-estudiantes-dialog/confirm-estudiantes-dialog.component';
import { CreateProfesorDialogComponent } from './custom-components/create-profesor-dialog/create-profesor-dialog.component';
import { EditProfesorDialogComponent } from './custom-components/edit-profesor-dialog/edit-profesor-dialog.component';
import { ConfirmProfesorDialogComponent } from './custom-components/confirm-profesor-dialog/confirm-profesor-dialog.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    CreatePersonaDialogComponent,
    SuccessDialogComponent,
    EditPersonaDialogComponent,
    ConfirmDialogComponent,
    CreateEstudianteDialogComponent,
    EditEstudianteDialogComponent,
    ConfirmEstudiantesDialogComponent,
    CreateProfesorDialogComponent,
    EditProfesorDialogComponent,
    ConfirmProfesorDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class SharedModule { }
