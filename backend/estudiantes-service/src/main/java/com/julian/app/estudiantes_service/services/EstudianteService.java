package com.julian.app.estudiantes_service.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.julian.app.estudiantes_service.dto.EstudiantePersonaDTO;
import com.julian.app.estudiantes_service.entities.Estudiante;

public interface EstudianteService {
    Page<EstudiantePersonaDTO> findAll(Pageable pageable);
    Optional<Estudiante> getEstudianteById(Long id);
    Estudiante createEstudiante(Estudiante estudiante);
    Estudiante updateEstudiante(Estudiante estudiante);
    void deleteEstudiante(Long id);
}
