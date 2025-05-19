package com.julian.app.personas_service.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.julian.app.personas_service.entities.Persona;
import com.julian.app.personas_service.repositories.PersonaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;

@Service
public class PersonaServiceImpl implements PersonaService {

    private final PersonaRepository personaRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Persona> findAll(Pageable pageable) {
        return personaRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        Sort.by("idPersona").descending()));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Persona> getPersonaById(Long id) {
        return personaRepository.findById(id);
    }

    @Override
    @Transactional
    public Persona createPersona(Persona persona) {
        return personaRepository.save(persona);
    }

    @Override
    @Transactional
    public Persona updatePersona(Persona persona) {
        return personaRepository.findById(persona.getIdPersona())
                .map(p -> {
                    p.setNombre(persona.getNombre());
                    p.setApellido(persona.getApellido());
                    p.setFechaNacimiento(persona.getFechaNacimiento());
                    p.setEmail(persona.getEmail());
                    p.setTelefono(persona.getTelefono());
                    return personaRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Persona no encontrada con ID: " + persona.getIdPersona()));
    }

    @Override
    @Transactional
    public void deletePersona(Long id) {
        if (!personaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada con ID: " + id);
        }
        personaRepository.deleteById(id);
    }

}
