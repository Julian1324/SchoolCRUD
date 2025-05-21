import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EstudianteDTO } from 'src/app/modules/dashboard/data/EstudianteDTO';
import { PersonaDTO } from 'src/app/modules/dashboard/data/PersonaDTO';
import { ProfesorDTO } from 'src/app/modules/dashboard/data/ProfesorDTO';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private personas$ = new BehaviorSubject<PersonaDTO[]>([]);
  private estudiantes$ = new BehaviorSubject<EstudianteDTO[]>([]);
  private profesores$ = new BehaviorSubject<ProfesorDTO[]>([]);

  constructor() { }

  getPersonasValue(): Observable<any> {
    return this.personas$.asObservable();
  }

  getEstudiantesValue(): Observable<any> {
    return this.estudiantes$.asObservable();
  }

  getProfesoresValue(): Observable<any> {
    return this.profesores$.asObservable();
  }

  setPersonasValue(personas: PersonaDTO[]): void {
    this.personas$.next(personas);
  }

  setEstudiantesValue(estudiantes: EstudianteDTO[]): void {
    this.estudiantes$.next(estudiantes);
  }
  
  setProfesoresValue(profesores: ProfesorDTO[]): void {
    this.profesores$.next(profesores);
  }

  addPersona(persona: PersonaDTO): void {
    const personas = this.personas$.getValue();
    this.personas$.next([persona, ...personas]);
  }

  addEstudiante(estudiante: EstudianteDTO): void {
    const estudiantes = this.estudiantes$.getValue();
    this.estudiantes$.next([estudiante, ...estudiantes]);
  }

  addProfesor(profesor: ProfesorDTO): void {
    const profesores = this.profesores$.getValue();
    this.profesores$.next([profesor, ...profesores]);
  }

  updatePersona(persona: PersonaDTO): void {
    const personas = this.personas$.getValue();
    const updatedPersonas = personas.map(p => p.idPersona === persona.idPersona ? persona : p);
    this.personas$.next([...updatedPersonas]);
  }

  updateEstudiante(estudiante: EstudianteDTO): void {
    const estudiantes = this.estudiantes$.getValue();
    const updatedEstudiantes = estudiantes.map(e => e.idEstudiante === estudiante.idEstudiante ? estudiante : e);
    this.estudiantes$.next([...updatedEstudiantes]);
  }

  updateProfesor(profesor: ProfesorDTO): void {
    const profesores = this.profesores$.getValue();
    const updatedProfesores = profesores.map(p => p.idProfesor === profesor.idProfesor ? profesor : p);
    this.profesores$.next([...updatedProfesores]);
  }

  deletePersona(idPersona: number): void {
    const personas = this.personas$.getValue();
    const personasFiltered = personas.filter( persona => persona.idPersona !== idPersona);
    this.personas$.next(personasFiltered);
  }
  
  deleteEstudiante(idEstudiante: number): void {
    const estudiantes = this.estudiantes$.getValue();
    const estudiantesFiltered = estudiantes.filter( estudiante => estudiante.idEstudiante !== idEstudiante);
    this.estudiantes$.next(estudiantesFiltered);
  }

  deleteProfesor(idProfesor: number): void {
    const profesores = this.profesores$.getValue();
    const profesoresFiltered = profesores.filter( profesor => profesor.idProfesor !== idProfesor);
    this.profesores$.next(profesoresFiltered);
  }

  clear(): void {
    this.personas$.next([]);
    this.estudiantes$.next([]);
    this.profesores$.next([]);
  }
}
