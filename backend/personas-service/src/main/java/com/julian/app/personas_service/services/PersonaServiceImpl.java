package com.julian.app.personas_service.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julian.app.personas_service.entities.Persona;
import com.julian.app.personas_service.repositories.PersonaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@Service
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;
    
    public PersonaServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Persona> findAll(Pageable pageable) {
        return personaRepository.findAll(pageable);
    }

    @Override
    public Optional<Persona> getPersonaById(Long id) {
        return Optional.empty();
    }

    @Override
    public Persona createPersona(Persona persona) {
        return null;
    }

    @Override
    public Persona updatePersona(Persona persona) {
        return null;
    }

    @Override
    public void deletePersona(Long id) {
    }

}
