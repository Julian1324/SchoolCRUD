package com.julian.app.estudiantes_service.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.julian.app.estudiantes_service.dto.PaginatedResponse;
import com.julian.app.estudiantes_service.dto.EstudianteDTO;
import com.julian.app.estudiantes_service.dto.EstudiantePersonaDTO;
import com.julian.app.estudiantes_service.entities.Estudiante;
import com.julian.app.estudiantes_service.services.EstudianteService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping
public class EstudianteController {

    private final EstudianteService estudianteService;
    private static final Logger logger = LoggerFactory.getLogger(EstudianteController.class);

    public EstudianteController(EstudianteService estudianteService) {
        this.estudianteService = estudianteService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<EstudiantePersonaDTO>> list(Pageable pageable) {
        Page<EstudiantePersonaDTO> estudiantes = estudianteService.findAll(pageable);

        PaginatedResponse<EstudiantePersonaDTO> response = new PaginatedResponse<>();
        response.setContent(estudiantes.getContent());
        response.setPage(estudiantes.getNumber());
        response.setSize(estudiantes.getSize());

        logger.info(
                "GET /api/estudiantes ejecutado" + " - Page: " + estudiantes.getNumber() + ", Size: "
                        + estudiantes.getSize());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Estudiante> createEstudiante(@Valid @RequestBody EstudianteDTO estudianteDTO) {
        Estudiante estudiante = new Estudiante();
        estudiante.setIdPersona(estudianteDTO.getIdPersona());
        estudiante.setNumeroMatricula(estudianteDTO.getNumeroMatricula());
        estudiante.setGrado(estudianteDTO.getGrado());

        Estudiante created = estudianteService.createEstudiante(estudiante);
        logger.info("POST /api/estudiantes ejecutado" + " - Estudiante creado: " + created);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping
    public ResponseEntity<Estudiante> updateEstudiante(@Valid @RequestBody EstudianteDTO estudianteDTO) {
        Estudiante estudiante = new Estudiante();
        estudiante.setIdEstudiante(estudianteDTO.getIdEstudiante());
        estudiante.setIdPersona(estudianteDTO.getIdPersona());
        estudiante.setNumeroMatricula(estudianteDTO.getNumeroMatricula());
        estudiante.setGrado(estudianteDTO.getGrado());

        Estudiante updated = estudianteService.updateEstudiante(estudiante);
        logger.info("PUT /api/estudiantes ejecutado" + " - Estudiante: " + updated);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEstudiante(@PathVariable Long id) {
        estudianteService.deleteEstudiante(id);
        logger.info("DELETE /api/estudiantes/" + id + " ejecutado");
        return ResponseEntity.noContent().build();
    }
}
