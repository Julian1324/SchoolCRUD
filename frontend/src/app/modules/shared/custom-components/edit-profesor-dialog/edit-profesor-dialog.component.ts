import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { ProfesorDTO } from 'src/app/modules/dashboard/data/ProfesorDTO';
import { ProfesoresService } from 'src/app/modules/dashboard/services/profesores.service';

@Component({
  selector: 'app-edit-profesor-dialog',
  templateUrl: './edit-profesor-dialog.component.html',
  styleUrls: ['./edit-profesor-dialog.component.css']
})
export class EditProfesorDialogComponent implements OnInit {

  profesorForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public profesor: any,
    private fb: FormBuilder,
    private profesoresService: ProfesoresService,
    private notificationService: NotificationService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.profesorForm = this.fb.group({
      nombre: [{ value: this.profesor.nombre, disabled: true }, Validators.required],
      apellido: [{ value: this.profesor.apellido, disabled: true }, Validators.required],
      especialidad: [this.profesor.especialidad, [Validators.required]],
      fechaContratacion: [this.profesor.fechaContratacion, [Validators.required]],
    });
  }

  saveProfesor() {
    if (this.profesorForm.valid) {

      const updatedProfesor = {
        idPersona: this.profesor.idPersona,
        idProfesor: this.profesor.idProfesor,
        ...this.profesorForm.value
      };

      let fecha = updatedProfesor.fechaContratacion;

      if (typeof fecha === 'string') {
        fecha = new Date(fecha);
      }
      updatedProfesor.fechaContratacion = fecha.toISOString().split('T')[0];

      this.profesoresService.updateProfesor(updatedProfesor)
        .pipe(take(1))
        .subscribe({
          next: (response: ProfesorDTO) => {

            this.subjectService.updateProfesor({
              nombre: this.profesor.nombre,
              apellido: this.profesor.apellido,
              idProfesor: this.profesor.idProfesor,
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