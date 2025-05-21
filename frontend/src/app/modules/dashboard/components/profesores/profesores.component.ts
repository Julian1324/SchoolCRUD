import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonaDTO } from '../../data/PersonaDTO';
import { NotificationService } from 'src/app/core/services/notification.service';
import { constants } from 'src/app/core/data/constants';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { SubSink } from 'subsink';
import { take } from 'rxjs';
import { EstudianteDTO } from '../../data/EstudianteDTO';
import { EditEstudianteDialogComponent } from 'src/app/modules/shared/custom-components/edit-estudiante-dialog/edit-estudiante-dialog.component';
import { ConfirmEstudiantesDialogComponent } from 'src/app/modules/shared/custom-components/confirm-estudiantes-dialog/confirm-estudiantes-dialog.component';
import { CreateProfesorDialogComponent } from 'src/app/modules/shared/custom-components/create-profesor-dialog/create-profesor-dialog.component';
import { ProfesorDTO } from '../../data/ProfesorDTO';
import { ProfesoresService } from '../../services/profesores.service';
import { EditProfesorDialogComponent } from 'src/app/modules/shared/custom-components/edit-profesor-dialog/edit-profesor-dialog.component';
import { ConfirmProfesorDialogComponent } from 'src/app/modules/shared/custom-components/confirm-profesor-dialog/confirm-profesor-dialog.component';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Especialidad', 'Fecha de contratación', 'Acciones'];
  dataSource: ProfesorDTO[] = [];
  subs = new SubSink();
  personas: PersonaDTO[] = [];

  constructor(
    private profesoresService: ProfesoresService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getProfesores();
    this.getProfesoresSubject();
  }

  getProfesoresSubject() {
    this.subs.add(
      this.subjectService.getProfesoresValue().subscribe((profesores: ProfesorDTO[]) => {
        this.dataSource = profesores;
      })
    );
  }

  getProfesores() {
    this.profesoresService.getProfesores()
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.dataSource = (response.content as ProfesorDTO[]);
          this.subjectService.setProfesoresValue(this.dataSource);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      });
  }

  openCreateDialog(): void {
    this.dialog.open(CreateProfesorDialogComponent, {
      width: '400px'
    });
  }

  openEditDialog(profesor: ProfesorDTO): void {
    this.dialog.open(EditProfesorDialogComponent, {
      width: '400px',
      data: profesor
    });
  }

  openConfirmDialog(profesor: ProfesorDTO): void {
    this.dialog.open(ConfirmProfesorDialogComponent, {
      width: '400px',
      data: profesor
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
