package com.julian.app.profesores_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.julian.app.profesores_service.entities.Profesor;

public interface ProfesorRepository  extends JpaRepository<Profesor, Long> {
}
