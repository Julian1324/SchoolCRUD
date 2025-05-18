import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../../core/data/constants';
import { PersonaDTO } from '../data/PersonaDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<PersonaDTO[]> {
    console.log('Fetching personas from API');
    console.log('API URL:', environment.api + constants.personasUrl);
    return this.http.get<PersonaDTO[]>(environment.api + constants.personasUrl);
  }
}
