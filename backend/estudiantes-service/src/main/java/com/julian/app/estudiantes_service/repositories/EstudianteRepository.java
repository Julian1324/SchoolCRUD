package com.julian.app.estudiantes_service.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.julian.app.estudiantes_service.entities.Estudiante;

public interface EstudianteRepository  extends JpaRepository<Estudiante, Long> {
}
