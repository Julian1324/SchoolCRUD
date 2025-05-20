package com.julian.app.personas_service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.julian.app.personas_service.dto.PersonaDTO;
import com.julian.app.personas_service.entities.Persona;

public interface PersonaService {
    Page<Persona> findAll(Pageable pageable);
    Optional<Persona> getPersonaById(Long id);
    List<PersonaDTO> findPersonasByIds(List<Long> ids);
    Persona createPersona(Persona persona);
    Persona updatePersona(Persona persona);
    void deletePersona(Long id);
}
