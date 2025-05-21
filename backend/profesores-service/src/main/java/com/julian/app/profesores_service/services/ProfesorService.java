package com.julian.app.profesores_service.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.julian.app.profesores_service.entities.Profesor;
import com.julian.app.profesores_service.dto.ProfesorPersonaDTO;

public interface ProfesorService {
    Page<ProfesorPersonaDTO> findAll(Pageable pageable);
    Optional<Profesor> getProfesorById(Long id);
    Profesor createProfesor(Profesor estudiante);
    Profesor updateProfesor(Profesor estudiante);
    void deleteProfesor(Long id);
}
