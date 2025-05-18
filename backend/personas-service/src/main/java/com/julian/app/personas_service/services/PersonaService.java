package com.julian.app.personas_service.services;

import java.util.List;
import java.util.Optional;

import com.julian.app.personas_service.entities.Persona;

public interface PersonaService {
    List<Persona> findAll();
    Optional<Persona> getPersonaById(Long id);
    Persona createPersona(Persona persona);
    Persona updatePersona(Persona persona);
    void deletePersona(Long id);
}
