import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { EstudianteDTO } from 'src/app/modules/dashboard/data/EstudianteDTO';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { ProfesorDTO } from 'src/app/modules/dashboard/data/ProfesorDTO';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';
import { ProfesoresService } from 'src/app/modules/dashboard/services/profesores.service';

@Component({
  selector: 'app-create-profesor-dialog',
  templateUrl: './create-profesor-dialog.component.html',
  styleUrls: ['./create-profesor-dialog.component.css']
})
export class CreateProfesorDialogComponent implements OnInit {

  profesorForm!: FormGroup;
  personas: PersonaDTO[] = [];
  profesores: ProfesorDTO[] = [];

  options = [
    { value: 0, viewValue: 'Selecciona una opción' },
  ];

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private profesoresService: ProfesoresService,
    private notificationService: NotificationService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getPersonas();
    this.getProfesoresSubject();
  }

  buildForm() {
    this.profesorForm = this.fb.group({
      idPersona: [null, Validators.required],
      especialidad: [null, [Validators.required]],
      fechaContratacion: [null, [Validators.required]]
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
      this.options = this.options.filter((option) => option.value !== this.profesores.find((e) => e.idPersona === option.value)?.idPersona);
    }
  }

  getProfesoresSubject() {
    this.subjectService.getProfesoresValue().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  saveProfesor() {
    if (this.profesorForm.valid) {
      const profesor = this.profesorForm.value;
      profesor.fechaContratacion = profesor.fechaContratacion.toISOString().split('T')[0];

      this.profesoresService.createProfesor(profesor)
        .pipe(take(1))
        .subscribe({
          next: (response: ProfesorDTO) => {
            const currentPersona = this.personas.find((persona) => persona.idPersona === response.idPersona);
            this.subjectService.addProfesor({ nombre: currentPersona?.nombre, apellido: currentPersona?.apellido, ...response });
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