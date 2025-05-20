import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';

@Component({
  selector: 'app-create-estudiante-dialog',
  templateUrl: './create-estudiante-dialog.component.html',
  styleUrls: ['./create-estudiante-dialog.component.css']
})
export class CreateEstudianteDialogComponent implements OnInit {

  personaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private notificationService: NotificationService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  savePersona() {
    if (this.personaForm.valid) {
      const personaData = this.personaForm.value;
      personaData.fechaNacimiento = personaData.fechaNacimiento.toISOString().split('T')[0];

      this.personasService.createPersona(personaData)
        .pipe(take(1))
        .subscribe({
          next: (response: PersonaDTO) => {
            this.subjectService.addPersona(response);
            this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
          },
          error: (err) => {
            const errorMessage = err.error?.errores?.length
              ? err.error.errores.reduce((acum: any, error: any) => {
                acum = acum + error + '\n';
                return acum;
              }, '')
              : constants.MODAL_BODY_ERROR;

            this.notificationService.showError(errorMessage);
          }
        });

    } else {
      console.log('Formulario inválido');
    }
  }

}