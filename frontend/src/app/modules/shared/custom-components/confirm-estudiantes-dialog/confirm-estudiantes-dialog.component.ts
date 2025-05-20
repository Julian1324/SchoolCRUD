import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { EstudianteDTO } from 'src/app/modules/dashboard/data/EstudianteDTO';
import { EstudiantesService } from 'src/app/modules/dashboard/services/estudiantes.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';

@Component({
  selector: 'app-confirm-estudiantes-dialog',
  templateUrl: './confirm-estudiantes-dialog.component.html',
  styleUrls: ['./confirm-estudiantes-dialog.component.css']
})
export class ConfirmEstudiantesDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public estudiante: EstudianteDTO,
    private subjectService: SubjectService,
    private estudiantesService: EstudiantesService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onDeleteEstudiante(): void {
    const idEstudiante = this.estudiante.idEstudiante || 0;

    this.estudiantesService.deleteEstudiante(idEstudiante)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.subjectService.deleteEstudiante(idEstudiante);
          this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      })
  }

}
