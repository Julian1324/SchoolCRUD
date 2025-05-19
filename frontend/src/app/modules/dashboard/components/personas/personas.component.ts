import { Component, OnDestroy, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { PersonaDTO } from '../../data/PersonaDTO';
import { NotificationService } from 'src/app/core/services/notification.service';
import { constants } from 'src/app/core/data/constants';
import { CreatePersonaDialogComponent } from 'src/app/modules/shared/custom-components/create-persona-dialog/create-persona-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from 'src/app/core/services/subject.service';
import { SubSink } from 'subsink';
import { EditPersonaDialogComponent } from 'src/app/modules/shared/custom-components/edit-persona-dialog/edit-persona-dialog.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Fecha de Nacimiento', 'Email', 'Teléfono', 'Acciones'];
  dataSource: PersonaDTO[] = [];
  subs = new SubSink();

  constructor(
    private personasService: PersonasService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.getPersonas();
    this.getPersonasSubject();
  }

  getPersonasSubject() {
    this.subs.add(
      this.subjectService.getPersonasValue().subscribe((personas: PersonaDTO[]) => {
        this.dataSource = personas;
        console.log('personas:', personas);
      })
    );
  }

  getPersonas() {
    this.subs.add(
      this.personasService.getPersonas().subscribe({
        next: (response: any) => {
          this.dataSource = (response.content as PersonaDTO[]);
          this.subjectService.setPersonasValue(this.dataSource);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      })
    );
  }

  openCreateDialog(): void {
    this.dialog.open(CreatePersonaDialogComponent, {
      width: '400px'
    });
  }

  openEditDialog(persona: PersonaDTO): void {
    this.dialog.open(EditPersonaDialogComponent, {
      width: '400px',
      data: persona
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
