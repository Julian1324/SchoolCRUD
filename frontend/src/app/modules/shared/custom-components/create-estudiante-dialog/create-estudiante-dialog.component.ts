import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { EstudianteDTO } from 'src/app/modules/dashboard/data/EstudianteDTO';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { EstudiantesService } from 'src/app/modules/dashboard/services/estudiantes.service';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';

@Component({
  selector: 'app-create-estudiante-dialog',
  templateUrl: './create-estudiante-dialog.component.html',
  styleUrls: ['./create-estudiante-dialog.component.css']
})
export class CreateEstudianteDialogComponent implements OnInit {

  estudianteForm!: FormGroup;
  personas: PersonaDTO[] = [];
  estudiantes: EstudianteDTO[] = [];

  options = [
    { value: 0, viewValue: 'Selecciona una opción' },
  ];

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private estudiantesService: EstudiantesService,
    private notificationService: NotificationService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getPersonas();
    this.getEstudiantesSubject();
  }

  buildForm() {
    this.estudianteForm = this.fb.group({
      idPersona: [null, Validators.required],
      numeroMatricula: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      grado: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  getPersonas() {
    this.personasService.getPersonas()
      .pipe(take(1))
      .subscribe({
        next: (response: any) => {
          this.options = response.content.map((persona: any) => {
            return { value: persona.idPersona, viewValue: `${persona.nombre} ${persona.apellido}` };
          });
          this.personas = (response.content as PersonaDTO[]);
        },
        error: (_) => {
          this.notificationService.showError(constants.MODAL_BODY_ERROR);
        }
      });
  }

  onSelectClicked(isOpen: boolean) {
    if (isOpen) {
      this.options = this.options.filter((option) => option.value !== this.estudiantes.find((e) => e.idPersona === option.value)?.idPersona);
    }
  }

  getEstudiantesSubject() {
    this.subjectService.getEstudiantesValue().subscribe((estudiantes) => {
      this.estudiantes = estudiantes;
    });
  }

  saveEstudiante() {
    if (this.estudianteForm.valid) {
      const estudiante: EstudianteDTO = this.estudianteForm.value;

      this.estudiantesService.createEstudiante(estudiante)
        .pipe(take(1))
        .subscribe({
          next: (response: EstudianteDTO) => {
            const currentPersona = this.personas.find((persona) => persona.idPersona === response.idPersona);
            this.subjectService.addEstudiante({ nombre: currentPersona?.nombre, apellido: currentPersona?.apellido, ...response });
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