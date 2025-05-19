import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from 'src/app/core/data/constants';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { PersonasService } from 'src/app/modules/dashboard/services/personas.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-persona-dialog',
  templateUrl: './create-persona-dialog.component.html',
  styleUrls: ['./create-persona-dialog.component.css']
})
export class CreatePersonaDialogComponent implements OnInit, OnDestroy {
  personaForm!: FormGroup;
  subs: SubSink = new SubSink();

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
      
      this.subs.add(
        this.personasService.createPersona(personaData).subscribe({
          next: (response: PersonaDTO) => {
            this.subjectService.addPersona(response);
            this.notificationService.showSuccess(constants.MODAL_BODY_SUCCESS);
          },
          error: (_) => {
            this.notificationService.showError(constants.MODAL_BODY_ERROR);
          }
        })
      );
      
    } else {
      console.log('Formulario inválido');
    }
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
