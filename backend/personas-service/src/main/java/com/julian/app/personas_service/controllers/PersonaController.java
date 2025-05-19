package com.julian.app.personas_service.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.julian.app.personas_service.dto.PaginatedResponse;
import com.julian.app.personas_service.dto.PersonaDTO;
import com.julian.app.personas_service.entities.Persona;
import com.julian.app.personas_service.services.PersonaService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping
public class PersonaController {

    private final PersonaService personaService;
    private static final Logger logger = LoggerFactory.getLogger(PersonaController.class);

    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping
    public ResponseEntity<PaginatedResponse<Persona>> list(Pageable pageable) {
        Page<Persona> personas = personaService.findAll(pageable);

        PaginatedResponse<Persona> response = new PaginatedResponse<>();
        response.setContent(personas.getContent());
        response.setPage(personas.getNumber());
        response.setSize(personas.getSize());

        logger.info(
                "GET /api/personas ejecutado" + " - Page: " + personas.getNumber() + ", Size: " + personas.getSize());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Persona> createPersona(@Valid @RequestBody PersonaDTO personaDTO) {
        Persona persona = new Persona();
        persona.setNombre(personaDTO.getNombre());
        persona.setApellido(personaDTO.getApellido());
        persona.setFechaNacimiento(personaDTO.getFechaNacimiento());
        persona.setEmail(personaDTO.getEmail());
        persona.setTelefono(personaDTO.getTelefono());

        Persona created = personaService.createPersona(persona);
        logger.info("POST /api/personas ejecutado" + " - Persona creada: " + created);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping
    public ResponseEntity<Persona> updatePersona(@Valid @RequestBody PersonaDTO personaDTO) {

        Persona persona = new Persona();
        persona.setIdPersona(personaDTO.getIdPersona());
        persona.setNombre(personaDTO.getNombre());
        persona.setApellido(personaDTO.getApellido());
        persona.setFechaNacimiento(personaDTO.getFechaNacimiento());
        persona.setEmail(personaDTO.getEmail());
        persona.setTelefono(personaDTO.getTelefono());

        Persona updated = personaService.updatePersona(persona);
        logger.info("PUT /api/personas ejecutado" + " - Persona: " + updated);
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePersona(@PathVariable Long id) {
        personaService.deletePersona(id);
        logger.info("DELETE /api/personas/" + id + " ejecutado");
        return ResponseEntity.noContent().build();
    }
}
