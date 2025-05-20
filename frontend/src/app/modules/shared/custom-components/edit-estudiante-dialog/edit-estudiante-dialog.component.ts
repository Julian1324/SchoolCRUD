import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { EstudianteDTO } from 'src/app/modules/dashboard/data/EstudianteDTO';
import { EstudiantesService } from 'src/app/modules/dashboard/services/estudiantes.service';

@Component({
  selector: 'app-edit-estudiante-dialog',
  templateUrl: './edit-estudiante-dialog.component.html',
  styleUrls: ['./edit-estudiante-dialog.component.css']
})
export class EditEstudianteDialogComponent implements OnInit {

  estudianteForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public estudiante: any,
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private notificationService: NotificationService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.estudianteForm = this.fb.group({
      nombre: [{ value: this.estudiante.nombre, disabled: true }, Validators.required],
      apellido: [{ value: this.estudiante.apellido, disabled: true }, Validators.required],
      numeroMatricula: [parseInt(this.estudiante.numeroMatricula), [Validators.required, Validators.pattern('^[0-9]*$')]],
      grado: [parseInt(this.estudiante.grado), [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  saveEstudiante() {
    if (this.estudianteForm.valid) {

      const updatedEstudiante = {
        idPersona: this.estudiante.idPersona,
        idEstudiante: this.estudiante.idEstudiante,
        ...this.estudianteForm.value
      };

      this.estudiantesService.updateEstudiante(updatedEstudiante)
        .pipe(take(1))
        .subscribe({
          next: (response: EstudianteDTO) => {

            this.subjectService.updateEstudiante({
              nombre: this.estudiante.nombre,
              apellido: this.estudiante.apellido,
              idEstudiante: this.estudiante.idEstudiante,
              ...response
            });

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