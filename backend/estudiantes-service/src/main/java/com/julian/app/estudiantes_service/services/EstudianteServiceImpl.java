package com.julian.app.estudiantes_service.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.julian.app.estudiantes_service.clients.PersonaFeignClient;
import com.julian.app.estudiantes_service.dto.EstudiantePersonaDTO;
import com.julian.app.estudiantes_service.dto.PersonaDTO;
import com.julian.app.estudiantes_service.entities.Estudiante;
import com.julian.app.estudiantes_service.exceptions.RecursoNoEncontradoException;
import com.julian.app.estudiantes_service.repositories.EstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private PersonaFeignClient personaFeignClient;
    private final EstudianteRepository estudianteRepository;

    public EstudianteServiceImpl(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EstudiantePersonaDTO> findAll(Pageable pageable) {

        Page<Estudiante> estudiantesPage = estudianteRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize()));

        List<Long> personaIds = estudiantesPage.stream()
                .map(Estudiante::getIdPersona)
                .collect(Collectors.toList());

        List<PersonaDTO> personas = personaFeignClient.getPersonasByIds(personaIds);

        Map<Long, PersonaDTO> personaMap = personas.stream()
                .collect(Collectors.toMap(PersonaDTO::getIdPersona, p -> p));

        List<EstudiantePersonaDTO> resultado = estudiantesPage.stream()
                .map(est -> {
                    PersonaDTO persona = personaMap.get(est.getIdPersona());
                    return new EstudiantePersonaDTO(
                            est.getIdEstudiante(),
                            est.getIdPersona(),
                            est.getNumeroMatricula(),
                            est.getGrado(),
                            persona != null ? persona.getNombre() : null,
                            persona != null ? persona.getApellido() : null,
                            persona != null ? persona.getFechaNacimiento() : null,
                            persona != null ? persona.getEmail() : null,
                            persona != null ? persona.getTelefono() : null);
                })
                .collect(Collectors.toList());

        System.out.println("resultado: " + resultado);

        return new PageImpl<>(resultado, pageable, estudiantesPage.getTotalElements());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Estudiante> getEstudianteById(Long id) {
        return Optional.of(estudianteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Estudiante no encontrado con ID: " + id)));
    }

    @Override
    @Transactional
    public Estudiante createEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    @Transactional
    public Estudiante updateEstudiante(Estudiante estudiante) {
        return estudianteRepository.findById(estudiante.getIdEstudiante())
                .map(e -> {
                    e.setIdEstudiante(estudiante.getIdEstudiante());
                    e.setIdPersona(estudiante.getIdPersona());
                    e.setGrado(estudiante.getGrado());
                    e.setNumeroMatricula(estudiante.getNumeroMatricula());
                    return estudianteRepository.save(e);
                })
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Estudiante no encontrado con ID: " + estudiante.getIdPersona()));
    }

    @Override
    @Transactional
    public void deleteEstudiante(Long id) {
        if (!estudianteRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Estudiante no encontrada con ID: " + id);
        }
        estudianteRepository.deleteById(id);
    }

}
