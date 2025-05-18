package com.julian.app.personas_service.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.julian.app.personas_service.entities.Persona;

public interface PersonaService {
    Page<Persona> findAll(Pageable pageable);
    Optional<Persona> getPersonaById(Long id);
    Persona createPersona(Persona persona);
    Persona updatePersona(Persona persona);
    void deletePersona(Long id);
}
