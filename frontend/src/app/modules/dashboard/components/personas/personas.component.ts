import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { PersonaDTO } from '../../data/PersonaDTO';
import { NotificationService } from 'src/app/core/services/notification.service';
import { constants } from 'src/app/core/data/constants';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Fecha de Nacimiento', 'Email', 'Teléfono', 'Acciones'];
  dataSource: PersonaDTO[] = [];

  constructor(private personasService: PersonasService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.personasService.getPersonas().subscribe({
      next: (response: any) => {
        this.dataSource = (response.content as PersonaDTO[]);
      },
      error: (_) => {
        this.notificationService.showError(constants.MODAL_BODY_ERROR);
      }
    });
  }

}
