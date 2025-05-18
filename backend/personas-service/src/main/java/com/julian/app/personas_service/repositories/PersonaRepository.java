package com.julian.app.personas_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.julian.app.personas_service.entities.Persona;

public interface PersonaRepository  extends JpaRepository<Persona, Long> {
}
