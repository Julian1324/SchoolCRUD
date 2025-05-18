import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { PersonaDTO } from '../../data/PersonaDTO';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Apellido', 'Fecha de Nacimiento', 'Email', 'Teléfono', 'Acciones'];
  dataSource: PersonaDTO[] = [];

  constructor(private personasService: PersonasService) { }

  ngOnInit(): void {
    this.personasService.getPersonas().subscribe({
      next: (res: PersonaDTO[]) => {
        this.dataSource = res;
      },
      error: (err) => {
        console.error('Error al obtener personas:', err);
      }
    });
  }

}
