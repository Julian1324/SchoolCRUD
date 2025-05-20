
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../../../core/data/constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstudianteDTO } from '../data/EstudianteDTO';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<EstudianteDTO[]> {
    return this.http.get<EstudianteDTO[]>(environment.api + constants.ESTUDIANTES_URL + constants.INITIAL_PAGINATION);
  }

  createEstudiante(estudiante: EstudianteDTO): Observable<EstudianteDTO> {
    return this.http.post<EstudianteDTO>(environment.api + constants.ESTUDIANTES_URL, estudiante);
  }

  updateEstudiante(estudiante: EstudianteDTO): Observable<EstudianteDTO> {
    return this.http.put<EstudianteDTO>(environment.api + constants.ESTUDIANTES_URL, estudiante);
  }

  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(environment.api + constants.ESTUDIANTES_URL + '/' + id);
  }
}