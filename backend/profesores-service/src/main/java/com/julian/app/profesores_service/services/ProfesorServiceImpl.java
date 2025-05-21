package com.julian.app.profesores_service.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julian.app.profesores_service.clients.PersonaFeignClient;
import com.julian.app.profesores_service.dto.ProfesorPersonaDTO;
import com.julian.app.profesores_service.dto.PersonaDTO;
import com.julian.app.profesores_service.entities.Profesor;
import com.julian.app.profesores_service.exceptions.RecursoNoEncontradoException;
import com.julian.app.profesores_service.repositories.ProfesorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class ProfesorServiceImpl implements ProfesorService {

    @Autowired
    private PersonaFeignClient personaFeignClient;
    private final ProfesorRepository profesorRepository;

    public ProfesorServiceImpl(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProfesorPersonaDTO> findAll(Pageable pageable) {

        Page<Profesor> estudiantesPage = profesorRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize()));

        List<Long> personaIds = estudiantesPage.stream()
                .map(Profesor::getIdPersona)
                .collect(Collectors.toList());

        List<PersonaDTO> personas = personaFeignClient.getPersonasByIds(personaIds);

        Map<Long, PersonaDTO> personaMap = personas.stream()
                .collect(Collectors.toMap(PersonaDTO::getIdPersona, p -> p));

        List<ProfesorPersonaDTO> resultado = estudiantesPage.stream()
                .map(prof -> {
                    PersonaDTO persona = personaMap.get(prof.getIdPersona());
                    return new ProfesorPersonaDTO(
                            prof.getIdProfesor(),
                            prof.getIdPersona(),
                            persona != null ? persona.getNombre() : null,
                            persona != null ? persona.getApellido() : null,
                            persona != null ? persona.getFechaNacimiento() : null,
                            persona != null ? persona.getEmail() : null,
                            persona != null ? persona.getTelefono() : null,
                            prof.getEspecialidad(),
                            prof.getFechaContratacion());
                })
                .collect(Collectors.toList());

        return new PageImpl<>(resultado, pageable, estudiantesPage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Profesor> getProfesorById(Long id) {
        return Optional.of(profesorRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Profesor no encontrado con ID: " + id)));
    }

    @Override
    @Transactional
    public Profesor createProfesor(Profesor estudiante) {
        return profesorRepository.save(estudiante);
    }

    @Override
    @Transactional
    public Profesor updateProfesor(Profesor profesor) {
        return profesorRepository.findById(profesor.getIdProfesor())
                .map(e -> {
                    e.setIdProfesor(profesor.getIdProfesor());
                    e.setIdPersona(profesor.getIdPersona());
                    e.setEspecialidad(profesor.getEspecialidad());
                    e.setFechaContratacion(profesor.getFechaContratacion());
                    return profesorRepository.save(e);
                })
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Profesor no encontrado con ID: " + profesor.getIdProfesor()));
    }

    @Override
    @Transactional
    public void deleteProfesor(Long id) {
        if (!profesorRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Profesor no encontrada con ID: " + id);
        }
        profesorRepository.deleteById(id);
    }

}
