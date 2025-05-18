package com.julian.app.personas_service.repositories;

import org.springframework.data.repository.CrudRepository;

import com.julian.app.personas_service.entities.Persona;

public interface PersonaRepository  extends CrudRepository<Persona, Long> {
}
