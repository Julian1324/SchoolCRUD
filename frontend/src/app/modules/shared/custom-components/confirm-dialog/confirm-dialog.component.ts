import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { constants } from 'src/app/core/data/constants';
import { take } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public persona: PersonaDTO,
    private personasService: PersonasService,
    private subjectService: SubjectService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onDeletePerson(): void {
    const idPersona = this.persona.idPersona || 0;

    this.personasService.deletePersona(idPersona)
    .pipe(take(1))
    .subscribe({
      next: () => {
        this.subjectService.deletePersona(idPersona);
        this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
      },
      error: (_) => {
        this.notificationService.showError(constants.MODAL_BODY_ERROR);
      }
    })
  }
}
