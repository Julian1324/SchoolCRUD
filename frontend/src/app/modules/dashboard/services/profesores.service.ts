import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../../../core/data/constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfesorDTO } from '../data/ProfesorDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient) { }

  getProfesores(): Observable<ProfesorDTO[]> {
    return this.http.get<ProfesorDTO[]>(environment.api + constants.PROFESORES_URL + constants.INITIAL_PAGINATION);
  }

  createProfesor(profesor: ProfesorDTO): Observable<ProfesorDTO> {
    return this.http.post<ProfesorDTO>(environment.api + constants.PROFESORES_URL, profesor);
  }

  updateProfesor(profesor: ProfesorDTO): Observable<ProfesorDTO> {
    return this.http.put<ProfesorDTO>(environment.api + constants.PROFESORES_URL, profesor);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(environment.api + constants.PROFESORES_URL + '/' + id);
  }
}