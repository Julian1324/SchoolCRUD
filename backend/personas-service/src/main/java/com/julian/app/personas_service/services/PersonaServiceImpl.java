package com.julian.app.personas_service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julian.app.personas_service.entities.Persona;
import com.julian.app.personas_service.repositories.PersonaRepository;

@Service
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;
    
    public PersonaServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Persona> findAll() {
        return (List<Persona>) personaRepository.findAll();
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
