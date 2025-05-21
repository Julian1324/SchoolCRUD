package com.julian.app.profesores_service.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.julian.app.profesores_service.dto.PaginatedResponse;
import com.julian.app.profesores_service.dto.ProfesorDTO;
import com.julian.app.profesores_service.dto.ProfesorPersonaDTO;
import com.julian.app.profesores_service.entities.Profesor;
import com.julian.app.profesores_service.services.ProfesorService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping
public class ProfesorController {

    private final ProfesorService profesorService;
    private static final Logger logger = LoggerFactory.getLogger(ProfesorController.class);

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<ProfesorPersonaDTO>> list(Pageable pageable) {
        Page<ProfesorPersonaDTO> profesores = profesorService.findAll(pageable);

        PaginatedResponse<ProfesorPersonaDTO> response = new PaginatedResponse<>();
        response.setContent(profesores.getContent());
        response.setPage(profesores.getNumber());
        response.setSize(profesores.getSize());

        logger.info(
                "GET /api/profesores ejecutado" + " - Page: " + profesores.getNumber() + ", Size: "
                        + profesores.getSize());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Profesor> createProfesor(@Valid @RequestBody ProfesorDTO profesorDTO) {
        Profesor profesor = new Profesor();
        profesor.setIdProfesor(profesorDTO.getIdProfesor());
        profesor.setIdPersona(profesorDTO.getIdPersona());
        profesor.setEspecialidad(profesorDTO.getEspecialidad());
        profesor.setFechaContratacion(profesorDTO.getFechaContratacion());

        Profesor created = profesorService.createProfesor(profesor);
        logger.info("POST /api/estudiantes ejecutado" + " - Estudiante creado: " + created);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping
    public ResponseEntity<Profesor> updateProfesor(@Valid @RequestBody ProfesorDTO profesorDTO) {
        Profesor profesor = new Profesor();
        profesor.setIdProfesor(profesorDTO.getIdProfesor());
        profesor.setIdPersona(profesorDTO.getIdPersona());
        profesor.setEspecialidad(profesorDTO.getEspecialidad());
        profesor.setFechaContratacion(profesorDTO.getFechaContratacion());

        Profesor updated = profesorService.updateProfesor(profesor);
        logger.info("PUT /api/profesores ejecutado" + " - Profesor: " + updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfesor(@PathVariable Long id) {
        profesorService.deleteProfesor(id);
        logger.info("DELETE /api/estudiantes/" + id + " ejecutado");
        return ResponseEntity.noContent().build();
    }
}
