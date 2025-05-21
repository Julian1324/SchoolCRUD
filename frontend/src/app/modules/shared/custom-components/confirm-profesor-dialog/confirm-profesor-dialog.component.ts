import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { ProfesorDTO } from 'src/app/modules/dashboard/data/ProfesorDTO';
import { ProfesoresService } from 'src/app/modules/dashboard/services/profesores.service';

@Component({
  selector: 'app-confirm-profesor-dialog',
  templateUrl: './confirm-profesor-dialog.component.html',
  styleUrls: ['./confirm-profesor-dialog.component.css']
})
export class ConfirmProfesorDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public profesor: ProfesorDTO,
    private subjectService: SubjectService,
    private profesoresService: ProfesoresService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onDeleteProfesor(): void {
    const idProfesor = this.profesor.idProfesor || 0;

    this.profesoresService.deleteProfesor(idProfesor)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.subjectService.deleteProfesor(idProfesor);
          this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      })
  }

}