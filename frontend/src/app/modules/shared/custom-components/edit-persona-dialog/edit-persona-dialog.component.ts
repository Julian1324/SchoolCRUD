import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';
@Component({
  selector: 'app-edit-persona-dialog',
  templateUrl: './edit-persona-dialog.component.html',
  styleUrls: ['./edit-persona-dialog.component.css']
})
export class EditPersonaDialogComponent implements OnInit {
  personaForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public persona: PersonaDTO,
    private fb: FormBuilder,
    private personasService: PersonasService,
    private notificationService: NotificationService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.personaForm = this.fb.group({
      nombre: [this.persona.nombre, Validators.required],
      apellido: [this.persona.apellido, Validators.required],
      fechaNacimiento: [this.persona.fechaNacimiento, Validators.required],
      email: [this.persona.email, [Validators.required, Validators.email]],
      telefono: [this.persona.telefono, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  savePersona() {
    if (this.personaForm.valid) {
      const updatedPersona = { idPersona: this.persona.idPersona, ...this.personaForm.value };
      let fecha = updatedPersona.fechaNacimiento;

      if (typeof fecha === 'string') {
        fecha = new Date(fecha);
      }
      updatedPersona.fechaNacimiento = fecha.toISOString().split('T')[0];

      this.personasService.updatePersona(updatedPersona)
      .pipe(take(1))
      .subscribe({
        next: (response: PersonaDTO) => {
          this.subjectService.updatePersona(response);
          this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
