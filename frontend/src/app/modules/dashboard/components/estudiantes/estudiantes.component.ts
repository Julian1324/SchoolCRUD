import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonaDTO } from '../../data/PersonaDTO';
import { NotificationService } from 'src/app/core/services/notification.service';
import { constants } from 'src/app/core/data/constants';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { SubSink } from 'subsink';
import { take } from 'rxjs';
import { EstudiantesService } from '../../services/estudiantes.service';
import { EstudianteDTO } from '../../data/EstudianteDTO';
import { CreateEstudianteDialogComponent } from 'src/app/modules/shared/custom-components/create-estudiante-dialog/create-estudiante-dialog.component';
import { EditEstudianteDialogComponent } from 'src/app/modules/shared/custom-components/edit-estudiante-dialog/edit-estudiante-dialog.component';
import { ConfirmEstudiantesDialogComponent } from 'src/app/modules/shared/custom-components/confirm-estudiantes-dialog/confirm-estudiantes-dialog.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Número matrícula', 'Grado', 'Acciones'];
  dataSource: EstudianteDTO[] = [];
  subs = new SubSink();
  personas: PersonaDTO[] = [];

  constructor(
    private estudiantesService: EstudiantesService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getEstudiantes();
    this.getEstudiantesSubject();
  }

  getEstudiantesSubject() {
    this.subs.add(
      this.subjectService.getEstudiantesValue().subscribe((estudiantes: EstudianteDTO[]) => {
        this.dataSource = estudiantes;
      })
    );
  }

  getEstudiantes() {
    this.estudiantesService.getEstudiantes()
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.dataSource = (response.content as EstudianteDTO[]);
          this.subjectService.setEstudiantesValue(this.dataSource);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      });
  }

  openCreateDialog(): void {
    this.dialog.open(CreateEstudianteDialogComponent, {
      width: '400px'
    });
  }

  openEditDialog(estudiante: EstudianteDTO): void {
    this.dialog.open(EditEstudianteDialogComponent, {
      width: '400px',
      data: estudiante
    });
  }

  openConfirmDialog(estudiante: EstudianteDTO): void {
    this.dialog.open(ConfirmEstudiantesDialogComponent, {
      width: '400px',
      data: estudiante
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
