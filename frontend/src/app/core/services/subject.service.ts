import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private personas$ = new BehaviorSubject<PersonaDTO[]>([]);

  constructor() { }
  getPersonasValue(): Observable<any> {
    return this.personas$.asObservable();
  }

  setPersonasValue(personas: PersonaDTO[]): void {
    this.personas$.next(personas);
  }

  addPersona(persona: PersonaDTO): void {
    const personas = this.personas$.getValue();
    this.personas$.next([persona, ...personas]);
  }

  updatePersona(persona: PersonaDTO): void {
    const personas = this.personas$.getValue();
    const updatedPersonas = personas.map(p => p.idPersona === persona.idPersona ? persona : p);
    this.personas$.next([...updatedPersonas]);
  }

  deletePersona(idPersona: number): void {
    const personas = this.personas$.getValue();
    const personasFiltered = personas.filter( persona => persona.idPersona !== idPersona);
    this.personas$.next(personasFiltered);
  }

  clear(): void {
    this.personas$.next([]);
  }
}
